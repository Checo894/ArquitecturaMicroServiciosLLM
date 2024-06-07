document.getElementById('login-button').addEventListener('click', function(event) {
    handleAuth('login');
});

document.getElementById('register-button').addEventListener('click', function(event) {
    handleAuth('register');
});

function handleAuth(action) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`http://localhost:3000/api/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.href = 'index.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // Aquí puedes añadir la lógica para manejar la autenticación
//     console.log(`Username: ${username}, Password: ${password}`);
    
//     // Redireccionar a la página de chat después de iniciar sesión
//     location.href = 'index.html';
// });
