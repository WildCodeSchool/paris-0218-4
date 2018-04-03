const express = require('express')

const port = 3030

const modules = require('../mocks/modules/modules.json')

const app = express()

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (request, response) => {
  response.send('OK')
})

app.get('/modules', (request, response) =>{
  response.json(modules)
})

app.listen(port, () => console.log(`server listenning to port ${port}`))