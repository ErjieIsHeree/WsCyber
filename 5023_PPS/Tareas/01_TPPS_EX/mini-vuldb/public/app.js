// 1. Localizar el formulario y la caja de resultados de la pagina
//    Pista: document.querySelector("#el-id-que-le-pusiste")
const formulario = document.querySelector("#formulario-busqueda");
const campoTitulo = document.querySelector("#campo-titulo");
const botonTodas = document.querySelector("#boton-todas");
const cajaResultados = document.querySelector("#resultados");

// 2. Decirle al formulario: "cuando alguien te envie, haz esto"
//    Pista: formulario.addEventListener("submit", async (evento) => { ... })
//    Y dentro, lo PRIMERO: evento.preventDefault();
//    (si no, el navegador recarga la pagina y no veras nada)
formulario.addEventListener("submit", async evento => {
    evento.preventDefault();

    // 3. Leer lo que ha escrito el usuario y pedirselo al servidor
    //    Pista: const respuesta = await fetch("/api/peliculas?titulo=" + loQueEscribio);
    //           const datos = await respuesta.json();
    const peliculas = await pedirPeliculas(campoTitulo.value.trim());

    // 4. Mostrar los resultados en la caja
    //    Aqui hay varias formas de hacerlo. Usa la que conozcas o la que encuentres.
    pintarPeliculas(peliculas);
});

botonTodas.addEventListener("click", async () => {
    campoTitulo.value = "";
    pintarPeliculas(await pedirPeliculas(""));
});

cargarCatalogo();

async function cargarCatalogo() {
    pintarPeliculas(await pedirPeliculas(""));
}

async function pedirPeliculas(titulo) {
    try {
        const respuesta = await fetch("/api/peliculas?titulo=" + encodeURIComponent(titulo));
        return await respuesta.json();
    } catch (error) {
        console.error("No se ha podido pedir el catálogo:", error);
        return [];
    }
}

function pintarPeliculas(peliculas) {
    cajaResultados.replaceChildren();

    if (!peliculas || peliculas.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Sin resultado.";
        cajaResultados.appendChild(aviso);
        return;
    }

    const lista = document.createElement("ul");

    for (const pelicula of peliculas) {
        const item = document.createElement("li");

        const titulo = document.createElement("h2");
        titulo.textContent = pelicula.titulo;

        const director = document.createElement("p");
        director.textContent = "Director: " + pelicula.director;

        const anio = document.createElement("p");
        anio.textContent = "Año: " + pelicula.anio;

        item.append(titulo, director, anio);
        lista.appendChild(item);
    }

    cajaResultados.appendChild(lista);
}
