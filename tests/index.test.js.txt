// const request = require('supertest');
// const express = require('express');
// const bodyParser = require('body-parser');
// const { sequelize, User } = require('../db');
// const { sequelize: sequelizeChatbot, Message } = require('../db_chatbot');
// const app = express();
// app.use(bodyParser.json());

// // Configurar las rutas para pruebas
// // app.post('/api/login', ...);  // Define tus rutas aquí
// // app.post('/api/register', ...);
// // app.post('/api/chat', ...);
// // app.get('/api/conversation/:userId', ...);

// describe('API Endpoints', () => {
//   beforeAll(async () => {
//     await sequelize.sync({ force: true });
//     await sequelizeChatbot.sync({ force: true });
//   });

//   afterAll(async () => {
//     await sequelize.close();
//     await sequelizeChatbot.close();
//   });

//   test('should register a new user', async () => {
//     const response = await request(app)
//       .post('/api/register')
//       .send({ email: 'test@example.com', password: 'password' });

//     expect(response.statusCode).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.userId).toBeDefined();
//   });

//   test('should login a user', async () => {
//     await User.create({ email: 'test@example.com', password: 'password' });

//     const response = await request(app)
//       .post('/api/login')
//       .send({ email: 'test@example.com', password: 'password' });

//     expect(response.statusCode).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.userId).toBeDefined();
//   });

//   test('should handle chat message', async () => {
//     const user = await User.create({ email: 'test2@example.com', password: 'password' });

//     const response = await request(app)
//       .post('/api/chat')
//       .send({ userId: user.id, input: 'Hello' });

//     expect(response.statusCode).toBe(200);
//     expect(response.body.Conversation).toBeDefined();
//   });
// });
