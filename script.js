async function main() {
  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const count = document.getElementById("count");

  let data;
  try {
    const res = await fetch("maquetas.json", { cache: "no-store" });
    data = await res.json();
  } catch (err) {
    empty.hidden = false;
    empty.querySelector("p").textContent = "No se pudo cargar maquetas.json";
    return;
  }

  const items = data.items || [];

  if (items.length === 0) {
    empty.hidden = false;
    return;
  }

  for (const item of items) {
    const url = encodeURI(item.path);
    const card = document.createElement("a");
    card.className = "card";
    card.href = url;
    card.target = "_blank";
    card.rel = "noopener";

    card.innerHTML = `
      <div class="preview">
        <iframe src="${url}" loading="lazy" tabindex="-1"></iframe>
      </div>
      <div class="card-body">
        <h2>${item.name}</h2>
        <p>${item.path}</p>
      </div>
    `;

    grid.appendChild(card);
  }

  count.textContent = `${items.length} maqueta${items.length === 1 ? "" : "s"}`;
}

main();
