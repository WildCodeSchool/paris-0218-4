import { createBlocksUsers } from './components/users.js'

const renderUsers = (res) => {
    console.log(res)
    res.forEach(e => {
        e.color = e.admin === 'true' ? '#00c10e' : 'black'
        e.admin = e.admin === 'true' ? 'Admin' : 'User'
        document.getElementById('container-display-users').innerHTML += createBlocksUsers(e)
    })
}

export const getUsers = () => {
    fetch('http://localhost:3030/route-users/users')
    .then(res => res.json())
    .then(res => renderUsers(res))
}