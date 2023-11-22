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
    return TAREAS[indice];
}

module.exports = {
    guardar,
    buscar,
}