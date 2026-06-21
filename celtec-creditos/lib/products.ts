// lib/products.ts
//
// CAPA DE DATOS — punto único de conexión.
// Hoy: regresa un arreglo fijo (los 5 modelos de Luis).
// Cuando exista la base SQL: solo se reemplaza el contenido de getProductos()
// por una consulta real (fetch a una API, conexión a la DB, etc.)
// El resto de la página (catálogo, simulador, tarjetas) NO se toca.

export type Producto = {
  id: string;
  nombre: string;
  almacenamiento: string;
  precioCredito: number;
  enganche: number;
  abonoSemanal: number;
  disponible: boolean;
  pocasUnidades: boolean;
  imagen: string; // ruta dentro de /public/images
  beneficio: string; // copy emocional corto, no ficha técnica
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
    beneficio: "Espacio de sobra para tus fotos, videos y apps de siempre.",
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
    beneficio: "Rápido para el día a día, sin trabarse a media llamada.",
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
    beneficio: "Batería que aguanta todo tu turno, de la mañana a la noche.",
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
    beneficio: "Cámara que se ve bien en tus redes, sin esfuerzo extra.",
  },
];

export async function getProductos(): Promise<Producto[]> {
  // Cuando exista la base SQL, aquí se hace el fetch/consulta real.
  return PRODUCTOS;
}

export function calcularPlan(p: Producto) {
  const saldo = p.precioCredito - p.enganche;
  const semanas = Math.ceil(saldo / p.abonoSemanal);
  const totalAPagar = p.enganche + semanas * p.abonoSemanal;
  return { semanas, totalAPagar, saldo };
}
