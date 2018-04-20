import { createBlockElement, createPlusBlockElement } from './components/block.js'
import { displayModal, hideModal, setup } from './modal-display.js'

const formSubmitButtonElement = document.getElementById('new-module-form-submit-button')
const blocksContainer = document.getElementById('blocks')
export const formElement = document.getElementById('new-module-form')

// on update sucess after submit form
const handleSuccess = () => {
  const color = formSubmitButtonElement.style.backgroundColor
  formSubmitButtonElement.style.backgroundColor = '#8bc34a' // green
  setTimeout(() => {
    formSubmitButtonElement.style.backgroundColor = color
    formSubmitButtonElement.disabled = true
  }, 300)
}

// if error on submit form
const handleFailure = err => { console.log(err) }

// fetch module on post => return update json
const sendNewModule = module => {
  return fetch('http://localhost:3030/blocks', {
    method: 'post',
    body: JSON.stringify(module)
  })
  .then(res => res.json())
}

// display module
export const render = blocks => {
  const plusBlockElement = createPlusBlockElement()
  let blockElements = blocks
    .sort((block1, block2) =>  block1.position - block2.position)
    .map(createBlockElement)
  if (document.isAdmin) {
    blockElements = blockElements.concat([ plusBlockElement ])
  }
  blocksContainer.innerHTML = blockElements.join('')
  setup()
}

// when submit => prepare body, reset input,
export const handleSubmit = event => {
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
    // hideModal() // if you want hidde form after submit
    handleSuccess()
    render(blocks)
  })
  .catch(handleFailure)
}

// **** SECURE SUBMIT ****

// check if form input is valide
const check = () => {
  const title = document.getElementById('new-module-form-title').validity.valid
  const url = document.getElementById('new-module-form-url').validity.valid
  const icon = document.getElementById('new-module-form-icon').value
  const color = document.getElementById('new-module-form-color').value
  const btnSubmit = document.getElementById('new-module-form-submit-button')
  btnSubmit.disabled = icon && color && (title + url === 2) ? false : true
}
const resetSelectIcon = () => {
  Array.from(document.getElementsByClassName('btn-select-icon')).forEach(e => {
    e.style.opacity = '0.5'
  })
}
const resetSelectColor = () => {
  Array.from(document.getElementsByClassName('chooseColor')).forEach(e => {
    e.style.border = '1px solid silver'
  })
}

Array.from(document.getElementsByClassName('btn-select-icon')).forEach(e => {
  e.addEventListener('click', (elemt) => {
    document.getElementById('new-module-form-icon').value = elemt.currentTarget.name
    resetSelectIcon()
    check()
    e.style.opacity = '1'
  })
})

Array.from(document.getElementsByClassName('btn-select-color')).forEach(e => {
  e.addEventListener('click', (elemt) => {
    document.getElementById('new-module-form-color').value = elemt.currentTarget.name
    resetSelectColor()
    check()
    e.children[0].style.border = '3px solid #b3b3b3'
  })
})

const allInput = document.getElementById('new-module-form').getElementsByTagName('input')
Array.from(allInput).forEach(elemt => {
  elemt.addEventListener('input', evt => {
    check()
  })
})
