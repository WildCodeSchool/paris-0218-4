const express = require('express')

const port = 3030

const blocks = require('../mocks/blocks/blocks.json')

const app = express()

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.get('/', (request, response) => {
  response.send('OK')
})
app.get('/blocks', (request, response) =>{
  response.json(blocks)
})
app.listen(port, () => console.log(`server listenning to port ${port}`))
