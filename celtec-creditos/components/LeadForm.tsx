"use client";

import { useState } from "react";
import { Producto } from "@/lib/products";
import { getSupabase } from "@/lib/supabase";
import { registrarEvento } from "@/lib/eventos";

type Paso = "requisitos" | "tiempo" | "datos" | "enviado" | "error";
type Disponibilidad = "listo" | "esta-semana" | "proxima-semana" | "no-seguro";

const OPCIONES_TIEMPO: { value: Disponibilidad; label: string }[] = [
  { value: "esta-semana", label: "Esta semana" },
  { value: "proxima-semana", label: "La próxima semana" },
  { value: "no-seguro", label: "Aún no estoy seguro" },
];

const REQUISITOS = [
  "Enganche",
  "Identificación oficial",
  "Comprobante de domicilio",
  "2 referencias personales",
];

export default function LeadForm({
  producto,
  onClose,
}: {
  producto: Producto;
  onClose: () => void;
}) {
  const [paso, setPaso] = useState<Paso>("requisitos");
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [equipoNombreGuardado, setEquipoNombreGuardado] = useState("");

  function elegirSiTengo() {
    setDisponibilidad("listo");
    registrarEvento("califico", producto.id);
    setPaso("datos");
  }

  function elegirAunNo() {
    registrarEvento("no_califico", producto.id);
    setPaso("tiempo");
  }

  function elegirTiempo(valor: Disponibilidad) {
    setDisponibilidad(valor);
    setPaso("datos");
  }

  function handleClose() {
    // Si el cliente cierra sin completar el formulario de datos, es abandono
    if (paso === "datos") {
      registrarEvento("abandono", producto.id);
    }
    onClose();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGuardando(true);

    const form = e.currentTarget;
    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value;
    const whatsapp = (form.elements.namedItem("whatsapp") as HTMLInputElement).value;
    const disp = disponibilidad ?? "no-seguro";
    const equipoNombre = `${producto.nombre} ${producto.almacenamiento}`;

    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("leads").insert({
        nombre,
        whatsapp,
        equipo_id: producto.id,
        equipo_nombre: equipoNombre,
        disponibilidad: disp,
      });

      if (error) {
        console.error("Supabase error:", JSON.stringify(error));
        setPaso("error");
        return;
      }

      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, whatsapp, equipoNombre, disponibilidad: disp }),
      });

      setEquipoNombreGuardado(equipoNombre);
      setPaso("enviado");
    } catch (err) {
      console.error("Error inesperado:", err);
      setPaso("error");
    } finally {
      setGuardando(false);
    }
  }

  const mensajeWhatsApp = encodeURIComponent(
    `Hola, acabo de solicitar el ${equipoNombreGuardado} en la página de CelTec`
  );
  const whatsappUrl = `https://wa.me/526866761121?text=${mensajeWhatsApp}`;

  return (
    <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-surface border border-white/10 rounded-t-2xl sm:rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">

        <div className="flex items-start justify-between mb-5">
          <p className="text-sm font-mono text-inkmuted">
            {producto.nombre} · {producto.almacenamiento}
          </p>
          <button type="button" onClick={handleClose} className="text-inkmuted hover:text-ink text-2xl leading-none" aria-label="Cerrar">×</button>
        </div>

        {paso === "requisitos" && (
          <div className="space-y-5">
            <h3 className="font-display font-bold text-2xl text-ink">Para tu plan necesitarás:</h3>
            <ul className="space-y-3">
              {REQUISITOS.map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <span className="text-celtec-green text-xl font-bold">✓</span>
                  <span className="text-lg text-ink font-medium">{r}</span>
                </li>
              ))}
            </ul>
            <p className="font-display font-bold text-xl text-ink pt-2">¿Ya cuentas con todo esto?</p>
            <div className="flex flex-col gap-3 pt-1">
              <button onClick={elegirSiTengo} className="w-full bg-celtec-green hover:bg-celtec-greendark text-white font-display font-bold text-lg py-4 rounded-xl transition-colors">
                Sí, lo tengo
              </button>
              <button onClick={elegirAunNo} className="w-full bg-transparent hover:bg-white/10 text-ink font-display font-bold text-lg py-4 rounded-xl transition-colors border-2 border-white/40 hover:border-white/60">
                Aún no
              </button>
            </div>
          </div>
        )}

        {paso === "tiempo" && (
          <div className="space-y-5">
            <h3 className="font-display font-bold text-2xl text-ink">¿Para cuándo lo tendrías?</h3>
            <div className="flex flex-col gap-3">
              {OPCIONES_TIEMPO.map((op) => (
                <button key={op.value} onClick={() => elegirTiempo(op.value)} className="w-full text-left bg-surface2 hover:bg-white/10 text-ink font-medium text-lg py-4 px-4 rounded-xl transition-colors border border-white/15 hover:border-white/30">
                  {op.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {paso === "datos" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-display font-bold text-2xl text-ink">Casi listo</h3>
            <p className="text-inkmuted">Déjanos tus datos y te contactamos por WhatsApp.</p>
            <label className="block">
              <span className="text-sm text-inkmuted mb-1.5 block">Nombre completo</span>
              <input type="text" name="nombre" required className="w-full bg-surface2 border border-white/10 rounded-lg px-3 py-3 text-base text-ink focus:border-celtec-green outline-none transition-colors" />
            </label>
            <label className="block">
              <span className="text-sm text-inkmuted mb-1.5 block">WhatsApp</span>
              <input type="tel" name="whatsapp" required className="w-full bg-surface2 border border-white/10 rounded-lg px-3 py-3 text-base text-ink focus:border-celtec-green outline-none transition-colors" />
            </label>
            <button type="submit" disabled={guardando} className="w-full bg-celtec-green hover:bg-celtec-greendark disabled:opacity-60 text-white font-display font-bold text-lg py-4 rounded-xl transition-colors">
              {guardando ? "Enviando..." : "Enviar"}
            </button>
          </form>
        )}

        {paso === "enviado" && (
          <div className="text-center space-y-4 py-2">
            <p className="text-4xl">📲</p>
            <h3 className="font-display font-bold text-2xl text-ink">¡Listo!</h3>
            <p className="text-inkmuted text-base">
              Recibimos tu solicitud para el{" "}
              <strong className="text-ink">{equipoNombreGuardado}</strong>.
            </p>
            <p className="text-inkmuted text-sm">
              Confirma tu solicitud por WhatsApp y te atendemos de inmediato.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-celtec-green hover:bg-celtec-greendark text-white font-display font-bold text-lg py-4 rounded-xl transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.845L.057 23.077a.75.75 0 00.916.916l5.232-1.453A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-4.964-1.361l-.355-.211-3.684 1.023 1.023-3.684-.211-.355A9.726 9.726 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Confirmar por WhatsApp
            </a>
            <button onClick={onClose} className="w-full text-inkmuted text-sm py-2 hover:text-ink transition-colors">
              Cerrar
            </button>
          </div>
        )}

        {paso === "error" && (
          <div className="text-center space-y-3 py-4">
            <p className="text-4xl">⚠️</p>
            <h3 className="font-display font-bold text-2xl text-ink">Algo salió mal</h3>
            <p className="text-inkmuted text-base">No pudimos guardar tus datos. Por favor escríbenos directo por WhatsApp.</p>
            <a href="https://wa.me/526866761121" className="inline-block mt-2 bg-celtec-green hover:bg-celtec-greendark text-white font-display font-bold py-3 px-8 rounded-xl text-lg">
              Escribir por WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
