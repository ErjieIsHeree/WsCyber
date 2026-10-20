// 1. Cargamos la libreria con la que se hacen servidores web
import express from "express";

// 2. Creamos la aplicacion
const app = express();

// 3. Todo lo que haya en la carpeta "public" se envia al navegador tal cual
app.use(express.static("public"));

// 4. Los datos. En una aplicacion real estarian en una base de datos;
//    aqui los dejamos en una lista para no complicar el ejercicio.
const PELICULAS = [
    { titulo: "El tercer hombre", director: "Carol Reed", anio: 1949 },
    { titulo: "Ladrones de bicicletas", director: "Vittorio De Sica", anio: 1948 },
    { titulo: "Rashomon", director: "Akira Kurosawa", anio: 1950 },
    { titulo: "Cantando bajo la lluvia", director: "Stanley Donen", anio: 1952 },
];

// 5. Que responder cuando el navegador pida /api/peliculas
app.get("/api/peliculas", (peticion, respuesta) => {
    // 5.1 Recogemos lo que ha escrito el usuario
    const busqueda = peticion.query.titulo;

    // 5.2 Nos quedamos con las peliculas cuyo titulo contenga ese texto
    const resultado = PELICULAS.filter(p => p.titulo.toLowerCase().includes(String(busqueda).toLowerCase()));

    // 5.3 Respondemos con los datos en formato JSON
    respuesta.json(resultado);
});

// 6. Arrancamos el servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
