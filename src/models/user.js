const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize('sqlite:src/db.sqlite')

const User = sequelize.define('users', {
  username: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  numer_telefonu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  aktywny: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false, tableName: 'users' })

module.exports = User