const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const app = express()
const router = express.Router()
const secret = 'KIKOO'

//==============LOG IN==============//
router.use(session({
    secret,
    saveUninitialized: false,
    resave: true,
    store: new FileStore({ secret }),
  }))
  
  const users = [
    { username: 'COCO', password: 'COCO', admin: 'true' },
    { username: 'Yoann', password: 'kookoocmoi', admin: 'true' },
    { username: 'Charles', password: 'hellovous', admin: 'false' }
  ]
  
  // router.use(cookieParser())

  // Logger middleware
  // router.use((req, res, next) => {
  //   // console.log(req.headers)
  //   console.log(`${req.method} ${req.url}`, { user: req.session.user, cookie: req.headers.cookie })
  //   next()
  // })
  
  router.get('/secure', (req, res) => {
    // console.log(req.headers)

    const user = req.session.user || {}
    // console.log(user)
    res.json(user)
  })
  
  router.post('/log-in', (req, res, next) => {
    const user = users.find(u => req.body.username === u.username)
    if (!user) {
      return res.json('User not found')
    }
  
    if (user.password !== req.body.password) {
      return res.json('Wrong password')
    }
  
    req.session.user = user
    user.sessionID = req.sessionID
    delete user.password

    res.json(user)
    console.log(user, 'user trouvé')
  })

  router.use((err, req, res, next) => {
    if (err) {
      res.json({ message: err.message })
      console.error(err)
    }
    next(err)
  })

  module.exports = router