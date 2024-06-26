const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const logoutButton = document.getElementById('logout-button');

// Verificar el ID de usuario al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Unauthorized');
        window.location.href = 'login.html';
    } else {
        // Cargar la conversación guardada
        try {
            const response = await fetch(`http://localhost:3000/api/conversation/${userId}`);
            const messages = await response.json();
            messages.forEach(message => {
                addMessage(message.content, message.role === 'user' ? 'user-message' : 'bot-message');
            });
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    }
});

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === "") return;

    addMessage(userMessage, 'user-message');
    userInput.value = '';

    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Unauthorized');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, input: userMessage })
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message);
            return;
        }

        const data = await response.json();
        const botMessage = data.Conversation[data.Conversation.length - 1].content;
        addMessage(botMessage, 'bot-message');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message.');
    }
});

// Manejar el cierre de sesión
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('userId');
    window.location.href = 'login.html';
});

function addMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = className;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
}

// Exportar funciones para pruebas
module.exports = { addMessage, chatBox, userInput, sendButton, logoutButton };


// const chatBox = document.getElementById('chat-box');
// const userInput = document.getElementById('user-input');
// const sendButton = document.getElementById('send-button');
// const logoutButton = document.getElementById('logout-button');

// // Verificar el ID de usuario al cargar la página
// document.addEventListener('DOMContentLoaded', async () => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//         alert('Unauthorized');
//         window.location.href = 'login.html';
//     } else {
//         // Cargar la conversación guardada
//         try {
//             const response = await fetch(`http://localhost:3000/api/conversation/${userId}`);
//             const messages = await response.json();
//             messages.forEach(message => {
//                 addMessage(message.content, message.role === 'user' ? 'user-message' : 'bot-message');
//             });
//         } catch (error) {
//             console.error('Error loading conversation:', error);
//         }
//     }
// });

// sendButton.addEventListener('click', async () => {
//     const userMessage = userInput.value;
//     if (userMessage.trim() === "") return;

//     addMessage(userMessage, 'user-message');
//     userInput.value = '';

//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//         alert('Unauthorized');
//         window.location.href = 'login.html';
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3000/api/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ userId, input: userMessage })
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             alert(errorData.message);
//             return;
//         }

//         const data = await response.json();
//         const botMessage = data.Conversation[data.Conversation.length - 1].content;
//         addMessage(botMessage, 'bot-message');
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Failed to send message.');
//     }
// });

// // Manejar el cierre de sesión
// logoutButton.addEventListener('click', () => {
//     localStorage.removeItem('userId');
//     window.location.href = 'login.html';
// });

// function addMessage(message, className) {
//     const messageElement = document.createElement('div');
//     messageElement.className = className;
//     messageElement.textContent = message;
//     chatBox.appendChild(messageElement);
// }
