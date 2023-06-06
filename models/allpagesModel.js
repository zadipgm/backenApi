import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const HeadAllPAges = db.define(
  "head_all",
  {
    all_page_content: {
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
export default HeadAllPAges;
