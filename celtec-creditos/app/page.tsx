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
      {/* HERO — fondo oscuro */}
      <section className="bg-bg px-5 pt-14 pb-12 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-celtec-green mb-3">
          CelTec · Mexicali
        </p>
        <h1 className="font-display font-bold text-4xl leading-[1.05] mb-4 text-ink max-w-sm mx-auto">
          Tu próximo teléfono,
          <br />
          pagado a tu ritmo.
        </h1>
        <p className="text-inkmuted text-base max-w-xs mx-auto">
          Elige tu equipo, mira tu plan al instante y llévatelo sin trámites
          complicados.
        </p>
      </section>

      {/* CATÁLOGO — fondo claro */}
      <section className="bg-light-bg px-5 py-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-light-text text-center mb-1">
            Elige tu equipo
          </h2>
          <p className="text-light-muted text-sm text-center mb-6">
            Toca el que te interese para ver tu plan de pagos.
          </p>
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
        </div>
      </section>

      {/* SIMULADOR — fondo claro */}
      <section id="simulador" className="bg-light-bg px-5 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-light-text text-center mb-2">
            Así de claro es tu plan
          </h2>
          <p className="text-light-muted text-center text-sm mb-8">
            Sin sorpresas. Lo que ves es lo que pagas.
          </p>
          <PaymentSimulator
            producto={seleccionado}
            onQuieroEsteEquipo={() => setMostrarForm(true)}
          />
        </div>
      </section>

      {/* CONFIANZA — fondo oscuro */}
      <section className="bg-bg px-5 py-10 text-center">
        <p className="text-inkmuted text-sm mb-3 font-mono">
          Más de 15 años en Mexicali
        </p>
        <div className="inline-flex items-center gap-2 bg-surface border border-white/10 rounded-full px-4 py-2">
          <span className="text-celtec-green font-mono font-bold text-sm">
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
        className="fixed bottom-5 right-5 z-40 bg-celtec-green text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-black/30 text-2xl"
        aria-label="Escríbenos por WhatsApp"
      >
        💬
      </a>

      {mostrarForm && seleccionado && (
        <LeadForm
          producto={seleccionado}
          onClose={() => setMostrarForm(false)}
        />
      )}
    </main>
  );
}
