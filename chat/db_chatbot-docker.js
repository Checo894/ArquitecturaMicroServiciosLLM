const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE_CHATBOT, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD || null, {
  host: process.env.MYSQL_HOST_CHATBOT,
  dialect: 'mysql'
});

const Message = sequelize.define('Message', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'assistant'),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'messages',
  timestamps: false
});

module.exports = { sequelize, Message };
