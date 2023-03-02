import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const HeadTag = db.define(
  "head_tag",
  {
    Page_Title: {
      type: DataTypes.STRING,
    },
    Meta_Name: {
      type: DataTypes.STRING,
    },
    Meta_Description: {
      type: DataTypes.STRING,
    },
    Meta_Property: {
      type: DataTypes.STRING,
    },
    Meta_Property_Description: {
      type: DataTypes.STRING,
    },
    Page_Name: {
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

export default HeadTag;
