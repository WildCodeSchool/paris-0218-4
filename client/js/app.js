import { createBlockElement } from './components/block.js'

fetch('http://localhost:3030/blocks')
  .then(response => response.json())
  .then(blocks => {
    const blocksContainer = document.getElementById("blocks")

    blocks.sort((block1, block2) => block1.position - block2.position);

    blocksContainer.innerHTML = blocks.map(createBlockElement).join('')
})
