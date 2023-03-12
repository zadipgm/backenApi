import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const ResetToken = db.define(
  "ResetTokens",
  {
    email: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    expiration: {
      type: DataTypes.DATE,
    },
    used: {
      type: DataTypes.TINYINT,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default ResetToken;
