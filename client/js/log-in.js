const logInForm = document.getElementById('log-in-form')

const processAuth = (res) => {

	const username = res.username
	const admin = res.admin

	if (username !== undefined) {
		window.location = `/homepage.html?admin=${admin}`
	}
	else console.log(res)
}

logInForm.addEventListener('submit', e => {
	e.preventDefault()
	console.log("login")
	
	const username = document.getElementById('username')
	const password = document.getElementById('password')

	const form = {
		username: username.value,
		password: password.value,
	}

	fetch('http://localhost:3030/route-session/log-in', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		'credentials': 'include',
		body: JSON.stringify(form)
	})
	.then(res => res.json())
	.then(processAuth)
})