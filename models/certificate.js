import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Certificates = db.define(
  "certificate",
  {
    name: {
      type: DataTypes.STRING,
    },
    certificate_number: {
      type: DataTypes.STRING,
    },
    nationalID: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    expiry_date: {
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

export default Certificates;
