const Sequelize = require("sequelize");
const db = new Sequelize("zadip_sa", "root", "Shani@786!@#", {
  host: "localhost",
  dialect: "mysql",
});
export default db;
