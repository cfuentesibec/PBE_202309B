const express = require('express')
const app = express()
const puerto = 5000

// definicion de endpoint GET en ruta principal
app.get('/', (request, response) => {
    response.send('Hola mundo!')
})

app.get('/tareas/buscar', (request, response) => {
    tarea = {
        'nombre': 'Lavar la ropa',
        'completado': false
    }
    response.send(tarea)
})

// listen = escuchar
app.listen(puerto, () => {
    console.log('Escuchando en el puerto ' + puerto)
})

