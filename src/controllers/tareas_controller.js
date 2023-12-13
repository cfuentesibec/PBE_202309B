const modelo = require('../model/tareas');
const globals = require('../globals');

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
    var pagina_actual = 1;
    var tamaño_pagina = 5;

    var cantidad_tareas = modelo.obtener_cantidad_tareas();
    
    if (request.params.tamaño_pagina) {
        tamaño_pagina = Math.min(request.params.tamaño_pagina, globals.MAX_TAMAÑO_PAGINA);
    }

    var cantidad_paginas = Math.ceil(cantidad_tareas / tamaño_pagina);
    if (request.params.pagina_actual) {
        pagina_actual = Math.min(request.params.pagina_actual, cantidad_paginas);
    }

    if (pagina_actual < 1 || tamaño_pagina < 1) {
        return response.status(400).send("Solicitud inválida. Revise la data e intente de nuevo.")
    }

    var indice_inicio = pagina_actual * tamaño_pagina - tamaño_pagina - 1;
    var indice_fin = Math.min(pagina_actual * tamaño_pagina - 1, cantidad_tareas - 1);

    var lista = modelo.listar(indice_inicio, indice_fin);
    if (!lista) {
        return response.status(404).send("No hay tareas aún.");
    }

    // wrapper = envoltorio
    response.status(200).send({
        "pagina_actual": pagina_actual,
        "tamaño_pagina": tamaño_pagina,
        "cantidad_tareas": cantidad_tareas,
        "cantidad_paginas": cantidad_paginas,
        "tareas": lista,
    });
}

function eliminar_tarea(request, response) {
    if (!request.params.indice) {
        return response.status(400).send("Parámetro 'indice' no especificado.");
    }

    var error = modelo.eliminar_por_indice(request.params.indice);
    if (error) {
        return response.status(500).send("Hubo un error al eliminar el registro.");
    }

    response.status(200).send();
}

module.exports = {
    obtener_tarea,
    crear_tarea,
    actualizar_tarea,
    listar_tarea,
    buscar_tarea,
    eliminar_tarea,
}