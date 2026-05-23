// Catalogo de productos
const productos = [
  { id: 1,  nombre: "Bolso Cuero Premium",    precio: 140000, categoria: "Formal",    color: "Negro", imagen: "https://placehold.co/400x300/1a1a1a/white?text=Cuero+Premium" },
  { id: 2,  nombre: "Tote Everyday",          precio:  68000, categoria: "Casual",    color: "Beige", imagen: "https://placehold.co/400x300/c9b99a/333?text=Tote+Everyday" },
  { id: 3,  nombre: "Mochila Outdoor",        precio:  92000, categoria: "Deportivo", color: "Azul",  imagen: "https://placehold.co/400x300/1a3f7a/white?text=Outdoor" },
  { id: 4,  nombre: "Clutch Elegante",        precio:  99000, categoria: "Formal",    color: "Rojo",  imagen: "https://placehold.co/400x300/8b1a1a/white?text=Clutch" },
  { id: 5,  nombre: "Maleta Viajera",         precio: 160000, categoria: "Viaje",     color: "Cafe",  imagen: "https://placehold.co/400x300/7b5c3e/white?text=Maleta" },
  { id: 6,  nombre: "Rinonera Sport",         precio:  48000, categoria: "Deportivo", color: "Negro", imagen: "https://placehold.co/400x300/333/white?text=Sport" },
  { id: 7,  nombre: "Bolso Mercado",          precio:  55000, categoria: "Casual",    color: "Beige", imagen: "https://placehold.co/400x300/d4c5a9/333?text=Mercado" },
  { id: 8,  nombre: "Bolso de Viaje XL",      precio: 190000, categoria: "Viaje",     color: "Negro", imagen: "https://placehold.co/400x300/222/white?text=Viaje+XL" },
  { id: 9,  nombre: "Cartera Minimalista",    precio:  82000, categoria: "Formal",    color: "Cafe",  imagen: "https://placehold.co/400x300/6b4c30/white?text=Minimalista" },
  { id: 10, nombre: "Bolso Satchel",          precio:  76000, categoria: "Casual",    color: "Rojo",  imagen: "https://placehold.co/400x300/a02828/white?text=Satchel" },
  { id: 11, nombre: "Mochila Escolar Pro",    precio:  85000, categoria: "Deportivo", color: "Azul",  imagen: "https://placehold.co/400x300/1e50a2/white?text=Escolar+Pro" },
  { id: 12, nombre: "Bolso Crossbody",        precio:  63000, categoria: "Casual",    color: "Cafe",  imagen: "https://placehold.co/400x300/9c7a5a/white?text=Crossbody" },
];

// Referencias al DOM
const grilla         = document.getElementById("grilla");
const buscar         = document.getElementById("buscar");
const selCategoria   = document.getElementById("sel-categoria");
const selColor       = document.getElementById("sel-color");
const btnResetear    = document.getElementById("resetear");
const avisoVacio     = document.getElementById("aviso-vacio");
const infoResultados = document.getElementById("info-resultados");

// Genera el HTML de una tarjeta de producto
function tarjetaHTML(p) {
  return `
    <div class="producto">
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy"/>
      <div class="producto-datos">
        <h3>${p.nombre}</h3>
        <p class="valor">$${p.precio.toLocaleString("es-CO")}</p>
        <span class="chip">${p.categoria}</span>
        <span class="chip">${p.color}</span>
      </div>
    </div>
  `;
}

// Aplica los filtros activos y actualiza la vista
function actualizar() {
  const texto     = buscar.value.toLowerCase().trim();
  const categoria = selCategoria.value;
  const color     = selColor.value;

  const visibles = productos.filter(p => {
    const okTexto     = p.nombre.toLowerCase().includes(texto);
    const okCategoria = !categoria || p.categoria === categoria;
    const okColor     = !color     || p.color     === color;
    return okTexto && okCategoria && okColor;
  });

  infoResultados.textContent =
    `${visibles.length} producto${visibles.length !== 1 ? "s" : ""} encontrado${visibles.length !== 1 ? "s" : ""}`;

  if (visibles.length === 0) {
    grilla.innerHTML = "";
    avisoVacio.classList.remove("oculto");
  } else {
    avisoVacio.classList.add("oculto");
    grilla.innerHTML = visibles.map(tarjetaHTML).join("");
  }
}

// Resetea todos los controles al estado inicial
function resetearFiltros() {
  buscar.value        = "";
  selCategoria.value  = "";
  selColor.value      = "";
  actualizar();
}

// Eventos
buscar.addEventListener("input",   actualizar);
selCategoria.addEventListener("change", actualizar);
selColor.addEventListener("change",     actualizar);
btnResetear.addEventListener("click",   resetearFiltros);

// Carga inicial
actualizar();
