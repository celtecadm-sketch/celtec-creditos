export type Producto = {
  id: string;
  nombre: string;
  almacenamiento: string;
  precioCredito: number;
  enganche: number;
  abonoSemanal: number;
  disponible: boolean;
  pocasUnidades: boolean;
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
    pocasUnidades: false,
    imagen: "/images/samsung-a07.jpg",
    beneficio: "Fotos claras en cualquier momento del día.",
    caracteristicas: [
      "Pantalla amplia y fluida para ver videos sin cansarte",
      "Respuesta rápida para uso diario sin complicaciones",
      "Batería que te acompaña todo el día",
      "Ideal para redes, WhatsApp y contenido",
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
    pocasUnidades: false,
    imagen: "/images/redmi-a5.jpg",
    beneficio: "Ligero y práctico para el día a día.",
    caracteristicas: [
      "Rendimiento eficiente para lo que más usas",
      "Ligero y práctico para el día a día",
      "Batería que rinde sin preocuparte",
      "Ideal como equipo funcional y económico",
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
    pocasUnidades: true,
    imagen: "/images/motorola-g06-64.jpg",
    beneficio: "Experiencia limpia y rápida, sin apps innecesarias.",
    caracteristicas: [
      "Fluidez en uso diario y buena respuesta",
      "Batería confiable para todo el día",
      "Espacio suficiente para fotos, apps y videos",
      "Sin bloatware — solo lo que necesitas",
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
    pocasUnidades: true,
    imagen: "/images/motorola-g06-128.jpg",
    beneficio: "El doble de espacio para que nunca te diga 'memoria llena'.",
    caracteristicas: [
      "Experiencia limpia y rápida sin apps innecesarias",
      "128 GB — fotos, videos y apps sin preocuparte por el espacio",
      "Batería confiable para todo el día",
      "Fluidez garantizada en uso diario",
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
    pocasUnidades: false,
    imagen: "/images/samsung-a17.jpg",
    beneficio: "Rendimiento estable para apps, series y multitarea.",
    caracteristicas: [
      "Fotos claras en cualquier momento del día",
      "Pantalla cómoda para ver series y navegar",
      "Rendimiento estable para apps y multitarea",
      "Batería duradera para uso continuo",
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
