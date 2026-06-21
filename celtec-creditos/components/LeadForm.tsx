"use client";

import { useState } from "react";
import { Producto } from "@/lib/products";

export default function LeadForm({
  producto,
  onClose,
}: {
  producto: Producto;
  onClose: () => void;
}) {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: cuando exista el backend (FastAPI), aquí se hace el POST real
    // con los datos del formulario + producto.id
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-surface border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center space-y-3">
          <p className="text-3xl">📲</p>
          <h3 className="font-display font-bold text-xl">¡Listo!</h3>
          <p className="text-inkmuted text-sm">
            Recibimos tus datos para el <strong className="text-ink">{producto.nombre}</strong>.
            Te contactamos por WhatsApp en breve para confirmar tu plan.
          </p>
          <button
            onClick={onClose}
            className="mt-2 bg-celtec-yellow hover:bg-celtec-yellowdark text-bg font-display font-bold py-2.5 px-6 rounded-xl"
          >
            Entendido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-white/10 rounded-t-2xl sm:rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto space-y-4"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wide text-inkmuted">
              {producto.nombre} · {producto.almacenamiento}
            </p>
            <h3 className="font-display font-bold text-xl">Tus datos</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-inkmuted hover:text-ink text-xl leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <Field label="Nombre completo" name="nombre" required />
        <Field label="WhatsApp" name="whatsapp" type="tel" required />
        <Field label="Dirección" name="direccion" required />

        <div className="pt-2 border-t border-dashed space-y-3">
          <p className="text-xs font-mono uppercase tracking-wide text-inkmuted">
            Referencia familiar (que no viva contigo)
          </p>
          <Field label="Nombre" name="ref_familiar_nombre" required />
          <Field label="Teléfono" name="ref_familiar_telefono" type="tel" required />
        </div>

        <div className="pt-2 border-t border-dashed space-y-3">
          <p className="text-xs font-mono uppercase tracking-wide text-inkmuted">
            Referencia personal o laboral
          </p>
          <Field label="Nombre" name="ref_personal_nombre" required />
          <Field label="Teléfono" name="ref_personal_telefono" type="tel" required />
        </div>

        <button
          type="submit"
          className="w-full bg-celtec-yellow hover:bg-celtec-yellowdark text-bg font-display font-bold py-3.5 rounded-xl transition-colors"
        >
          Enviar y reservar mi lugar
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs text-inkmuted mb-1 block">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-surface2 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-ink placeholder:text-inkmuted/50 focus:border-celtec-yellow outline-none transition-colors"
      />
    </label>
  );
}
