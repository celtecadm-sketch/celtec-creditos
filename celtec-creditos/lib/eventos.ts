// lib/eventos.ts
// Registra eventos del funnel en Supabase para medir conversión

import { getSupabase } from "@/lib/supabase";

export type TipoEvento =
  | "visita"
  | "formulario_abierto"
  | "califico"
  | "no_califico"
  | "abandono";

export async function registrarEvento(
  tipo: TipoEvento,
  equipoId?: string
) {
  try {
    const supabase = getSupabase();
    await supabase.from("eventos").insert({
      tipo,
      equipo_id: equipoId ?? null,
    });
  } catch (err) {
    // No bloqueamos el flujo si falla el registro
    console.error("Error registrando evento:", err);
  }
}
