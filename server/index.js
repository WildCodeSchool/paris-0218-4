//==============MODULES==============//
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const fs = require('fs')
const util = require('util')                             //  Filesystem
const path = require('path')                             //  Util. pour les chemins d'accès
const app = express()
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const port = 3030

const secret = 'KIKOO'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//==============HEADER==============//
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  response.header('Access-Control-Allow-Credentials', 'true')
  response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  next()
})

//==============LOG IN==============//
app.use(session({
  secret,
  saveUninitialized: false,
  resave: true,
  store: new FileStore({ secret }),
}))

const users = [
  { username: 'Yoann', password: 'kookoocmoi', admin: 'true' },
  { username: 'Charles', password: 'hellovous', admin: 'false' }
]

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`, { user: req.session.user, cookie: req.headers.cookie })
//   next()
// })

app.get('/', (req, res) => {
  const user = req.session.user || {}
  res.json(user)
})

app.post('/log-in', (req, res, next) => {
  const user = users.find(u => req.body.username === u.username)

  if (!user) {
    console.log('user wrong')
    return res.json({ error: 'User not found' })
  }

  if (user.password !== req.body.password) {
    console.log('user wrong')
    return res.json({ error: 'Wrong password' })
  }

  req.session.user = user

  res.json(user)
  console.log(user, 'user trouvé')
  // res.redirect('/homepage.html')


  // .then(result => {
  // window.location = '/homepage.html'
  // })

})

app.use((err, req, res, next) => {
  if (err) {
    res.json({ message: err.message })
    console.error(err)
  }
  next(err)
})

//==============ACCU==============//
app.use((request, response, next) => {
  if (request.method !== 'POST' && request.method !== 'PUT' ) return next()
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

const filePath = path.join(__dirname, '../mocks/blocks/blocks.json')  // FILEPATH

//==============HOME==============//
app.get('/', (request, response) => {
  response.send('OKokayyyyyyyyye')
  response.json(JSON.parse(data))
})

//==============GET BLOCKS==============//
app.get('/blocks', (request, response, next) => {
  readFile('../mocks/blocks/blocks.json', 'utf8')
  .then(data => {
    const blocks = JSON.parse(data)
    response.json(blocks)
  })
  .catch(next)
})

//==============POST BLOCK==============//
app.post('/blocks', (request, response, next) => {
  const filepath = '../mocks/blocks/blocks.json'
  readFile(filepath, 'utf8')
    .then(JSON.parse)
    .then(async blocks => {

      blocks.push({
        id: blocks.length,
        title: request.body.title,
        url: request.body.url,
        icon: request.body.color.split('-')[1] === "b" ?
        `img/icon-${request.body.icon}.png` :
        `img/icon-${request.body.icon}-blanc.png`,
        color: `#${request.body.color.split('-')[0]}`,
        titleColor: request.body.color.split('-')[1] === "b" ? "#292e2a" : "white",
        position: blocks.length + 1
      })
      const content = JSON.stringify(blocks, null, 2)
      await writeFile(filepath, content, 'utf8')
      response.json(blocks)
    })
    .catch(next)
})

//==============POST UPDATE BLOCK==============//
app.post('/update-blocks', (request, response, next) => {
  // id-module
  const filepath = '../mocks/blocks/blocks.json'
  readFile(filepath, 'utf8')
    .then(JSON.parse)
    .then(async blocks => {

      const i = request.body.id
      blocks[i].title = request.body.title
      blocks[i].url = request.body.url
      blocks[i].icon = request.body.color.split('-')[1] === "b" ?
        `img/icon-${request.body.icon}.png` :
        `img/icon-${request.body.icon}-blanc.png`
      blocks[i].color = `#${request.body.color.split('-')[0]}`
      blocks[i].titleColor = request.body.color.split('-')[1] === "b" ? "#292e2a" : "white"

      const content = JSON.stringify(blocks, null, 2)
      await writeFile(filepath, content, 'utf8')
      response.json(blocks)
    })
    .catch(next)
})

//==============DELETE BLOCK==============//
app.post('/delete-blocks', (request, response, next) => {
  // id-module
  const filepath = '../mocks/blocks/blocks.json'
  readFile(filepath, 'utf8')
    .then(JSON.parse)
    .then(async blocks => {

      const index = request.body.id
      // delete
      blocks.splice(index, 1)

      for (let i = 0 ; i < blocks.length ; i++) {
        blocks[i].id = i 
      }

      const content = JSON.stringify(blocks, null, 2)
      await writeFile(filepath, content, 'utf8')
      response.json(blocks)
    })
    .catch(next)
})