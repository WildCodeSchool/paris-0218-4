import { handleSubmit, render, formElement } from './modal-processing.js'
import { getRss } from './rss-get.js'

// simule admin behavior
const qs = new URLSearchParams(window.location.search)
document.isAdmin = qs.get('admin') === 'true'

// fetch module on get
const getModules = () => {
  return fetch('http://localhost:3030/route-module/blocks')
    .then(response => response.json())
}

// after DOM load => get module
window.addEventListener("DOMContentLoaded", () => {
  getModules().then(render)
})
// when submit form
formElement.addEventListener('submit', handleSubmit)

getRss()