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
  // Przygotuj listę obiektów do wstawienia do bazy danych
  const typyList = [];
  for (let i = 1; i <= 36; i++) {
    const typ = data[i];
    // Dodaj obiekt do listy
    typyList.push({
      user_id: userId,
      mecz_id: i,
      typ: typ
    });
  }

  // Wstaw listę obiektów do bazy danych
  const result = await Typy.bulkCreate(typyList);
  console.log("git dodałem typy do bazy");
};
module.exports = Typy