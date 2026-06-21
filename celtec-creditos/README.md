# CelTec Créditos — Página web

## Qué es esto
Catálogo de los 5 equipos + simulador de plan de pago + formulario de
captura de datos y referencias. Sin necesidad de instalar nada en tu
computadora para publicarla.

## Cómo subir esto a GitHub (sin terminal)

1. Entra a github.com con tu cuenta
2. Clic en el botón verde "New" (crear repositorio nuevo)
3. Nombra el repositorio: `celtec-creditos`
4. Déjalo en "Public" o "Private" (cualquiera funciona con Vercel)
5. NO marques "Add a README file" (ya traemos uno)
6. Clic en "Create repository"
7. En la siguiente pantalla, busca el link "uploading an existing file"
8. Arrastra TODA la carpeta `celtec-creditos` (todos los archivos y
   subcarpetas) a esa zona de carga
9. Abajo, clic en "Commit changes"

## Cómo conectarlo a Vercel

1. Entra a vercel.com (ya tienes tu cuenta conectada a GitHub)
2. Clic en "Add New..." → "Project"
3. Busca y selecciona el repositorio `celtec-creditos`
4. Clic en "Deploy" (no necesitas cambiar ninguna configuración,
   Vercel reconoce que es un proyecto Next.js automáticamente)
5. Espera 1-2 minutos — te da una URL tipo `celtec-creditos.vercel.app`

Listo, la página ya está viva y pública en esa URL.

## Cómo actualizar la página después
Cada vez que yo te dé archivos nuevos o cambios, los subes a GitHub
(mismo repositorio, "Add file" → "Upload files") y Vercel actualiza la
página sola en 1-2 minutos. No hay que repetir el paso de Vercel.

## Pendientes antes de que se vea completa
- [ ] Agregar las 5 fotos en `public/images/` (ver LEEME.txt ahí dentro)
- [ ] Cambiar el número de WhatsApp en `app/page.tsx` (busca `52XXXXXXXXXX`)
- [ ] Cuando exista el backend, conectar el formulario en
      `components/LeadForm.tsx` (está marcado con `// TODO`)
- [ ] Cuando exista la base SQL, conectar `lib/products.ts` →
      función `getProductos()`
