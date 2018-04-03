import { createBlockElement } from './components/block.js'

fetch('http://localhost:3030/blocks')
  .then(response => response.json())
  .then(blocks => {
    const blocksContainer = document.getElementById("blocks")

    blocksContainer.innerHTML = blocks.map(createBlockElement).join('')
  })
