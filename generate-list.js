// Escanea la carpeta /maquetas y genera maquetas.json con la lista de maquetas
// encontradas. Se ejecuta automaticamente en cada deploy (ver package.json / vercel.json).
const fs = require("fs");
const path = require("path");

const MAQUETAS_DIR = path.join(__dirname, "maquetas");
const OUTPUT_FILE = path.join(__dirname, "maquetas.json");

function stripExt(name) {
  // ".dc.html" es la convencion de los mockups exportados desde el
  // "design canvas" (ver dcNameFromPath en maquetas/support.js) - se
  // despoja entera para no dejar el ".dc" colgando en el nombre.
  return name.replace(/\.dc\.html?$/i, "").replace(/\.html?$/i, "");
}

function humanize(name) {
  return stripExt(name)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function scan() {
  const items = [];

  if (!fs.existsSync(MAQUETAS_DIR)) {
    fs.mkdirSync(MAQUETAS_DIR, { recursive: true });
  }

  const entries = fs.readdirSync(MAQUETAS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && /\.html?$/i.test(entry.name)) {
      items.push({
        id: stripExt(entry.name),
        name: humanize(entry.name),
        path: `maquetas/${entry.name}`,
      });
    } else if (entry.isDirectory()) {
      const indexPath = path.join(MAQUETAS_DIR, entry.name, "index.html");
      if (fs.existsSync(indexPath)) {
        items.push({
          id: entry.name,
          name: humanize(entry.name),
          path: `maquetas/${entry.name}/index.html`,
        });
      }
    }
  }

  items.sort((a, b) => a.name.localeCompare(b.name, "es"));

  const output = {
    generatedAt: new Date().toISOString(),
    items,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + "\n");
  console.log(`maquetas.json generado con ${items.length} maqueta(s).`);
}

scan();
