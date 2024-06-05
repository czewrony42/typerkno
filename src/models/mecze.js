const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('sqlite:src/db.sqlite');
const Typy = require('./typy');

const Mecz = sequelize.define('mecze', {
  gospodarz: {
    type: DataTypes.TEXT,
  },
  gosc: {
    type: DataTypes.TEXT,
  },
  miejsce: {
    type: DataTypes.TEXT,
  },
  grupa: {
    type: DataTypes.TEXT,
  },
  data: {
    type: DataTypes.TEXT,
  },
  godzina: {
    type: DataTypes.TEXT,
  },
  wynik: {
    type: DataTypes.TEXT,
  },
}, { timestamps: false, tableName: "mecze" });

Mecz.hasMany(Typy, { 
  foreignKey: 'mecz_id',
  where: { user_id: 1 } // Warunek user_id
});
Typy.belongsTo(Mecz, { foreignKey: "mecz_id" });

Mecz.getMecze = async (userID) => {
  const mecze = await Mecz.findAll({
    include: {
      model: Typy,
      where: {user_id: userID}
    }
  });
  return mecze;
};

module.exports = Mecz;
