const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize('sqlite:src/db.sqlite')

const Czat = sequelize.define('czat', {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, { timestamps: false, tableName: 'czat' })


module.exports = Czat