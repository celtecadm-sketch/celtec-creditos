export type Producto = {
  id: string;
  nombre: string;
  almacenamiento: string;
  precioCredito: number;
  enganche: number;
  abonoSemanal: number;
  disponible: boolean;
  imagen: string;
  beneficio: string;
  caracteristicas: string[];
};

const PRODUCTOS: Producto[] = [
  {
    id: "samsung-a07",
    nombre: "Samsung A07",
    almacenamiento: "64 GB",
    precioCredito: 3500,
    enganche: 1000,
    abonoSemanal: 250,
    disponible: true,
    imagen: "/images/samsung-a07.jpg",
    beneficio: "Fotos claras en cualquier momento del día.",
    caracteristicas: [
      "Fluido desde el primer uso — responde cuando tú lo necesitas",
      "RAM que mantiene tus apps corriendo sin cerrarlas",
      "Batería que aguanta tu día completo sin buscarte el cargador",
      "Cámara que captura cada momento con claridad, de día o de noche",
    ],
  },
  {
    id: "redmi-a5",
    nombre: "Redmi A5",
    almacenamiento: "64 GB",
    precioCredito: 3500,
    enganche: 1000,
    abonoSemanal: 250,
    disponible: true,
    imagen: "/images/redmi-a5.jpg",
    beneficio: "Ligero y práctico para el día a día.",
    caracteristicas: [
      "Tus redes sociales al ritmo de tu día, sin esperas",
      "Memoria que no te dice 'almacenamiento lleno' cuando más la necesitas",
      "Batería que rinde de la mañana a la noche sin preocuparte",
      "Diseño delgado y ligero — siente y admira su elegancia",
    ],
  },
  {
    id: "motorola-g06-64",
    nombre: "Motorola G06",
    almacenamiento: "64 GB",
    precioCredito: 3900,
    enganche: 1200,
    abonoSemanal: 250,
    disponible: true,
    imagen: "/images/motorola-g06-64.jpg",
    beneficio: "Experiencia limpia y rápida, sin interrupciones.",
    caracteristicas: [
      "Responde al instante — sin trabas, sin esperas, desde el primer día",
      "RAM expandible hasta 12 GB: más fluidez para jugar y navegar",
      "Batería de 5200 mAh — úsalo todo el día sin limitarte",
      "Cámara 50MP con IA — capta cada detalle como lo ves tú",
    ],
  },
  {
    id: "motorola-g06-128",
    nombre: "Motorola G06",
    almacenamiento: "128 GB",
    precioCredito: 4800,
    enganche: 1300,
    abonoSemanal: 250,
    disponible: true,
    imagen: "/images/motorola-g06-128.jpg",
    beneficio: "El doble de espacio, la misma potencia.",
    caracteristicas: [
      "Responde al instante — sin trabas, sin esperas, desde el primer día",
      "RAM expandible hasta 12 GB: más fluidez para jugar y navegar",
      "Batería de 5200 mAh — úsalo todo el día sin limitarte",
      "Cámara 50MP con IA — capta cada detalle como lo ves tú",
    ],
  },
  {
    id: "samsung-a17",
    nombre: "Samsung A17",
    almacenamiento: "128 GB",
    precioCredito: 4800,
    enganche: 1300,
    abonoSemanal: 250,
    disponible: true,
    imagen: "/images/samsung-a17.jpg",
    beneficio: "Rendimiento estable para apps, series y multitarea.",
    caracteristicas: [
      "Multitarea sin esfuerzo — abre todo lo que necesitas sin que se trabe",
      "Pantalla de 6.7\" — series, videos y redes como si estuvieras en el cine",
      "Batería que dura más que tu día más largo",
      "Fotos que se ven profesionales aunque no sepas de fotografía",
    ],
  },
];

export async function getProductos(): Promise<Producto[]> {
  return PRODUCTOS;
}

export function calcularPlan(p: Producto) {
  const saldo = p.precioCredito - p.enganche;
  const semanas = Math.ceil(saldo / p.abonoSemanal);
  const totalAPagar = p.enganche + semanas * p.abonoSemanal;
  return { semanas, totalAPagar, saldo };
}
