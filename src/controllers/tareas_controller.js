const modelo = require('../model/tareas')

function buscar_tarea(request, response) {
    if (!request.query.indice) {
        return response.status(400).send("Parámetro 'indice' no especificado.");
    }

    tarea = modelo.buscar(request.query.indice);
    if (!tarea) {
        return response.status(404).send("La tarea no existe.");
    }

    response.status(200).send(tarea);
}

function crear_tarea(request, response) {
    tarea = request.body;
    tarea = modelo.guardar(tarea);
    if (!tarea) { // valida null, undefined
        return response.status(500).send("Hubo un error inesperado.");
    }
    response.status(201).send(tarea);
}

const tarea_listar = require('../model/tarea_listar');

function listar_tarea(request, response) {
    console.log("Lista de Tareas:")
    Array.forEach(function(tarea_listar, indice) {
        console.log(`${indice + 1}. Tarea: ${tarea.nombre}`);
        console.log(`   Prioridad: ${tarea.prioridad}`);
        console.log(`   Tiempo estimado: ${tarea.tiempo_estimado}`);
        console.log("   ------------");
    });
}

module.exports = {
    buscar_tarea,
    crear_tarea,
    listar_tarea,
}