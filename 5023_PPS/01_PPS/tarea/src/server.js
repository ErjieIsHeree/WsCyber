import express from "express";

const app = express();
app.use(express.static("public"));

const EXPEDIENTES = [
    { ref: "EXP-000123", titular: "Ana Lopez", perfil: "cliente" },
    { ref: "EXP-000124", titular: "Luis Marti", perfil: "cliente" },
    { ref: "EXP-000999", titular: "Auditoria interna", perfil: "admin" },
];

app.get("/api/expedientes", (peticion, respuesta) => {
    const titular = peticion.query.titular;

    if (titular.length > 40) {
        return respuesta.status(400).json({ error: '"titular" solo puede tener 40 caracteres como máximo' });
    } else if (!titular) {
        return respuesta.status(400).json({ error: '"titular" no puede estar vacío' });
    }

    // 1. Quien puede ver que: si la peticion dice ser admin, lo ve TODO;
    //    si no, se ocultan los expedientes marcados como admin
    const visibles = EXPEDIENTES.filter(e => e.perfil !== "admin");

    // 2. De los visibles, los que coincidan con el texto buscado
    const resultado = visibles.filter(e => e.titular.toLowerCase().includes(String(titular).toLowerCase()));

    respuesta.json(resultado);
});

app.listen(3000, () => console.log("http://localhost:3000"));
