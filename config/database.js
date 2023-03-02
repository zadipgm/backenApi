import { Sequelize } from "sequelize";

const db = new Sequelize("zadip", "root", "Zadip@786!@#", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
