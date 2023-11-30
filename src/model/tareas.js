/*
  MODELO TAREA:
    - nombre (str)
    - prioridad (int)
    - tiempo_estimado_hrs (int)
    - completado (bool)
*/

TAREAS = [];

function guardar(tarea) {
    TAREAS.push(tarea);
    return { indice: TAREAS.length-1, ...tarea }
}

function buscar(indice) {
    return { "indice": indice, ...TAREAS[indice]};
}

function actualizar(tarea)  {
	var indice = tarea.indice;
	delete tarea.indice;
	return TAREAS[indice] = tarea;
}

module.exports = {
    guardar,
    buscar,
    actualizar,
}