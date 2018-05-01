export const createBlocksUsers = users => `
<tr>
    <th class="name-user">${users.username}</th>
    <td class="status-user" style="color:${users.color}">${users.admin}</td>
    <td><button class="delete-user"></button></td>
</tr>
`