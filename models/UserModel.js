import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name_en: {
      type: DataTypes.STRING,
    },
    name_ar: {
      type: DataTypes.STRING,
    },
    nationalID: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Users;
