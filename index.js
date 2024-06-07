const OpenAI = require('openai');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const { sequelize, User } = require('./db');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./passport-config')(passport);

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

// Verificación de conexión a la base de datos y sincronización
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sincronizar la base de datos
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Error syncing database', err);
});

// Authentication routes
app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json({ success: true });
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        const user = await User.create({ email, password });
        res.json({ success: true });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.json({ success: false, message: 'User already exists' });
        } else {
            res.json({ success: false, message: 'Error registering user' });
        }
    }
});

app.post('/api/chat', async (req, res) => {
    // if (!req.isAuthenticated()) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    //     // alert("Unauthorized");
    // }
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
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



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
//     res.sendFile(path.join(__dirname, 'public/landing.html'));
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/login.html'));
// });

// app.get('/chat', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// var passport = require('passport');
// var LocalStrategy = require('passport-local');

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
//     if (err) { return cb(err); }
//     if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, user);
//     });
//   });
// }));

// app.post('/login/password', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

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

