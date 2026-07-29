# Galería de Maquetas

Interfaz estática para navegar tus maquetas HTML, con preview en vivo (iframe) por cada una. Pensada para desplegarse en Vercel sin backend.

## Cómo agregar una maqueta

Solo copia tu maqueta dentro de la carpeta `maquetas/`, de dos formas posibles:

- **Un solo archivo:** `maquetas/mi-maqueta.html`
- **Con recursos propios (css, js, imágenes):** carpeta `maquetas/mi-maqueta/index.html` + sus archivos al lado.

No hay que tocar `index.html` ni `script.js`: la lista se genera sola.

## Cómo se genera la lista

`generate-list.js` escanea `/maquetas` y escribe `maquetas.json` (nombre + ruta de cada maqueta). Esto corre automáticamente:

- En local: `npm run build`
- En Vercel: en cada deploy (configurado en `vercel.json` como `buildCommand`)

## Desarrollo local

```
npm run build   # genera maquetas.json
npx serve .     # sirve el sitio en http://localhost:3000
```

(o usa la extensión "Live Server" de VSCode sobre `index.html`)

## Deploy en Vercel

Con la CLI de Vercel, desde esta carpeta:

```
npm install -g vercel   # si no la tienes
vercel                  # deploy de prueba
vercel --prod           # deploy a producción
```

También puedes subir esta carpeta a un repo de GitHub e importarlo desde el dashboard de Vercel — detectará `vercel.json` automáticamente.

## Estructura

```
index.html        Página principal (galería)
style.css          Estilos
script.js          Lee maquetas.json y pinta las tarjetas
maquetas.json       Generado automáticamente, no editar a mano
generate-list.js    Script que escanea /maquetas
maquetas/           Tus maquetas HTML van aquí
```
