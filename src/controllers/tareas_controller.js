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

function listar_tarea(request, response) {
    lista = modelo.listar();

    if (!lista) {
        return response.status(404).send("No hay tareas aún.");
    }

    response.status(200).send(lista);
}

module.exports = {
    buscar_tarea,
    crear_tarea,
    listar_tarea,
}