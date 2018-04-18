Array.from(document.getElementsByClassName('btn-select-icon')).forEach(e => {
  e.addEventListener('click', (elemt) => {
    // console.log(elemt.currentTarget.name)
    document.getElementById('selectIcon').value = elemt.currentTarget.name
  })
})

Array.from(document.getElementsByClassName('btn-select-color')).forEach(e => {
  e.addEventListener('click', (elemt) => {
    // console.log(elemt.currentTarget.name)
    document.getElementById('selectColor').value = elemt.currentTarget.name
  })
})
