"use client";

import { useState } from "react";
import { Producto } from "@/lib/products";

type Paso = "requisitos" | "tiempo" | "datos" | "enviado";
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

  function elegirSiTengo() {
    setDisponibilidad("listo");
    setPaso("datos");
  }

  function elegirAunNo() {
    setPaso("tiempo");
  }

  function elegirTiempo(valor: Disponibilidad) {
    setDisponibilidad(valor);
    setPaso("datos");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value;
    const whatsapp = (form.elements.namedItem("whatsapp") as HTMLInputElement).value;

    // TODO: cuando exista el backend, aquí se hace el POST real con:
    // { productoId: producto.id, nombre, whatsapp, disponibilidad }
    console.log({ productoId: producto.id, nombre, whatsapp, disponibilidad });

    setPaso("enviado");
  }

  return (
    <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-surface border border-white/10 rounded-t-2xl sm:rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header común */}
        <div className="flex items-start justify-between mb-4">
          <p className="text-[11px] font-mono uppercase tracking-wide text-inkmuted">
            {producto.nombre} · {producto.almacenamiento}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-inkmuted hover:text-ink text-xl leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* PASO 1: Requisitos */}
        {paso === "requisitos" && (
          <div className="space-y-5">
            <h3 className="font-display font-bold text-xl">
              Para tu plan necesitarás:
            </h3>
            <ul className="space-y-2">
              {REQUISITOS.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-ink/90">
                  <span className="text-celtec-green">✓</span>
                  {r}
                </li>
              ))}
            </ul>
            <p className="font-display font-bold pt-2">¿Ya cuentas con todo esto?</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={elegirSiTengo}
                className="w-full bg-celtec-yellow hover:bg-celtec-yellowdark text-bg font-display font-bold py-3.5 rounded-xl transition-colors"
              >
                Sí, lo tengo
              </button>
              <button
                onClick={elegirAunNo}
                className="w-full bg-surface2 hover:bg-white/10 text-ink font-display font-semibold py-3.5 rounded-xl transition-colors border border-white/10"
              >
                Aún no
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: Tiempo (solo si dijo "Aún no") */}
        {paso === "tiempo" && (
          <div className="space-y-5">
            <h3 className="font-display font-bold text-xl">
              ¿Para cuándo lo tendrías?
            </h3>
            <div className="flex flex-col gap-2.5">
              {OPCIONES_TIEMPO.map((op) => (
                <button
                  key={op.value}
                  onClick={() => elegirTiempo(op.value)}
                  className="w-full text-left bg-surface2 hover:bg-white/10 text-ink font-medium py-3.5 px-4 rounded-xl transition-colors border border-white/10"
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PASO 3: Datos (nombre + whatsapp) */}
        {paso === "datos" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-display font-bold text-xl">Casi listo</h3>
            <p className="text-sm text-inkmuted -mt-2">
              Déjanos tus datos y te contactamos por WhatsApp.
            </p>

            <label className="block">
              <span className="text-xs text-inkmuted mb-1 block">Nombre completo</span>
              <input
                type="text"
                name="nombre"
                required
                className="w-full bg-surface2 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-ink focus:border-celtec-yellow outline-none transition-colors"
              />
            </label>

            <label className="block">
              <span className="text-xs text-inkmuted mb-1 block">WhatsApp</span>
              <input
                type="tel"
                name="whatsapp"
                required
                className="w-full bg-surface2 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-ink focus:border-celtec-yellow outline-none transition-colors"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-celtec-yellow hover:bg-celtec-yellowdark text-bg font-display font-bold py-3.5 rounded-xl transition-colors"
            >
              Enviar
            </button>
          </form>
        )}

        {/* PASO 4: Confirmación */}
        {paso === "enviado" && (
          <div className="text-center space-y-3 py-4">
            <p className="text-3xl">📲</p>
            <h3 className="font-display font-bold text-xl">¡Listo!</h3>
            <p className="text-inkmuted text-sm">
              Recibimos tus datos para el{" "}
              <strong className="text-ink">{producto.nombre}</strong>. Te
              contactamos por WhatsApp en breve.
            </p>
            <button
              onClick={onClose}
              className="mt-2 bg-celtec-yellow hover:bg-celtec-yellowdark text-bg font-display font-bold py-2.5 px-6 rounded-xl"
            >
              Entendido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
