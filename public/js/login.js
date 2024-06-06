document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí puedes añadir la lógica para manejar la autenticación
    console.log(`Username: ${username}, Password: ${password}`);
    
    // Redireccionar a la página de chat después de iniciar sesión
    location.href = 'index.html';
});
