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
