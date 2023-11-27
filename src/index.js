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

app.get('/tareas/listar', (request, response) => {
        tareas = [
        
        {
            "nombre": "Limpiar la cocina",
            "prioridad": "Alta",
            "tiempo_estimado": "1 hora"
          },
          {
            "nombre": "Pasar la aspiradora en la sala de estar",
            "prioridad": "Media",
            "tiempo_estimado": "30 minutos"
          },
          {
            "nombre": "Hacer la compra de comestibles",
            "prioridad": "Alta",
            "tiempo_estimado": "1.5 horas"
          },
          {
            "nombre": "Lavar la ropa",
            "prioridad": "Media",
            "tiempo_estimado": "1.5 horas"
          },
          {
            "nombre": "Regar las plantas",
            "prioridad": "Baja",
            "tiempo_estimado": "15 minutos"
          },
          {
            "nombre": "Organizar el armario",
            "prioridad": "Media",
            "tiempo_estimado": "2 horas"
          },
          {
            "nombre": "Hacer la cama",
            "prioridad": "Baja",
            "tiempo_estimado": "10 minutos"
          },
          {
            "nombre": "Limpiar el baño",
            "prioridad": "Alta",
            "tiempo_estimado": "45 minutos"
          }

        ]


    response.send(tareas)
})

app.put('/api/v1/tareas/actualizar', tareas_controller.actualizar_tarea)

// listen = escuchar
app.listen(puerto, () => {
    console.log('Escuchando en el puerto ' + puerto)
})

