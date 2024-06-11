const { sequelize, User } = require('../db');

describe('User Model', () => {
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

  test('should create a new user', async () => {
    const user = await User.create({ email: 'test@example.com', password: 'password' });
    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password');
  });

  test('should find a user by email', async () => {
    const user = await User.findOne({ where: { email: 'test@example.com' } });
    expect(user).not.toBeNull();
    expect(user.email).toBe('test@example.com');
  });

  test('should update a user password', async () => {
    const user = await User.findOne({ where: { email: 'test@example.com' } });
    user.password = 'newpassword';
    await user.save();

    const updatedUser = await User.findOne({ where: { email: 'test@example.com' } });
    expect(updatedUser.password).toBe('newpassword');
  });

  test('should delete a user', async () => {
    await User.destroy({ where: { email: 'test@example.com' } });
    const user = await User.findOne({ where: { email: 'test@example.com' } });
    expect(user).toBeNull();
  });
});


// const { sequelize, User } = require('../db');

// describe('User Model', () => {
//   beforeAll(async () => {
//     try {
//       // Sincroniza la base de datos antes de ejecutar las pruebas
//       await sequelize.authenticate();
//       await sequelize.sync({ force: true });
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

//   test('should create a new user', async () => {
//     const user = await User.create({ email: 'test@example.com', password: 'password' });
//     expect(user.id).toBeDefined();
//     expect(user.email).toBe('test@example.com');
//     expect(user.password).toBe('password');
//   });

//   test('should find a user by email', async () => {
//     const user = await User.findOne({ where: { email: 'test@example.com' } });
//     expect(user).not.toBeNull();
//     expect(user.email).toBe('test@example.com');
//   });

//   test('should update a user password', async () => {
//     const user = await User.findOne({ where: { email: 'test@example.com' } });
//     user.password = 'newpassword';
//     await user.save();

//     const updatedUser = await User.findOne({ where: { email: 'test@example.com' } });
//     expect(updatedUser.password).toBe('newpassword');
//   });

//   test('should delete a user', async () => {
//     await User.destroy({ where: { email: 'test@example.com' } });
//     const user = await User.findOne({ where: { email: 'test@example.com' } });
//     expect(user).toBeNull();
//   });
// });


// // const { sequelize, User } = require('../db');

// // describe('User Model', () => {
// //   beforeAll(async () => {
// //     // Sincroniza la base de datos antes de ejecutar las pruebas
// //     await sequelize.sync({ force: true });
// //   });

// //   afterAll(async () => {
// //     // Cierra la conexión de la base de datos después de las pruebas
// //     await sequelize.close();
// //   });

// //   test('should create a new user', async () => {
// //     const user = await User.create({ email: 'test@example.com', password: 'password' });
// //     expect(user.id).toBeDefined();
// //     expect(user.email).toBe('test@example.com');
// //     expect(user.password).toBe('password');
// //   });

// //   test('should find a user by email', async () => {
// //     const user = await User.findOne({ where: { email: 'test@example.com' } });
// //     expect(user).not.toBeNull();
// //     expect(user.email).toBe('test@example.com');
// //   });

// //   test('should update a user password', async () => {
// //     const user = await User.findOne({ where: { email: 'test@example.com' } });
// //     user.password = 'newpassword';
// //     await user.save();

// //     const updatedUser = await User.findOne({ where: { email: 'test@example.com' } });
// //     expect(updatedUser.password).toBe('newpassword');
// //   });

// //   test('should delete a user', async () => {
// //     await User.destroy({ where: { email: 'test@example.com' } });
// //     const user = await User.findOne({ where: { email: 'test@example.com' } });
// //     expect(user).toBeNull();
// //   });
// // });
