const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize('sqlite:src/db.sqlite')

const Typy = sequelize.define('typy', {
  user_id: {
    type: DataTypes.INTEGER
  },
  mecz_id: {
    type: DataTypes.INTEGER
  },
  typ: {
    type: DataTypes.TEXT
  }
}, { timestamps: false, tableName: "typy" })

Typy.saveTypy = async (data, userId) => {
  const typyList = [];
  for (let i = 1; i <= 36; i++) {
    const typ = data[i];
    typyList.push({
      user_id: userId,
      mecz_id: i,
      typ: typ
    });
  }
  const result = await Typy.bulkCreate(typyList);
  console.log(result);
};

Typy.getTypy = async (userId) => {
  const typy = await Typy.findAll({
    where: {
      user_id: userId
    }
  })
  return typy
}

module.exports = Typy