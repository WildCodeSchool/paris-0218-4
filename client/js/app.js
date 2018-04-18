import { createBlockElement, createPlusBlockElement } from './components/block.js'
import { displayModal, hideModal } from './modal.js'

const blocksContainer = document.getElementById('blocks')
const formElement = document.getElementById('new-module-form')
const formSubmitButtonElement = document.getElementById('new-module-form-submit-button')

// display modal
const setup = () => {
  const plusBlock = document.getElementById('block-plus')
  plusBlock.addEventListener('click', displayModal)
}

const render = blocks => {
  const plusBlockElement = createPlusBlockElement()
  let blockElements = blocks
    .sort((block1, block2) =>  block1.position - block2.position)
    .map(createBlockElement)
    .concat([ plusBlockElement ])
    .join('')

  blocksContainer.innerHTML = blockElements

  setup()
}

const getModules = () => {
  return fetch('http://localhost:3030/blocks')
    .then(response => response.json())
}

// after DOM load
window.addEventListener("DOMContentLoaded", () => {
  getModules().then(render)
})

const sendNewModule = module => {
  return fetch('http://localhost:3030/blocks', {
    method: 'post',
    body: JSON.stringify(module)
  })
  .then(res => res.json())
}


const handleSuccess = () => {
  const color = formSubmitButtonElement.style.backgroundColor

  formSubmitButtonElement.style.backgroundColor = '#8bc34a' // green

  setTimeout(() => {
    formSubmitButtonElement.style.backgroundColor = color
    formSubmitButtonElement.disabled = true
  }, 300)
}

const handleFailure = err => { console.log(err) }

const handleSubmit = event => {
  event.preventDefault()

  const module = {
    title: document.getElementById('new-module-form-title').value,
    url: document.getElementById('new-module-form-url').value,
    icon: document.getElementById('new-module-form-icon').value,
    color: document.getElementById('new-module-form-color').value
  }

  sendNewModule(module)
  .then(blocks => {
    formElement.reset()
    // hideModal()
    handleSuccess()
    render(blocks)
  })
  .catch(handleFailure)
}

formElement.addEventListener('submit', handleSubmit)
