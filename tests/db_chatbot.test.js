const { sequelize, Message } = require('../db_chatbot');

describe('Message Model', () => {
  beforeAll(async () => {
    try {
      // Deshabilitar restricciones de claves foráneas
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      // Sincroniza la base de datos antes de ejecutar las pruebas
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      // Habilitar restricciones de claves foráneas
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  afterAll(async () => {
    try {
      // Cierra la conexión de la base de datos después de las pruebas
      await sequelize.close();
    } catch (error) {
      console.error('Error closing the database connection:', error);
    }
  });

  beforeEach(async () => {
    try {
      // Limpiar la tabla de mensajes antes de cada prueba
      await Message.destroy({ where: {} });
    } catch (error) {
      console.error('Error clearing messages table:', error);
    }
  });

  test('should create a new message', async () => {
    const message = await Message.create({ userId: 1, role: 'user', content: 'Hello' });
    expect(message.id).toBeDefined();
    expect(message.userId).toBe(1);
    expect(message.role).toBe('user');
    expect(message.content).toBe('Hello');
  });

  test('should fetch messages for a user', async () => {
    await Message.create({ userId: 1, role: 'user', content: 'Hello' });
    await Message.create({ userId: 1, role: 'assistant', content: 'Hi there!' });

    const messages = await Message.findAll({ where: { userId: 1 }, order: [['timestamp', 'ASC']] });
    expect(messages.length).toBe(2);
    expect(messages[0].content).toBe('Hello');
    expect(messages[1].content).toBe('Hi there!');
  });

  test('should delete a message', async () => {
    const message = await Message.create({ userId: 1, role: 'user', content: 'Hello' });
    await Message.destroy({ where: { id: message.id } });

    const deletedMessage = await Message.findOne({ where: { id: message.id } });
    expect(deletedMessage).toBeNull();
  });
});


// const { sequelize, Message } = require('../db_chatbot');

// describe('Message Model', () => {
//   beforeAll(async () => {
//     try {
//       // Deshabilitar restricciones de claves foráneas
//       await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
//       // Sincroniza la base de datos antes de ejecutar las pruebas
//       await sequelize.authenticate();
//       await sequelize.sync({ force: true });
//       // Habilitar restricciones de claves foráneas
//       await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
//   });

//   afterAll(async () => {
//     try {
//       // Cierra la conexión de la base de datos después de las pruebas
//       await sequelize.close();
//     } catch (error) {
//       console.error('Error closing the database connection:', error);
//     }
//   });

//   test('should create a new message', async () => {
//     const message = await Message.create({ userId: 1, role: 'user', content: 'Hello' });
//     expect(message.id).toBeDefined();
//     expect(message.userId).toBe(1);
//     expect(message.role).toBe('user');
//     expect(message.content).toBe('Hello');
//   });

//   test('should fetch messages for a user', async () => {
//     await Message.create({ userId: 1, role: 'user', content: 'Hello' });
//     await Message.create({ userId: 1, role: 'assistant', content: 'Hi there!' });

//     const messages = await Message.findAll({ where: { userId: 1 }, order: [['timestamp', 'ASC']] });
//     expect(messages.length).toBe(2);
//     expect(messages[0].content).toBe('Hello');
//     expect(messages[1].content).toBe('Hi there!');
//   });

//   test('should delete a message', async () => {
//     const message = await Message.create({ userId: 1, role: 'user', content: 'Hello' });
//     await Message.destroy({ where: { id: message.id } });

//     const deletedMessage = await Message.findOne({ where: { id: message.id } });
//     expect(deletedMessage).toBeNull();
//   });
// });



// // const { sequelize, Message } = require('../db_chatbot');

// // describe('Chatbot Database', () => {
// //   beforeAll(async () => {
// //     await sequelize.sync({ force: true });
// //   });

// //   afterAll(async () => {
// //     await sequelize.close();
// //   });

// //   test('should create a new message', async () => {
// //     const message = await Message.create({ userId: 1, role: 'user', content: 'Hello' });
// //     expect(message.id).toBeDefined();
// //     expect(message.userId).toBe(1);
// //     expect(message.role).toBe('user');
// //     expect(message.content).toBe('Hello');
// //   });

// //   test('should fetch messages for a user', async () => {
// //     await Message.create({ userId: 1, role: 'user', content: 'Hello' });
// //     await Message.create({ userId: 1, role: 'assistant', content: 'Hi there!' });

// //     const messages = await Message.findAll({ where: { userId: 1 }, order: [['timestamp', 'ASC']] });
// //     expect(messages.length).toBe(2);
// //     expect(messages[0].content).toBe('Hello');
// //     expect(messages[1].content).toBe('Hi there!');
// //   });
// // });
