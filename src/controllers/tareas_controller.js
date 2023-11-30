const modelo = require('../model/tareas')

function buscar_tarea(request, response) {
    if (!request.query.texto) {
        return response.status(400).send("Parámetro 'texto' no especificado.");
    }

    var tareas = modelo.buscar(request.query.texto);
    if (!tareas) {
        return response.status(404).send("No se encontraron tareas.");
    }

    response.status(200).send(tareas);
}

function obtener_tarea(request, response) {
    if (!request.params.indice) {
        return response.status(400).send("Parámetro 'indice' no especificado.");
    }

    var tarea = modelo.obtener(request.params.indice);
    if (!tarea) {
        return response.status(404).send("La tarea no existe.");
    }

    response.status(200).send(tarea);
}

function crear_tarea(request, response) {
    var tarea = request.body;
    tarea = modelo.guardar(tarea);
    if (!tarea) { // valida null, undefined
        return response.status(500).send("Hubo un error inesperado.");
    }
    response.status(201).send(tarea);
}

function actualizar_tarea(request, response) {
    var tarea = request.body;
    if (!tarea || tarea.indice == undefined) {
        return response.status(400).send("Solicitud inválida. Revise la data e intente de nuevo.")
    }

    tarea = modelo.actualizar(tarea);
    if (!tarea) {
        return response.status(500).send("Hubo un error inesperado.");
    }

    response.status(201).send(tarea);
}

function listar_tarea(request, response) {
    var lista = modelo.listar();

    if (!lista) {
        return response.status(404).send("No hay tareas aún.");
    }

    response.status(200).send(lista);
}

module.exports = {
    obtener_tarea,
    crear_tarea,
    actualizar_tarea,
    listar_tarea,
    buscar_tarea
}