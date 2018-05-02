const checkUser = () => {
    fetch(`http://localhost:3030/route-session/secure`, {'credentials': 'include',})
    .then(res => res.json())
    .then(res => {
      if (typeof res === 'string') {
        window.location = 'index.html'
        return
      }
      if(res.username) {
        document.getElementById('session-display-name').innerHTML = res.username
        document.isAdminSecure = res.admin === 'true'
        if(res.admin === 'true') {
          document.getElementById('block-link-manage-admin').innerHTML = `
          <a id="link-manage-users" href="#">Manage Users</a>
          `
          // display modal Manage Users
          document.getElementById('link-manage-users').addEventListener('click', displayModalUsers)
        }
      }
    })
    }
    
checkUser()