/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

jest.mock('node-fetch');

const { Response } = jest.requireActual('node-fetch');

// Cargar el contenido del archivo login.html en el DOM
const html = fs.readFileSync(path.resolve(__dirname, '../public/login.html'), 'utf8');

describe('Login Page', () => {
    let container;

    beforeEach(() => {
        // Cargar el HTML en el documento
        document.documentElement.innerHTML = html.toString();
        container = document.getElementById('login-container');
        // Requiere el archivo login.js después de configurar el DOM
        require('../public/js/login');
    });

    afterEach(() => {
        jest.resetModules(); // Resetea los módulos después de cada prueba
    });

    test('Login form should be in the document', () => {
        expect(container).toBeInTheDocument();
    });

    test('Login button should call handleAuth with "login" action', () => {
        const loginButton = document.getElementById('login-button');
        const handleAuthMock = jest.fn();
        
        // Mockear la función handleAuth
        window.handleAuth = handleAuthMock;

        loginButton.click();
        expect(handleAuthMock).toHaveBeenCalledWith('login');
    });

    test('Register button should call handleAuth with "register" action', () => {
        const registerButton = document.getElementById('register-button');
        const handleAuthMock = jest.fn();
        
        // Mockear la función handleAuth
        window.handleAuth = handleAuthMock;

        registerButton.click();
        expect(handleAuthMock).toHaveBeenCalledWith('register');
    });

    test('handleAuth should send a fetch request with correct parameters for login', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;

        fetch.mockResolvedValueOnce(new Response(JSON.stringify({ success: true, userId: '12345' })));

        await handleAuth('login');

        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    });

    test('handleAuth should handle error response correctly', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;

        const errorMessage = 'Invalid credentials';
        fetch.mockResolvedValueOnce(new Response(JSON.stringify({ success: false, message: errorMessage })));

        await handleAuth('login');

        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Verificar si alert fue llamado con el mensaje de error
        expect(window.alert).toHaveBeenCalledWith(errorMessage);
    });
});

// /**
//  * @jest-environment jsdom
//  */

// const { TextEncoder, TextDecoder } = require('util');

// // Definir TextEncoder y TextDecoder globalmente
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// const fetchMock = require('fetch-mock').sandbox();
// const { JSDOM } = require('jsdom');

// // Simula el DOM y carga el script de login.js
// beforeEach(async () => {
//   const dom = new JSDOM(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Login</title>
//     </head>
//     <body>
//         <div id="login-container">
//             <h2>Sign In / Sign Up</h2>
//             <form id="login-form">
//                 <label for="email">Email:</label>
//                 <input type="text" id="email" name="email" required>
//                 <label for="password">Password:</label>
//                 <input type="password" id="password" name="password" required>
//                 <button type="button" id="login-button">Login</button>
//                 <p>Not registered?</p>
//                 <button type="button" id="register-button">Register</button>
//             </form>
//         </div>
//         <script src="../js/login.js"></script>
//     </body>
//     </html>
//   `, {
//     url: "http://localhost:3000",
//     runScripts: "dangerously",
//     resources: "usable"
//   });

//   // Espera a que el DOM esté completamente cargado
//   await new Promise((resolve) => {
//     dom.window.document.addEventListener('DOMContentLoaded', resolve);
//   });

//   global.window = dom.window;
//   global.document = dom.window.document;
//   global.fetch = fetchMock;
//   global.localStorage = dom.window.localStorage;
// });

// // Limpiar el mock de fetch después de cada prueba
// afterEach(() => {
//   fetchMock.reset();
// });

// test('should login a user', async () => {
//   const emailInput = document.getElementById('email');
//   const passwordInput = document.getElementById('password');
//   const loginButton = document.getElementById('login-button');

//   emailInput.value = 'test@example.com';
//   passwordInput.value = 'password';

//   fetchMock.post('http://localhost:3000/api/login', {
//     success: true,
//     userId: 1
//   });

//   loginButton.click();

//   // Espera a que el fetch se complete
//   await new Promise(process.nextTick);

//   expect(localStorage.getItem('userId')).toBe('1');
// });

// test('should register a new user', async () => {
//   const emailInput = document.getElementById('email');
//   const passwordInput = document.getElementById('password');
//   const registerButton = document.getElementById('register-button');

//   emailInput.value = 'test2@example.com';
//   passwordInput.value = 'password';

//   fetchMock.post('http://localhost:3000/api/register', {
//     success: true,
//     userId: 2
//   });

//   registerButton.click();

//   // Espera a que el fetch se complete
//   await new Promise(process.nextTick);

//   expect(localStorage.getItem('userId')).toBe('2');
// });

// test('should show an alert on login failure', async () => {
//   const emailInput = document.getElementById('email');
//   const passwordInput = document.getElementById('password');
//   const loginButton = document.getElementById('login-button');

//   emailInput.value = 'test@example.com';
//   passwordInput.value = 'wrongpassword';

//   fetchMock.post('http://localhost:3000/api/login', {
//     success: false,
//     message: 'Invalid email or password'
//   });

//   window.alert = jest.fn();  // Mock alert

//   loginButton.click();

//   // Espera a que el fetch se complete
//   await new Promise(process.nextTick);

//   expect(window.alert).toHaveBeenCalledWith('Invalid email or password');
// });
