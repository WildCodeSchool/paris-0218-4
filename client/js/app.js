import { createBlockElement, createPlusBlockElement } from './components/block.js'
import { displayModal } from './modal.js'

const setup = () => {
  const plusBlock = document.getElementById('block-plus')
  plusBlock.addEventListener('click', displayModal)
}

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

document.getElementById('addBlock').addEventListener('submit', event => {
  event.preventDefault()
  const title = document.getElementById('title').value
  const url = document.getElementById('url').value
  console.log('HAHAHAHAHA')
  console.log(title)
  console.log(url)

  fetch('http://localhost:3030/blocks', {
    method: 'post',
    body: JSON.stringify({
      title,
      url
    })
  }).then(res => console.log(res.status))
})

