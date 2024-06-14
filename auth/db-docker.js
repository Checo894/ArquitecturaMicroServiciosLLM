const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE_USER, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD || null, {
  host: process.env.MYSQL_HOST_USER,
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
