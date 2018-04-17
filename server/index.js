const express = require('express')
const fs = require('fs')
const util = require('util')                //  Filesystem
const path = require('path')            //  Util. pour les chemins d'accès
const port = 3030
const blocks = require('../mocks/blocks/blocks.json')
const app = express()
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)


app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
// app.get('/', (request, response) => {
//   response.send('OK')
// })

app.use((request, response, next) => {
  if (request.method === 'GET') return next()
  let accumulator = ''

  request.on('data', data => {
    accumulator += data
  })

  request.on('end', () => {
    try {
      request.body = JSON.parse(accumulator)
      next()
    } catch (err) {
      next(err)
    }
  })
})

app.listen(port, () => console.log(`server listenning to port ${port}`))

//_________________________________________//
            //  FILE SYSTEM //

const filePath = path.join(__dirname, '../mocks/blocks/blocks.json')

app.get('/', (request, response) => {
  response.send('OKokayyyyyyyyye')
    response.json(JSON.parse(data))
} )

app.get('/blocks', (request, response) => {
  response.json(blocks)
})

// return response.status(404).end('Not found')

app.post('/blocks', (request, response, next) => {
  const filepath = '../mocks/blocks/blocks.json'

  const content = {
    title: request.body.title,
    url: request.body.url
  }

  writeFile(filepath, JSON.stringify(content), 'utf8')
    .then(() => response.json('OK'))
    .catch(next)
})

