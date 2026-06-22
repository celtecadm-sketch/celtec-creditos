"use client";

import { useEffect, useState } from "react";
import { Producto, getProductos } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import PaymentSimulator from "@/components/PaymentSimulator";
import LeadForm from "@/components/LeadForm";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [seleccionadoId, setSeleccionadoId] = useState<string | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  const seleccionado = productos.find((p) => p.id === seleccionadoId) ?? null;

  function seleccionar(id: string) {
    setSeleccionadoId(id);
    setTimeout(() => {
      document
        .getElementById("simulador")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  return (
    <main>
      {/* HERO */}
      <section className="px-5 pt-14 pb-10 text-center max-w-lg mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-celtec-yellow mb-3">
          CelTec · Mexicali
        </p>
        <h1 className="font-display font-bold text-4xl leading-[1.05] mb-4">
          Tu próximo teléfono,
          <br />
          pagado a tu ritmo.
        </h1>
        <p className="text-inkmuted text-base">
          Elige tu equipo, mira tu plan al instante y llévatelo sin trámites
          complicados.
        </p>
      </section>

      {/* CATÁLOGO */}
      <section className="px-5 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {productos.map((p) => (
            <ProductCard
              key={p.id}
              producto={p}
              seleccionado={p.id === seleccionadoId}
              onSeleccionar={seleccionar}
            />
          ))}
        </div>
      </section>

      {/* SIMULADOR */}
      <section id="simulador" className="px-5 py-16 max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-2xl text-center mb-2">
          Así de claro es tu plan
        </h2>
        <p className="text-inkmuted text-center text-sm mb-8">
          Sin sorpresas. Lo que ves es lo que pagas.
        </p>
        <PaymentSimulator
          producto={seleccionado}
          onQuieroEsteEquipo={() => setMostrarForm(true)}
        />
      </section>

      {/* CONFIANZA */}
      <section className="px-5 pb-16 max-w-lg mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-surface border border-white/10 rounded-full px-4 py-2">
          <span className="text-celtec-yellow font-mono font-bold text-sm">
            ★ 4.6
          </span>
          <span className="text-inkmuted text-xs font-mono">
            · 42 reseñas en Google
          </span>
        </div>
      </section>

      {/* WHATSAPP FLOTANTE */}
      <a
        href="https://wa.me/526862901448"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-celtec-green text-bg w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-black/30 text-2xl"
        aria-label="Escríbenos por WhatsApp"
      >
        💬
      </a>

      {mostrarForm && seleccionado && (
        <LeadForm producto={seleccionado} onClose={() => setMostrarForm(false)} />
      )}
    </main>
  );
}
