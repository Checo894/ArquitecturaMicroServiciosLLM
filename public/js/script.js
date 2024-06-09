const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === "") return;

    addMessage(userMessage, 'user-message');
    userInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',  // Asegúrate de incluir esta línea
            body: JSON.stringify({ input: userMessage })
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

function addMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}


// const chatBox = document.getElementById('chat-box');
// const userInput = document.getElementById('user-input');
// const sendButton = document.getElementById('send-button');

// sendButton.addEventListener('click', async () => {
//     const userMessage = userInput.value;
//     if (userMessage.trim() === "") return;

//     addMessage(userMessage, 'user-message');
//     userInput.value = '';

//     try {
//         const response = await fetch('http://localhost:3000/api/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include',  // Asegúrate de incluir esta línea
//             body: JSON.stringify({ input: userMessage })
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

// function addMessage(message, className) {
//     const messageElement = document.createElement('div');
//     messageElement.classList.add('message', className);
//     messageElement.textContent = message;
//     chatBox.appendChild(messageElement);
//     chatBox.scrollTop = chatBox.scrollHeight;
// }


// // const chatBox = document.getElementById('chat-box');
// // const userInput = document.getElementById('user-input');
// // const sendButton = document.getElementById('send-button');

// // sendButton.addEventListener('click', async () => {
// //     const userMessage = userInput.value;
// //     if (userMessage.trim() === "") return;

// //     addMessage(userMessage, 'user-message');
// //     userInput.value = '';

// //     try {
// //         const response = await fetch('http://localhost:3000/api/chat', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             credentials: 'include',  // Asegúrate de incluir esta línea
// //             body: JSON.stringify({ input: userMessage })
// //         });

// //         if (!response.ok) {
// //             const errorData = await response.json();
// //             alert(errorData.message);
// //             return;
// //         }

// //         const data = await response.json();
// //         const botMessage = data.Conversation[data.Conversation.length - 1].content;
// //         addMessage(botMessage, 'bot-message');
// //     } catch (error) {
// //         console.error('Error:', error);
// //         alert('Failed to send message.');
// //     }
// // });

// // function addMessage(message, className) {
// //     const messageElement = document.createElement('div');
// //     messageElement.classList.add('message', className);
// //     messageElement.textContent = message;
// //     chatBox.appendChild(messageElement);
// //     chatBox.scrollTop = chatBox.scrollHeight;
// // }


// // // const chatBox = document.getElementById('chat-box');
// // // const userInput = document.getElementById('user-input');
// // // const sendButton = document.getElementById('send-button');

// // // sendButton.addEventListener('click', async () => {
// // //     const userMessage = userInput.value;
// // //     if (userMessage.trim() === "") return;

// // //     addMessage(userMessage, 'user-message');
// // //     userInput.value = '';

// // //     try {
// // //         const response = await fetch('http://localhost:3000/api/chat', {
// // //             method: 'POST',
// // //             headers: {
// // //                 'Content-Type': 'application/json'
// // //             },
// // //             credentials: 'include',  // Asegúrate de incluir esta línea
// // //             body: JSON.stringify({ input: userMessage })
// // //         });

// // //         if (!response.ok) {
// // //             const errorData = await response.json();
// // //             alert(errorData.message);
// // //             return;
// // //         }

// // //         const data = await response.json();
// // //         const botMessage = data.Conversation[data.Conversation.length - 1].content;
// // //         addMessage(botMessage, 'bot-message');
// // //     } catch (error) {
// // //         console.error('Error:', error);
// // //         alert('Failed to send message.');
// // //     }
// // // });

// // // function addMessage(message, className) {
// // //     const messageElement = document.createElement('div');
// // //     messageElement.classList.add('message', className);
// // //     messageElement.textContent = message;
// // //     chatBox.appendChild(messageElement);
// // //     chatBox.scrollTop = chatBox.scrollHeight;
// // // }


// // // // const chatBox = document.getElementById('chat-box');
// // // // const userInput = document.getElementById('user-input');
// // // // const sendButton = document.getElementById('send-button');

// // // // sendButton.addEventListener('click', async () => {
// // // //     const userMessage = userInput.value;
// // // //     if (userMessage.trim() === "") return;

// // // //     addMessage(userMessage, 'user-message');
// // // //     userInput.value = '';

// // // //     try {
// // // //         const response = await fetch('http://localhost:3000/api/chat', {
// // // //             method: 'POST',
// // // //             headers: {
// // // //                 'Content-Type': 'application/json'
// // // //             },
// // // //             credentials: 'include',  // Asegúrate de incluir esta línea
// // // //             body: JSON.stringify({ input: userMessage })
// // // //         });

// // // //         if (!response.ok) {
// // // //             const errorData = await response.json();
// // // //             alert(errorData.message);
// // // //             return;
// // // //         }

// // // //         const data = await response.json();
// // // //         const botMessage = data.Conversation[data.Conversation.length - 1].content;
// // // //         addMessage(botMessage, 'bot-message');
// // // //     } catch (error) {
// // // //         console.error('Error:', error);
// // // //         alert('Failed to send message.');
// // // //     }
// // // // });

