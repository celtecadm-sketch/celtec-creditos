// lib/manychat.ts
// Envía mensajes automáticos de WhatsApp via ManyChat API

const MANYCHAT_API_KEY = process.env.NEXT_PUBLIC_MANYCHAT_API_KEY!
const MANYCHAT_API_URL = "https://api.manychat.com"

// Mensaje para cliente con requisitos listos
const MENSAJE_LISTO = `Hola 👋 recibimos tu solicitud.
Tu trámite ya está se esta programando para validación. A la brevedad nos comunicaremos contigo para continuar con el proceso.
El proceso seguirá por este medio.`

// Mensaje para cliente sin requisitos
const MENSAJE_AUN_NO = `Hola 👋 gracias por tu interés.
Por ahora no cumples todos los requisitos para iniciar la solicitud.
En cuanto los tengas completos, podemos procesarla y darte respuesta rápida.
¿Para qué fecha estimas tenerlos listos?`

export async function enviarMensajeWhatsApp({
  whatsapp,
  nombre,
  equipoNombre,
  disponibilidad,
}: {
  whatsapp: string
  nombre: string
  equipoNombre: string
  disponibilidad: string
}) {
  try {
    // Primero: crear o encontrar el suscriptor por número de teléfono
    const phone = whatsapp.replace(/\D/g, "")
    const phoneWithCode = phone.startsWith("52") ? phone : `52${phone}`

    const subscriberRes = await fetch(`${MANYCHAT_API_URL}/fb/subscriber/findByPhone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MANYCHAT_API_KEY}`,
      },
      body: JSON.stringify({ phone: `+${phoneWithCode}` }),
    })

    let subscriberId: string | null = null

    if (subscriberRes.ok) {
      const subscriberData = await subscriberRes.json()
      subscriberId = subscriberData?.data?.id ?? null
    }

    // Si no existe el suscriptor, lo creamos
    if (!subscriberId) {
      const createRes = await fetch(`${MANYCHAT_API_URL}/fb/subscriber/createSubscriber`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${MANYCHAT_API_KEY}`,
        },
        body: JSON.stringify({
          phone: `+${phoneWithCode}`,
          first_name: nombre.split(" ")[0],
          last_name: nombre.split(" ").slice(1).join(" "),
          whatsapp_phone: `+${phoneWithCode}`,
        }),
      })

      if (createRes.ok) {
        const createData = await createRes.json()
        subscriberId = createData?.data?.id ?? null
      }
    }

    if (!subscriberId) {
      console.error("No se pudo crear/encontrar suscriptor en ManyChat")
      return false
    }

    // Elegir mensaje según disponibilidad
    const mensaje = disponibilidad === "listo" ? MENSAJE_LISTO : MENSAJE_AUN_NO

    // Mandar mensaje por WhatsApp
    const msgRes = await fetch(`${MANYCHAT_API_URL}/fb/sending/sendContent`, {
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
            messages: [
              {
                type: "text",
                text: mensaje,
              },
            ],
          },
        },
        message_tag: "ACCOUNT_UPDATE",
      }),
    })

    return msgRes.ok
  } catch (err) {
    console.error("Error enviando mensaje ManyChat:", err)
    return false
  }
}
