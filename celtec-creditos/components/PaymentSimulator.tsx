"use client";

import { Producto, calcularPlan } from "@/lib/products";

export default function PaymentSimulator({
  producto,
  onQuieroEsteEquipo,
}: {
  producto: Producto | null;
  onQuieroEsteEquipo: () => void;
}) {
  if (!producto) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-inkmuted font-mono text-sm">
        Elige un equipo arriba para ver tu plan de pagos aquí.
      </div>
    );
  }

  const { semanas, totalAPagar, saldo } = calcularPlan(producto);

  return (
    <div className="relative max-w-sm mx-auto">
      {/* Ticket */}
      <div className="bg-surface rounded-t-2xl border border-dashed border-dashed px-6 pt-6 pb-4">
        <div className="text-center mb-4">
          <p className="font-mono text-[11px] tracking-[0.2em] text-inkmuted uppercase">
            CelTec Créditos
          </p>
          <p className="font-display font-bold text-xl mt-1">
            {producto.nombre} · {producto.almacenamiento}
          </p>
        </div>

        <div className="font-mono text-sm space-y-2">
          <Row label="Precio a crédito" value={`$${producto.precioCredito.toLocaleString()}`} />
          <Row label="Enganche" value={`$${producto.enganche.toLocaleString()}`} />
          <Row label="Saldo a financiar" value={`$${saldo.toLocaleString()}`} />
          <div className="border-t border-dashed my-2" />
          <Row label="Abono semanal" value={`$${producto.abonoSemanal}`} highlight />
          <Row label="Semanas para liquidar" value={`${semanas}`} />
          <div className="border-t border-dashed my-2" />
          <Row label="Total a pagar" value={`$${totalAPagar.toLocaleString()}`} bold />
        </div>
      </div>

      {/* Perforated edge */}
      <div className="relative h-4 bg-surface overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-4 bg-bg"
          style={{
            maskImage:
              "radial-gradient(circle at 8px 0px, transparent 8px, black 8.5px)",
            maskSize: "16px 16px",
            maskRepeat: "repeat-x",
            WebkitMaskImage:
              "radial-gradient(circle at 8px 0px, transparent 8px, black 8.5px)",
            WebkitMaskSize: "16px 16px",
            WebkitMaskRepeat: "repeat-x",
          }}
        />
      </div>

      <div className="bg-surface rounded-b-2xl px-6 pb-6 pt-1">
        <button
          onClick={onQuieroEsteEquipo}
          className="w-full mt-3 bg-celtec-yellow hover:bg-celtec-yellowdark text-bg font-display font-bold text-base py-3.5 rounded-xl transition-colors"
        >
          Quiero este equipo
        </button>
        <p className="text-[11px] text-inkmuted text-center mt-2 font-mono">
          Sin letra chica. Así de simple es tu plan.
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
  bold,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-inkmuted">{label}</span>
      <span
        className={
          highlight
            ? "text-celtec-yellow font-bold"
            : bold
            ? "text-ink font-bold"
            : "text-ink"
        }
      >
        {value}
      </span>
    </div>
  );
}