// // // // function addMessage(message, className) {
// // // //     const messageElement = document.createElement('div');
// // // //     messageElement.classList.add('message', className);
// // // //     messageElement.textContent = message;
// // // //     chatBox.appendChild(messageElement);
// // // //     chatBox.scrollTop = chatBox.scrollHeight;
// // // // }


// // // // // const chatBox = document.getElementById('chat-box');
// // // // // const userInput = document.getElementById('user-input');
// // // // // const sendButton = document.getElementById('send-button');

// // // // // sendButton.addEventListener('click', async () => {
// // // // //     const userMessage = userInput.value;
// // // // //     if (userMessage.trim() === "") return;

// // // // //     addMessage(userMessage, 'user-message');
// // // // //     userInput.value = '';

// // // // //     try {
// // // // //         const response = await fetch('http://localhost:3000/api/chat', {
// // // // //             method: 'POST',
// // // // //             headers: {
// // // // //                 'Content-Type': 'application/json'
// // // // //             },
// // // // //             credentials: 'include',  // Asegúrate de incluir esta línea
// // // // //             body: JSON.stringify({ input: userMessage })
// // // // //         });

// // // // //         if (!response.ok) {
// // // // //             const errorData = await response.json();
// // // // //             alert(errorData.message);
// // // // //             return;
// // // // //         }

// // // // //         const data = await response.json();
// // // // //         const botMessage = data.Conversation[data.Conversation.length - 1].content;
// // // // //         addMessage(botMessage, 'bot-message');
// // // // //     } catch (error) {
// // // // //         console.error('Error:', error);
// // // // //         alert('Failed to send message.');
// // // // //     }
// // // // // });

// // // // // function addMessage(message, className) {
// // // // //     const messageElement = document.createElement('div');
// // // // //     messageElement.classList.add('message', className);
// // // // //     messageElement.textContent = message;
// // // // //     chatBox.appendChild(messageElement);
// // // // //     chatBox.scrollTop = chatBox.scrollHeight;
// // // // // }


// // // // // // const chatBox = document.getElementById('chat-box');
// // // // // // const userInput = document.getElementById('user-input');
// // // // // // const sendButton = document.getElementById('send-button');

// // // // // // sendButton.addEventListener('click', async () => {
// // // // // //     const userMessage = userInput.value;
// // // // // //     if (userMessage.trim() === "") return;

// // // // // //     addMessage(userMessage, 'user-message');
// // // // // //     userInput.value = '';

// // // // // //     const response = await fetch('http://localhost:3000/api/chat', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //             'Content-Type': 'application/json'
// // // // // //         },
// // // // // //         credentials: 'include',  // Asegúrate de incluir esta línea
// // // // // //         body: JSON.stringify({ input: userMessage })
// // // // // //     });

// // // // // //     if (!response.ok) {
// // // // // //         const errorData = await response.json();
// // // // // //         alert(errorData.message);
// // // // // //         return;
// // // // // //     }

// // // // // //     const data = await response.json();
// // // // // //     const botMessage = data.Conversation[data.Conversation.length - 1].content;
// // // // // //     addMessage(botMessage, 'bot-message');
// // // // // // });

// // // // // // function addMessage(message, className) {
// // // // // //     const messageElement = document.createElement('div');
// // // // // //     messageElement.classList.add('message', className);
// // // // // //     messageElement.textContent = message;
// // // // // //     chatBox.appendChild(messageElement);
// // // // // //     chatBox.scrollTop = chatBox.scrollHeight;
// // // // // // }



// // // // // // // const chatBox = document.getElementById('chat-box');
// // // // // // // const userInput = document.getElementById('user-input');
// // // // // // // const sendButton = document.getElementById('send-button');

// // // // // // // sendButton.addEventListener('click', async () => {
// // // // // // //     const userMessage = userInput.value;
// // // // // // //     if (userMessage.trim() === "") return;

// // // // // // //     addMessage(userMessage, 'user-message');
// // // // // // //     userInput.value = '';

// // // // // // //     const response = await fetch('http://localhost:3000/api/chat', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: {
// // // // // // //             'Content-Type': 'application/json'
// // // // // // //         },
// // // // // // //         body: JSON.stringify({ input: userMessage })
// // // // // // //     });

// // // // // // //     const data = await response.json();
// // // // // // //     const botMessage = data.Conversation[data.Conversation.length - 1].content;
// // // // // // //     addMessage(botMessage, 'bot-message');
// // // // // // // });

// // // // // // // function addMessage(message, className) {
// // // // // // //     const messageElement = document.createElement('div');
// // // // // // //     messageElement.classList.add('message', className);
// // // // // // //     messageElement.textContent = message;
// // // // // // //     chatBox.appendChild(messageElement);
// // // // // // //     chatBox.scrollTop = chatBox.scrollHeight;
// // // // // // // }
