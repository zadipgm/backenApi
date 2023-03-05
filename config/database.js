import { Sequelize } from "sequelize";

const db = new Sequelize("root", "root", "Shani@786!@#", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
