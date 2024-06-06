// // const OpenAI = require('openai');
// // require('dotenv').config();
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');

// // const app = express();
// // const port = 3000;

// // // Middlewares
// // app.use(cors());
// // app.use(bodyParser.json());

// // // console.log(process.env.OPENAI_API_KEY);

// // const openai = new OpenAI({
// //     apikey: process.env.OPENAI_API_KEY
// // });

// // let messages = [
// //     {role: 'system', content: "Eres un experto en videojuegos."},
// //     // {role: 'user', content: "Hola, ¿Qué es un videojuego?"},
// //     // {role: 'assistant', content: "Un videojuego es un juego electrónico que implica la interacción con una interfaz de usuario para generar una respuesta visual en una pantalla. Los videojuegos se juegan en consolas de videojuegos, computadoras personales o dispositivos móviles y abarcan muchos géneros, incluidos los juegos de acción, aventuras, rompecabezas, juegos de rol y deportes, entre otros"},
// // ]

// // async function open(input) {   

// //     let userResponce = input;

// //     messages.push({role: 'user', content: userResponce});

// //     const completion = await openai.chat.completions.create({
// //         model: "gpt-3.5-turbo",
// //         messages: messages
// //     })

// //     messages.push({role: 'assistant', content: completion.choices[0].message.content});

// //     return messages;
// // }

// // app.listen(port, () => {
// //     console.log(`Server is running at http://localhost:${port}`);
// // });

// // app.post('/api/chat', async (req,res)=>{
// //     const input = req.body.input;
// //     let response = await open(input);
// //     // console.log(response);
// //     res.json({
// //         "Conversation": response
// //     });
// // });

// const OpenAI = require('openai');
// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// const openai = new OpenAI({
//     apikey: process.env.OPENAI_API_KEY
// });

// let messages = [
//     { role: 'system', content: "Eres un experto en videojuegos." }
// ];

// async function open(input) {
//     let userResponce = input;

//     messages.push({ role: 'user', content: userResponce });

//     const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: messages
//     });

//     messages.push({ role: 'assistant', content: completion.choices[0].message.content });

//     return messages;
// }

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });

// app.post('/api/chat', async (req, res) => {
//     const input = req.body.input;
//     let response = await open(input);
//     res.json({
//         "Conversation": response
//     });
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });


const OpenAI = require('openai');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

let messages = [
    { role: 'system', content: "Eres un experto en videojuegos." }
];

async function open(input) {
    let userResponce = input;

    messages.push({ role: 'user', content: userResponce });

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages
    });

    messages.push({ role: 'assistant', content: completion.choices[0].message.content });

    return messages;
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.post('/api/chat', async (req, res) => {
    const input = req.body.input;
    let response = await open(input);
    res.json({
        "Conversation": response
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/landing.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
