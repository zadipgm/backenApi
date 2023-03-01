import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ZadipForm = db.define(
  "contact",
  {
    Name: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    MobileNumber: {
      type: DataTypes.STRING,
    },
    ServiceName: {
      type: DataTypes.STRING,
    },
    Page: {
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

export default ZadipForm;
