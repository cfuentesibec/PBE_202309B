const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const puerto = 5000

const tareas_controller = require('./controllers/tareas_controller')
const middlewares = require('./controllers/middlewares')

// definicion de endpoint GET en ruta principal
app.get('/', (request, response) => {
    response.send('Hola mundo!')
})

// CRUD = Create, Read, Update, Delete

// MIDDLEWARES
app.use('/api/v1/tareas/', middlewares.logearInfo)
app.use('/api/v1/tareas/', middlewares.validacionesComunes)

// HANDLERS
app.get('/api/v1/tareas/buscar', tareas_controller.buscar_tarea)

app.post('/api/v1/tareas/crear', tareas_controller.crear_tarea)

app.get('/api/v1/tareas/listar', middlewares.middleware2, tareas_controller.listar_tarea)

app.put('/api/v1/tareas/actualizar', tareas_controller.actualizar_tarea)

app.route('/api/v1/tareas/:indice')
  .get(tareas_controller.obtener_tarea)
  .delete(tareas_controller.eliminar_tarea);

// listen = escuchar
app.listen(puerto, () => {
    console.log('Escuchando en el puerto ' + puerto)
})
