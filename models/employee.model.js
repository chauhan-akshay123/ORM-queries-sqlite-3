let { DataTypes, sequelize } = require("../lib/");

let employee = sequelize.define("employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,       
  },
 name: DataTypes.TEXT,
 salary: DataTypes.INTEGER,
 department: DataTypes.TEXT,
 designation: DataTypes.TEXT,
});

module.exports = { employee };