import { createBlocksUsers } from './components/users.js'

const removeUser = (evt) => {
    const id = evt.target.name.split('-')[0]
    console.log(id)

    fetch('http://localhost:3030/route-users/delete-users', {
        method: 'post',
        body: JSON.stringify({id: id})
    })
    .then(res => res.json())
    .then(res => renderUsers(res))
}

const renderUsers = (res) => {
    document.getElementById('container-display-users').innerHTML = ""
    res.forEach(e => {
        e.color = e.admin === 'true' ? '#00c10e' : 'black'
        e.admin = e.admin === 'true' ? 'Admin' : 'User'
        document.getElementById('container-display-users').innerHTML += createBlocksUsers(e)
    })
    // delete User
    Array.from(document.getElementsByClassName('delete-user')).forEach(e => {
    console.log(e);
    
    e.addEventListener('click', removeUser)
})
}

export const getUsers = () => {
    fetch('http://localhost:3030/route-users/users')
    .then(res => res.json())
    .then(res => renderUsers(res))
}

export const addUser = (evt) => {
    
    evt.preventDefault()
    const obj = {
        username: document.getElementById('new-users-form-username').value,
        password: document.getElementById('new-users-form-password').value,
        admin: document.getElementById('new-users-form-admin').value,
    }
    fetch('http://localhost:3030/route-users/users', {
        method: 'post',
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(res => renderUsers(res))
}