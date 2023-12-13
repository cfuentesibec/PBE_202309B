/*
MODELO TAREA:
- nombre (str)
- prioridad (int)
- tiempo_estimado_hrs (int)
- completado (bool)
*/

var TAREAS = [
	{
		"nombre": "Limpiar la cocina",
		"prioridad": "3",
		"tiempo_estimado": "1 hora"
	},
	{
		"nombre": "Pasar la aspiradora en la sala de estar",
		"prioridad": "2",
		"tiempo_estimado": "1 hora"
	},
	{
		"nombre": "Hacer la compra de comestibles",
		"prioridad": "3",
		"tiempo_estimado": "2 horas"
	},
	{
		"nombre": "Lavar la ropa",
		"prioridad": "2",
		"tiempo_estimado": "2 horas"
	},
	{
		"nombre": "Regar las plantas",
		"prioridad": "1",
		"tiempo_estimado": "1 hora"
	},
	{
		"nombre": "Organizar el armario",
		"prioridad": "2",
		"tiempo_estimado": "2 horas"
	},
	{
		"nombre": "Limpiar el baño",
		"prioridad": "3",
		"tiempo_estimado": "1 hora"
	}
];

function obtener_cantidad_tareas() {
	return TAREAS.length;
}

function buscar(texto) {
	lista = listar();
	return lista.filter((tarea) => {
		return tarea.nombre.includes(texto);
	});
}

function guardar(tarea) {
	TAREAS.push(tarea);
	return { indice: TAREAS.length-1, ...tarea }
}

function obtener(indice) {
    return { "indice": indice, ...TAREAS[indice]};
}

function actualizar(tarea)  {
	var indice = tarea.indice;
	delete tarea.indice;
	return TAREAS[indice] = tarea;
}

function listar(inicio, fin) {
	var t = TAREAS.map((tarea, indice) => {
		return { "indice": indice, ...tarea };
	});

	return t.slice(inicio, fin);
}

function eliminar_por_indice(indice) {
	var hay_error = false;

	if (indice < 0 || indice >= TAREAS.length) {
		hay_error = true;
		return hay_error;
	}

	var elementos_eliminados = TAREAS.splice(indice, 1);
	if (elementos_eliminados.length < 1) {
		hay_error = true;
	}

	return hay_error;
}

module.exports = {
	actualizar,
	guardar,
	obtener,
	listar,
	buscar,
	eliminar_por_indice,
	obtener_cantidad_tareas,
}