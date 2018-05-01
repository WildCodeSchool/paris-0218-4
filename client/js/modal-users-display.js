import { getUsers } from './modal-users-processing.js'

const modalUsers = document.getElementById('new-users-form-container')

const displayModalUsers = () => {
    modalUsers.style.display = 'block'
    getUsers()
}

const hideModalUsers = () => {
    modalUsers.style.display = 'none'
}

// display modal Manage Users
document.getElementById('link-manage-users').addEventListener('click', displayModalUsers)
// hide modal if cancel
document.getElementById('new-users-form-cancel-button').addEventListener('click', hideModalUsers)

// checkbox admin true or false
document.getElementById('btn-status-admin').addEventListener('click', () => {
    const selector = document.getElementById('selector-status-admin')
    const inputAdmin = document.getElementById('input-value-admin')
    selector.style.marginLeft =  selector.style.marginLeft === '37%' ? '0%' : '37%'
    selector.style.backgroundColor =  selector.style.backgroundColor === 'rgb(0, 193, 14)' ? 'rgb(41, 46, 42)' : 'rgb(0, 193, 14)'
    inputAdmin.value = inputAdmin.value === 'true' ? 'false' : 'true'
})

const checkFieldsUsers = () => {
    const username = document.getElementById('new-users-form-username').validity.valid
    const password = document.getElementById('new-users-form-password').validity.valid
    
    const btnSubmit = document.getElementById('new-users-form-submit-button')
    btnSubmit.disabled = username + password === 2 ? false : true
  }

// read if input fields are valide 
Array.from(document.getElementsByClassName('input-users')).forEach(e => {
    e.addEventListener('input', () => {
        checkFieldsUsers()
    })
})