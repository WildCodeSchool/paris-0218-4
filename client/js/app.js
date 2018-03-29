import { pouet } from "./components/displayModule.js"

fetch('http://localhost:3030/users')
  .then(response => response.json())
  .then(modules => {
    const divModule = document.getElementById("moduleHtml")
    divModule.innerHTML=modules.map(pouet).join("")
  })

// fetch
// asynchrone vs synchrone
// 

// // npm install express
// const express = require('express')
// const app = express()
// app.get('/', () => { ... })
// app.listen(4000, () => console.log('server listenning'))
