// app/api/notify/route.ts
// Endpoint interno que recibe los datos del lead y manda mensajes via ManyChat

import { NextRequest, NextResponse } from "next/server"

const MANYCHAT_API_KEY = process.env.MANYCHAT_API_KEY!
const MANYCHAT_API_URL = "https://api.manychat.com"
const LUIS_WHATSAPP = "526862901448"

const MENSAJE_LISTO = `Hola 👋 recibimos tu solicitud.
Tu trámite ya está se está programando para validación. A la brevedad nos comunicaremos contigo para continuar con el proceso.
El proceso seguirá por este medio.`

const MENSAJE_AUN_NO = `Hola 👋 gracias por tu interés.
Por ahora no cumples todos los requisitos para iniciar la solicitud.
En cuanto los tengas completos, podemos procesarla y darte respuesta rápida.
¿Para qué fecha estimas tenerlos listos?`

async function findOrCreateSubscriber(phone: string, nombre: string) {
  const cleanPhone = phone.replace(/\D/g, "")
  const fullPhone = cleanPhone.startsWith("52") ? `+${cleanPhone}` : `+52${cleanPhone}`

  // Buscar suscriptor existente
  const findRes = await fetch(`${MANYCHAT_API_URL}/fb/subscriber/findByPhone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${MANYCHAT_API_KEY}`,
    },
    body: JSON.stringify({ phone: fullPhone }),
  })

  if (findRes.ok) {
    const data = await findRes.json()
    if (data?.data?.id) return data.data.id
  }

  // Crear suscriptor nuevo
  const createRes = await fetch(`${MANYCHAT_API_URL}/fb/subscriber/createSubscriber`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${MANYCHAT_API_KEY}`,
    },
    body: JSON.stringify({
      first_name: nombre.split(" ")[0],
      last_name: nombre.split(" ").slice(1).join(" ") || "",
      whatsapp_phone: fullPhone,
    }),
  })

  if (createRes.ok) {
    const data = await createRes.json()
    return data?.data?.id ?? null
  }

  return null
}

async function enviarMensaje(subscriberId: string, texto: string) {
  const res = await fetch(`${MANYCHAT_API_URL}/fb/sending/sendContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${MANYCHAT_API_KEY}`,
    },
    body: JSON.stringify({
      subscriber_id: subscriberId,
      data: {
        version: "v2",
        content: {
          messages: [{ type: "text", text: texto }],
        },
      },
      message_tag: "ACCOUNT_UPDATE",
    }),
  })
  return res.ok
}

export async function POST(req: NextRequest) {
  try {
    const { nombre, whatsapp, equipoNombre, disponibilidad } = await req.json()

    // 1. Mensaje al cliente
    const clienteId = await findOrCreateSubscriber(whatsapp, nombre)
    if (clienteId) {
      const mensajeCliente = disponibilidad === "listo" ? MENSAJE_LISTO : MENSAJE_AUN_NO
      await enviarMensaje(clienteId, mensajeCliente)
    }

    // 2. Aviso a Luis
    const luisId = await findOrCreateSubscriber(LUIS_WHATSAPP, "Luis")
    if (luisId) {
      const disponibilidadTexto: Record<string, string> = {
        "listo": "✅ Tiene requisitos",
        "esta-semana": "📅 Esta semana",
        "proxima-semana": "📅 Próxima semana",
        "no-seguro": "❓ No está seguro",
      }
      const avisoLuis = `🔔 Nuevo lead CelTec\n\nNombre: ${nombre}\nWhatsApp: ${whatsapp}\nEquipo: ${equipoNombre}\nRequisitos: ${disponibilidadTexto[disponibilidad] ?? disponibilidad}`
      await enviarMensaje(luisId, avisoLuis)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Error en /api/notify:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
