// index.test.js
const request = require('supertest');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../db');
const { sequelize: sequelizeChatbot, Message } = require('../db_chatbot');
const app = require('../index'); // Asumiendo que exportaste app en index.js

// Mocking passport-config
require('../passport-config')(passport);

// Configurar el servidor para pruebas
app.use(bodyParser.json());
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

describe('Chatbot API', () => {
    let server;
    let userId;

    beforeAll(async () => {
        // Autenticación y sincronización de la base de datos
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        await sequelizeChatbot.authenticate();
        await sequelizeChatbot.sync({ force: true });

        // Crear un usuario para las pruebas
        const hashedPassword = await bcrypt.hash('password', 10);
        const user = await User.create({ email: 'testuser@example.com', password: hashedPassword });
        userId = user.id;

        // Iniciar el servidor
        server = app.listen(4000);
    });

    afterAll(async () => {
        // Cerrar el servidor y las conexiones de la base de datos
        await sequelize.close();
        await sequelizeChatbot.close();
        server.close();
    });

    test('POST /api/register - Register a new user', async () => {
        const response = await request(server)
            .post('/api/register')
            .send({ email: 'newuser@example.com', password: 'newpassword' });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.userId).toBeDefined();
    });

    test('POST /api/login - Login with valid credentials', async () => {
        const response = await request(server)
            .post('/api/login')
            .send({ email: 'testuser@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.userId).toBe(userId);
    });

    test('POST /api/chat - Send a chat message', async () => {
        const response = await request(server)
            .post('/api/chat')
            .send({ userId, input: 'Hello, chatbot!' });
        expect(response.status).toBe(200);
        expect(response.body.Conversation).toBeDefined();
        expect(response.body.Conversation.length).toBeGreaterThan(0);
    });

    test('GET /api/conversation/:userId - Get user conversation', async () => {
        const response = await request(server)
            .get(`/api/conversation/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET / - Get landing page', async () => {
        const response = await request(server)
            .get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('<title>Chatbot Interface</title>');
    });

    test('GET /login - Get login page', async () => {
        const response = await request(server)
            .get('/login');
        expect(response.status).toBe(200);
        expect(response.text).toContain('<title>Login</title>');
    });

    test('GET /chat - Get chat page', async () => {
        const response = await request(server)
            .get('/chat');
        expect(response.status).toBe(200);
        expect(response.text).toContain('<title>Chatbot Interface</title>');
    });
});


// const request = require('supertest');
// const bcrypt = require('bcrypt');
// const { sequelize, User } = require('../db');
// const { sequelize: sequelizeChatbot, Message } = require('../db_chatbot');
// const { app, server } = require('../index');

// describe('Server Tests', () => {
//     beforeAll(async () => {
//         await sequelize.sync({ force: true }).then(() => console.log('User database synced')).catch(err => console.error('Error syncing user database', err));
//         await sequelizeChatbot.sync({ force: true }).then(() => console.log('Chatbot database synced')).catch(err => console.error('Error syncing chatbot database', err));
//     });

//     afterAll(async () => {
//         await sequelize.close();
//         await sequelizeChatbot.close();
//         server.close();
//     });

//     describe('POST /api/register', () => {
//         it('should register a new user', async () => {
//             const res = await request(app)
//                 .post('/api/register')
//                 .send({ email: 'test@example.com', password: 'password123' })
//                 .expect(200);
            
//             expect(res.body.success).toBe(true);
//             expect(res.body.userId).toBeDefined();
//         });

//         it('should not register an existing user', async () => {
//             await User.create({ email: 'test@example.com', password: 'password123' });
//             const res = await request(app)
//                 .post('/api/register')
//                 .send({ email: 'test@example.com', password: 'password123' })
//                 .expect(200);

//             expect(res.body.success).toBe(false);
//             expect(res.body.message).toBe('User already exists');
//         });
//     });

//     describe('POST /api/login', () => {
//         it('should login an existing user', async () => {
//             const hashedPassword = await bcrypt.hash('password123', 10);
//             await User.create({ email: 'test@example.com', password: hashedPassword });

//             const res = await request(app)
//                 .post('/api/login')
//                 .send({ email: 'test@example.com', password: 'password123' })
//                 .expect(200);

//             expect(res.body.success).toBe(true);
//             expect(res.body.userId).toBeDefined();
//         });

//         it('should not login with incorrect password', async () => {
//             const hashedPassword = await bcrypt.hash('password123', 10);
//             await User.create({ email: 'test@example.com', password: hashedPassword });

//             const res = await request(app)
//                 .post('/api/login')
//                 .send({ email: 'test@example.com', password: 'wrongpassword' })
//                 .expect(400);

//             expect(res.body.success).toBe(false);
//             expect(res.body.message).toBe('Invalid email or password');
//         });
//     });

//     describe('POST /api/chat', () => {
//         it('should handle chat request', async () => {
//             const user = await User.create({ email: 'test2@example.com', password: 'password123' });

//             const res = await request(app)
//                 .post('/api/chat')
//                 .send({ userId: user.id, input: 'Hello!' })
//                 .expect(200);

//             expect(res.body.Conversation).toBeDefined();
//             expect(res.body.Conversation.length).toBeGreaterThan(0);
//         });

//         it('should return 401 for invalid userId', async () => {
//             const res = await request(app)
//                 .post('/api/chat')
//                 .send({ userId: 999, input: 'Hello!' })
//                 .expect(401);

//             expect(res.body.message).toBe('Unauthorized');
//         });
//     });

//     describe('GET /api/conversation/:userId', () => {
//         it('should get conversation for a valid user', async () => {
//             const user = await User.create({ email: 'test3@example.com', password: 'password123' });

//             await Message.create({ userId: user.id, role: 'user', content: 'Hello!' });
//             await Message.create({ userId: user.id, role: 'assistant', content: 'Hi there!' });

//             const res = await request(app)
//                 .get(`/api/conversation/${user.id}`)
//                 .expect(200);

//             expect(res.body.length).toBe(2);
//             expect(res.body[0].content).toBe('Hello!');
//             expect(res.body[1].content).toBe('Hi there!');
//         });

//         it('should return empty array for user with no messages', async () => {
//             const user = await User.create({ email: 'test4@example.com', password: 'password123' });

//             const res = await request(app)
//                 .get(`/api/conversation/${user.id}`)
//                 .expect(200);

//             expect(res.body.length).toBe(0);
//         });
//     });
// });
