"use client";

import { Producto, calcularPlan } from "@/lib/products";

export default function ProductCard({
  producto,
  seleccionado,
  onSeleccionar,
}: {
  producto: Producto;
  seleccionado: boolean;
  onSeleccionar: (id: string) => void;
}) {
  const { semanas } = calcularPlan(producto);

  return (
    <button
      onClick={() => onSeleccionar(producto.id)}
      className={`group text-left rounded-2xl overflow-hidden bg-surface border transition-all duration-200 ${
        seleccionado
          ? "border-celtec-yellow ring-2 ring-celtec-yellow/40"
          : "border-white/5 hover:border-white/15"
      }`}
    >
      {/* Imagen */}
      <div className="relative aspect-square bg-surface2 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={producto.imagen}
          alt={`${producto.nombre} ${producto.almacenamiento}`}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
          }}
        />
        <span className="hidden absolute inset-0 flex items-center justify-center text-xs text-inkmuted font-mono px-4 text-center">
          foto próximamente: {producto.imagen}
        </span>

        {/* Etiquetas */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {producto.disponible && (
            <span className="text-[11px] font-mono uppercase tracking-wide bg-celtec-green/15 text-celtec-green border border-celtec-green/30 px-2 py-0.5 rounded-full">
              Disponible
            </span>
          )}
          {producto.pocasUnidades && (
            <span className="text-[11px] font-mono uppercase tracking-wide bg-celtec-yellow/15 text-celtec-yellow border border-celtec-yellow/30 px-2 py-0.5 rounded-full">
              Pocas unidades
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2.5">
        <div>
          <h3 className="font-display font-bold text-lg leading-tight">
            {producto.nombre}
          </h3>
          <p className="text-inkmuted text-sm">{producto.almacenamiento}</p>
        </div>

        <p className="text-sm text-ink/80 leading-snug">{producto.beneficio}</p>

        <div className="pt-2 border-t border-dashed flex items-end justify-between">
          <div>
            <p className="text-[11px] text-inkmuted font-mono uppercase tracking-wide">
              Abono semanal
            </p>
            <p className="font-mono font-bold text-xl text-celtec-yellow">
              ${producto.abonoSemanal}
            </p>
          </div>
          <p className="text-xs text-inkmuted font-mono">{semanas} semanas</p>
        </div>
      </div>
    </button>
  );
}
