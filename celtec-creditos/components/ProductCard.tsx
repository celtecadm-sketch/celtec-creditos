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
      className={`group text-left rounded-2xl overflow-hidden bg-light-card border transition-all duration-200 shadow-sm ${
        seleccionado
          ? "border-celtec-blue ring-2 ring-celtec-blue/30 shadow-md"
          : "border-light-border hover:border-celtec-blue/40 hover:shadow-md"
      }`}
    >
      {/* Imagen */}
      <div className="relative aspect-square bg-light-bg flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={producto.imagen}
          alt={`${producto.nombre} ${producto.almacenamiento}`}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            const next = (e.target as HTMLImageElement).nextElementSibling;
            if (next) next.classList.remove("hidden");
          }}
        />
        <span className="hidden absolute inset-0 flex items-center justify-center text-xs text-light-muted font-mono px-4 text-center leading-snug">
          📷 foto próximamente
        </span>

        {/* Pocas unidades — esquina superior derecha, negro sobre amarillo */}
        {producto.pocasUnidades && (
          <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wide bg-yellow-400 text-black px-2 py-0.5 rounded-full shadow-sm">
            Pocas unidades
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">

        {/* Disponible — arriba del nombre, centrado, bold */}
        {producto.disponible && (
          <p className="text-center font-bold text-[11px] uppercase tracking-widest text-celtec-greendark">
            ✓ Disponible
          </p>
        )}

        <div>
          <h3 className="font-display font-bold text-lg leading-tight text-light-text">
            {producto.nombre}
          </h3>
          <p className="text-light-muted text-sm">{producto.almacenamiento}</p>
        </div>

        <p className="text-sm text-light-text/70 leading-snug">{producto.beneficio}</p>

        <div className="pt-2 border-t border-light-border flex items-end justify-between">
          <div>
            <p className="text-[11px] text-light-muted font-mono uppercase tracking-wide">
              Abono semanal
            </p>
            <p className="font-mono font-bold text-xl text-celtec-blue">
              ${producto.abonoSemanal}
            </p>
          </div>
          <p className="text-xs text-light-muted font-mono">{semanas} semanas</p>
        </div>
      </div>
    </button>
  );
}
