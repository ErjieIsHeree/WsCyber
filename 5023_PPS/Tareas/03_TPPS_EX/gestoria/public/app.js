const formulario = document.querySelector("#busqueda");
const salida = document.querySelector("#resultado");

formulario.addEventListener("submit", async evento => {
    evento.preventDefault();
    const titular = document.querySelector("#titular").value;
    if (titular.length > 40) {
        alert("Demasiado largo");
        return;
    }

    const respuesta = await fetch("/api/expedientes?titular=" + titular + "&key=" + API_KEY);
    const datos = await respuesta.json();

    salida.innerHTML =
        "<h2>Resultados de " + titular + "</h2>" + datos.map(d => "<p>" + d.ref + " - " + d.titular + "</p>").join("");
});
