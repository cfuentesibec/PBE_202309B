/*
MODELO TAREA:
- nombre (str)
- prioridad (int)
- tiempo_estimado_hrs (int)
- completado (bool)
*/

TAREAS = [
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

function buscar(texto) {
	tareas = listar();
	return tareas.filter((tarea) => {
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

function listar() {
	return TAREAS.map((tarea, indice) => {
		return { indice, ...tarea };
	});
}

module.exports = {
	actualizar,
	guardar,
	obtener,
	listar,
	buscar,
}