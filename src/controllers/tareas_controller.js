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

<<<<<<< HEAD
function actualizar_tarea(request, response) {
    tarea = request.body;
    if (!tarea || tarea.indice == undefined) {
        return response.status(400).send("Solicitud inválida. Revise la data e intente de nuevo.")
    }

    tarea = modelo.actualizar(tarea);
    if (!tarea) {
        return response.status(500).send("Hubo un error inesperado.");
    }

    response.status(201).send(tarea);
=======
function listar_tarea(request, response) {
    lista = modelo.listar();

    if (!lista) {
        return response.status(404).send("No hay tareas aún.");
    }

    response.status(200).send(lista);
>>>>>>> b288830c2bede5925632dcd33f5a9e9a014fc9d6
}

module.exports = {
    buscar_tarea,
    crear_tarea,
<<<<<<< HEAD
    actualizar_tarea,
=======
    listar_tarea,
>>>>>>> b288830c2bede5925632dcd33f5a9e9a014fc9d6
}