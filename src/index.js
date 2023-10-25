const express = require('express')
const app = express()
const puerto = 5000

// definicion de endpoint GET en ruta principal
app.get('/', (request, response) => {
    response.send('Hola mundo!')
})

// listen = escuchar
app.listen(puerto, () => {
    console.log('Escuchando en el puerto ' + puerto)
})