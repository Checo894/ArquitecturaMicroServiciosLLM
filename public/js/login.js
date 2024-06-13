document.getElementById('login-button').addEventListener('click', function() { // cambio de function(event) a function()
    handleAuth('login');
});

document.getElementById('register-button').addEventListener('click', function() { // cambio de function(event) a function()
    handleAuth('register');
});

function handleAuth(action) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(`Sending request to /api/${action} with email: ${email} and password: ${password}`);
    
    fetch(`http://localhost:3000/api/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Guardar el ID de usuario en local storage para login y registro
            localStorage.setItem('userId', data.userId);
            location.href = 'index.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
}

module.exports = { handleAuth };


// document.getElementById('login-button').addEventListener('click', function(event) {
//     handleAuth('login');
// });

// document.getElementById('register-button').addEventListener('click', function(event) {
//     handleAuth('register');
// });

// function handleAuth(action) {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     console.log(`Sending request to /api/${action} with email: ${email} and password: ${password}`);
    
//     fetch(`http://localhost:3000/api/${action}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             // Guardar el ID de usuario en local storage para login y registro
//             localStorage.setItem('userId', data.userId);
//             location.href = 'index.html';
//         } else {
//             alert(data.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert(error.message);
//     });
// }
