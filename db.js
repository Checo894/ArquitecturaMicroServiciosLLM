const { Sequelize, DataTypes } = require('sequelize');

// Configura tu conexión a la base de datos
const sequelize = new Sequelize('llm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define el modelo de usuario
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = { sequelize, User };


// const { Sequelize, DataTypes } = require('sequelize');

// // Configura tu conexión a la base de datos
// const sequelize = new Sequelize('llm', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// // Define el modelo de usuario
// const User = sequelize.define('User', {
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     tableName: 'user',
//     timestamps: false
// });

// module.exports = { sequelize, User };
