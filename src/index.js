const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const puerto = 5000

const tareas_controller = require('./controllers/tareas_controller')

// definicion de endpoint GET en ruta principal
app.get('/', (request, response) => {
    response.send('Hola mundo!')
})

app.get(                            // Método
  '/api/v1/tareas/buscar',          // Ruta / Path
  tareas_controller.buscar_tarea,   // Handler
) 

app.post('/api/v1/tareas/crear', tareas_controller.crear_tarea)

app.get('/api/v1/tareas/listar', tareas_controller.listar_tarea)

app.put('/api/v1/tareas/actualizar', tareas_controller.actualizar_tarea)

// listen = escuchar
app.listen(puerto, () => {
    console.log('Escuchando en el puerto ' + puerto)
})
