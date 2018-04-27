const logInForm = document.getElementById('log-in-form')

logInForm.addEventListener('submit', e => {
	e.preventDefault()

	const username = document.getElementById('username')
	const password = document.getElementById('password')

	const form = {
		username: username.value,
		password: password.value,
	}

	fetch('http://localhost:3030/log-in', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		'credentials': 'include',
		body: JSON.stringify(form)
	})
	.then(res => res.json())
})