"use client";

import { useEffect, useState } from "react";
import { Producto, getProductos } from "@/lib/products";
import { registrarEvento } from "@/lib/eventos";
import ProductCard from "@/components/ProductCard";
import PaymentSimulator from "@/components/PaymentSimulator";
import LeadForm from "@/components/LeadForm";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [seleccionadoId, setSeleccionadoId] = useState<string | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    getProductos().then(setProductos);
    // Registrar visita al cargar la página
    registrarEvento("visita");
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

  function abrirFormulario() {
    // Registrar que llegó al formulario
    registrarEvento("formulario_abierto", seleccionadoId ?? undefined);
    setMostrarForm(true);
  }

  function cerrarFormulario() {
    setMostrarForm(false);
  }

  return (
    <main>
      {/* HERO — fondo oscuro */}
      <section className="bg-bg px-5 pt-12 pb-12 text-center">
        <p className="font-display font-bold text-2xl uppercase tracking-[0.2em] text-celtec-green mb-3">
          CelTec · Mexicali
        </p>
        <a
          href="https://wa.me/526866761121"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="#22C55E">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.845L.057 23.077a.75.75 0 00.916.916l5.232-1.453A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-4.964-1.361l-.355-.211-3.684 1.023 1.023-3.684-.211-.355A9.726 9.726 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
          <span className="text-ink text-lg font-mono font-medium tracking-wide">
            686 676 11 21
          </span>
        </a>

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

      {/* TÍTULO CATÁLOGO — fondo oscuro */}
      <section className="bg-bg px-5 pt-10 pb-6 text-center border-t border-white/10">
        <h2 className="font-display font-bold text-3xl text-ink">Elige tu equipo</h2>
        <p className="text-inkmuted text-base mt-2">
          Toca el que te interese para ver más detalles.
        </p>
      </section>

      {/* CATÁLOGO — fondo claro */}
      <section className="bg-light-bg px-5 py-8">
        <div className="max-w-5xl mx-auto">
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

      {/* TÍTULO SIMULADOR — fondo oscuro */}
      <section className="bg-bg px-5 pt-10 pb-6 text-center border-t border-white/10">
        <h2 className="font-display font-bold text-3xl text-ink">Así de claro es tu plan</h2>
        <p className="text-inkmuted text-base mt-2">Sin sorpresas. Lo que ves es lo que pagas.</p>
      </section>

      {/* SIMULADOR — fondo claro */}
      <section id="simulador" className="bg-light-bg px-5 py-10">
        <div className="max-w-5xl mx-auto">
          <PaymentSimulator
            producto={seleccionado}
            onQuieroEsteEquipo={abrirFormulario}
          />
        </div>
      </section>

      {/* CONFIANZA — fondo oscuro */}
      <section className="bg-bg px-5 py-10 text-center border-t border-white/10">
        <p className="text-inkmuted text-sm mb-3 font-mono">Más de 15 años en Mexicali</p>
        <div className="inline-flex items-center gap-2 bg-surface border border-white/10 rounded-full px-4 py-2">
          <span className="text-celtec-green font-mono font-bold text-sm">★ 4.6</span>
          <span className="text-inkmuted text-xs font-mono">· 42 reseñas en Google</span>
        </div>
      </section>

      {/* WHATSAPP FLOTANTE */}
      <a
        href="https://wa.me/526866761121"
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
          onClose={cerrarFormulario}
        />
      )}
    </main>
  );
}
