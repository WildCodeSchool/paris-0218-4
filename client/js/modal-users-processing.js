import { createBlocksUsers } from './components/users.js'


const removeUser = (id) => {
    fetch('http://localhost:3030/route-users/delete-users', {
        method: 'post',
        body: JSON.stringify({id: id})
    })
    .then(res => res.json())
    .then(res => renderUsers(res))
}

const confirmDelete = (evt) => {
    const id = evt.target.name.split('-')[0]
    const confirm = document.getElementById('confirm-user-delete')

    confirm.innerHTML = `
    <tr>
        <th>Comfirm remove ? </th>
        <th><a id="link-confirm-delete" name="id">Yes</a></th>
        <th><a id="link-cancel-delete">No</a></th>
    </tr>
    `

    document.getElementById('link-confirm-delete').addEventListener('click', (evt) => {
        removeUser(evt.target.name)
    })
    document.getElementById('link-cancel-delete').addEventListener('click', () => {
        confirm.innerHTML = ""
    })
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
    e.addEventListener('click', confirmDelete)
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