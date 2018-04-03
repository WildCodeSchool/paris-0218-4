//import { createModule } from './components/displayModule.js'

fetch('http://localhost:3030/modules')
.then(response => response.json())
.then(modules => {

  const divModule = document.getElementById("moduleHtml")

  const tab_key = Object.keys(modules)
  for (let i = 0 ; i < tab_key.length ; i++) {

    divModule.innerHTML += `
    <a class="link_module" href="${modules[tab_key[i]].url}">
    <div class="mov_module">
    <p>${modules[tab_key[i]].titre}</p>
    <p>LOGO</p>
    </div>
    </a>
    `
  }
})
