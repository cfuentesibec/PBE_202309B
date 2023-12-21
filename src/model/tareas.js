/*
MODELO TAREA:
- nombre (str)
- prioridad (int)
- tiempo_estimado_hrs (int)
- completado (bool)
*/

var TAREAS = [
	{
		"nombre": "limpiar la cocina",
		"prioridad": 3,
		"tiempo_estimado": "1 hora",
		"completado": true
	},
	{
		"nombre": "pasar la aspiradora en la sala de estar",
		"prioridad": 2,
		"tiempo_estimado": "1 hora",
		"completado": true
	},
	{
		"nombre": "hacer la compra de comestibles",
		"prioridad": 3,
		"tiempo_estimado": "2 horas",
		"completado": false
	},
	{
		"nombre": "lavar la ropa",
		"prioridad": 2,
		"tiempo_estimado": "2 horas",
		"completado": true
	},
	{
		"nombre": "regar las plantas",
		"prioridad": 1,
		"tiempo_estimado": "1 hora",
		"completado": true
	},
	{
		"nombre": "organizar el armario",
		"prioridad": 2,
		"tiempo_estimado": "2 horas",
		"completado": false
	},
	{
		"nombre": "limpiar el baño",
		"prioridad": 3,
		"tiempo_estimado": "1 hora",
		"completado": true
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

const TAREAS_POR_PAGINA = 4;

const obtenerTareas = () => TAREAS.slice();


const filtrar_Tarea = (filtros, pagina, elementos_por_pagina) => {
    const { nombre, prioridad, tiempo_estimado, completado, orden, campo_orden } = filtros;
    let tareasFiltradas;

    if (nombre) {
        tareasFiltradas = TAREAS.filter(t => t.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }

    if (prioridad) {
        const prioridadNum = parseInt(prioridad, 10);
        if (prioridadNum >= 1 && prioridadNum <= 3) {
            tareasFiltradas = TAREAS.filter(t => t.prioridad === prioridadNum);
        } else {
            const error = new Error('La prioridad debe ser un número entre 1 y 3');
            error.status = 400;
            throw error;
        }
    }

    if (tiempo_estimado) {
        tareasFiltradas = TAREAS.filter(t => t.tiempo_estimado === parseInt(tiempo_estimado, 10));
    }

    if (completado) {
        const completadoBool = completado.toLowerCase() === 'true';
        tareasFiltradas = TAREAS.filter(t => t.completado === completadoBool);
    }

    const ordenCampo = campo_orden || 'nombre';
    const esAscendente = orden && orden.toUpperCase() === 'ASC';
    tareasFiltradas.sort((a, b) => {
        const valorA = a[ordenCampo];
        const valorB = b[ordenCampo];

        if (typeof valorA === 'string') {
            return esAscendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
        } else {
            return esAscendente ? valorA - valorB : valorB - valorA;
        }
    });
	
	const paginaActual = parseInt(pagina, 10) || 1;
    const elementosPorPagina = parseInt(elementos_por_pagina, 10) || TAREAS_POR_PAGINA;
    const indiceInicial = (paginaActual - 1) * elementosPorPagina;
    const indiceFinal = indiceInicial + elementosPorPagina;
    const tareasPaginadas = tareasFiltradas.slice(indiceInicial, indiceFinal);

    return {
        total_elementos: tareasFiltradas.length,
        pagina_actual: paginaActual,
        elementos_por_pagina: elementosPorPagina,
        tareas: tareasPaginadas,
    };
};


module.exports = {
	actualizar,
	guardar,
	obtener,
	listar,
	buscar,
	eliminar_por_indice,
	obtener_cantidad_tareas,
	obtenerTareas,
    filtrar_Tarea,
}