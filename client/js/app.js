import { createBlockElement, createPlusBlockElement } from './components/block.js'
import { displayModal } from './modal.js'

// display modal
const setup = () => {
  const plusBlock = document.getElementById('block-plus')
  plusBlock.addEventListener('click', displayModal)
}

const getData = () => {
  fetch('http://localhost:3030/blocks')
  .then(response => response.json())
  .then(blocks => {
    const blocksContainer = document.getElementById('blocks')
    const plusBlockElement = createPlusBlockElement()
    const blockElements = blocks
    .sort((block1, block2) =>  block1.position - block2.position)
    .map(createBlockElement)
    .concat([ plusBlockElement ])
    .join('')

    blocksContainer.innerHTML = blockElements
    setup()
  })
}

// after DOM load
window.addEventListener("DOMContentLoaded", () => {
  getData()
})

document.getElementById('btnSubmit').addEventListener('click', () => {
  document.getElementById('modalForm').style.display = 'none'
})

// Post DATA
document.getElementById('addBlock').addEventListener('submit', event => {
  event.preventDefault()
  const body = {
    title: document.getElementById('title').value,
    url: document.getElementById('url').value,
    icon: document.getElementById('selectIcon').value,
    color: document.getElementById('selectColor').value
  }
  document.getElementById('addBlock').reset()
  fetch('http://localhost:3030/blocks', {
    method: 'post',
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(blocks => {
    const blocksContainer = document.getElementById('blocks')
    const plusBlockElement = createPlusBlockElement()
    const blockElements = blocks
    .sort((block1, block2) =>  block1.position - block2.position)
    .map(createBlockElement)
    .concat([ plusBlockElement ])
    .join('')

    blocksContainer.innerHTML = blockElements
    setup()
  })
})
