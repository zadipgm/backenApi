import { Sequelize } from "sequelize";

const db = new Sequelize("zadip_sa", "zadip", "Zadip@786!@#", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
