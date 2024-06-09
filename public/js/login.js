document.getElementById('login-button').addEventListener('click', function(event) {
    handleAuth('login');
});

document.getElementById('register-button').addEventListener('click', function(event) {
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
//             // Guardar el ID de usuario en local storage
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


// // document.getElementById('login-button').addEventListener('click', function(event) {
// //     handleAuth('login');
// // });

// // document.getElementById('register-button').addEventListener('click', function(event) {
// //     handleAuth('register');
// // });

// // function handleAuth(action) {
// //     const email = document.getElementById('email').value;
// //     const password = document.getElementById('password').value;

// //     console.log(`Sending request to /api/${action} with email: ${email} and password: ${password}`);
    
// //     fetch(`http://localhost:3000/api/${action}`, {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         credentials: 'include',  // Asegúrate de incluir esta línea
// //         body: JSON.stringify({ email, password })
// //     })
// //     .then(response => {
// //         if (!response.ok) {
// //             return response.json().then(data => {
// //                 throw new Error(data.message);
// //             });
// //         }
// //         return response.json();
// //     })
// //     .then(data => {
// //         if (data.success) {
// //             location.href = 'index.html';
// //         } else {
// //             alert(data.message);
// //         }
// //     })
// //     .catch(error => {
// //         console.error('Error:', error);
// //         alert(error.message);
// //     });
// // }


// // document.getElementById('login-button').addEventListener('click', function(event) {
// //     handleAuth('login');
// // });

// // document.getElementById('register-button').addEventListener('click', function(event) {
// //     handleAuth('register');
// // });

// // function handleAuth(action) {
// //     const email = document.getElementById('email').value;
// //     const password = document.getElementById('password').value;

// //     console.log(`Sending request to /api/${action} with email: ${email} and password: ${password}`);
    
// //     fetch(`http://localhost:3000/api/${action}`, {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ email, password })
// //     })
// //     .then(response => {
// //         if (!response.ok) {
// //             return response.json().then(data => {
// //                 throw new Error(data.message);
// //             });
// //         }
// //         return response.json();
// //     })
// //     .then(data => {
// //         if (data.success) {
// //             location.href = 'index.html';
// //         } else {
// //             alert(data.message);
// //         }
// //     })
// //     .catch(error => {
// //         console.error('Error:', error);
// //         alert(error.message);  // Asegúrate de que esta línea está presente para mostrar la alerta en caso de error
// //     });
// // }


// // // document.getElementById('login-button').addEventListener('click', function(event) {
// // //     handleAuth('login');
// // // });

// // // document.getElementById('register-button').addEventListener('click', function(event) {
// // //     handleAuth('register');
// // // });

// // // function handleAuth(action) {
// // //     const email = document.getElementById('email').value;
// // //     const password = document.getElementById('password').value;

// // //     console.log(`Sending request to /api/${action} with email: ${email} and password: ${password}`);
    
// // //     fetch(`http://localhost:3000/api/${action}`, {
// // //         method: 'POST',
// // //         headers: {
// // //             'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({ email, password })
// // //     })
// // //     .then(response => {
// // //         if (!response.ok) {
// // //             throw new Error(`HTTP error! status: ${response.status}`);
// // //         }
// // //         return response.json();
// // //     })
// // //     .then(data => {
// // //         if (data.success) {
// // //             location.href = 'index.html';
// // //         } else {
// // //             alert(data.message);
// // //         }
// // //     })
// // //     .catch(error => console.error('Error:', error));
// // // }


// // // // document.getElementById('login-button').addEventListener('click', function(event) {
// // // //     handleAuth('login');
// // // // });

// // // // document.getElementById('register-button').addEventListener('click', function(event) {
// // // //     handleAuth('register');
// // // // });

// // // // function handleAuth(action) {
// // // //     const email = document.getElementById('email').value;
// // // //     const password = document.getElementById('password').value;

// // // //     console.log(`Sending request to /api/${action} with email: ${email} and password: ${password}`);
    
// // // //     fetch(`http://localhost:3000/api/${action}`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //             'Content-Type': 'application/json'
// // // //         },
// // // //         body: JSON.stringify({ email, password })
// // // //     })
// // // //     .then(response => response.json())
// // // //     .then(data => {
// // // //         if (data.success) {
// // // //             location.href = 'index.html';
// // // //         } else {
// // // //             alert(data.message);
// // // //         }
// // // //     })
// // // //     .catch(error => console.error('Error:', error));
// // // // }



// // // // // document.getElementById('login-button').addEventListener('click', function(event) {
// // // // //     handleAuth('login');
// // // // // });

// // // // // document.getElementById('register-button').addEventListener('click', function(event) {
// // // // //     handleAuth('register');
// // // // // });

// // // // // function handleAuth(action) {
// // // // //     const email = document.getElementById('email').value;
// // // // //     const password = document.getElementById('password').value;

// // // // //     fetch(`http://localhost:3000/api/${action}`, {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //             'Content-Type': 'application/json'
// // // // //         },
// // // // //         body: JSON.stringify({ username, password })
// // // // //     })
// // // // //     .then(response => response.json())
// // // // //     .then(data => {
// // // // //         if (data.success) {
// // // // //             location.href = 'index.html';
// // // // //         } else {
// // // // //             alert(data.message);
// // // // //         }
// // // // //     })
// // // // //     .catch(error => console.error('Error:', error));
// // // // // }

// // // // // // document.getElementById('login-form').addEventListener('submit', function(event) {
// // // // // //     event.preventDefault();
// // // // // //     const username = document.getElementById('username').value;
// // // // // //     const password = document.getElementById('password').value;

// // // // // //     // Aquí puedes añadir la lógica para manejar la autenticación
// // // // // //     console.log(`Username: ${username}, Password: ${password}`);
    
// // // // // //     // Redireccionar a la página de chat después de iniciar sesión
// // // // // //     location.href = 'index.html';
// // // // // // });
