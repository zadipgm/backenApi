import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const HeadTag = db.define(
  "head_tag",
  {
    Page_Title_en: {
      type: DataTypes.STRING,
    },
    Page_Title_ar: {
      type: DataTypes.STRING,
    },
    Meta_Description_en: {
      type: DataTypes.STRING,
    },
    Meta_Description_ar: {
      type: DataTypes.STRING,
    },
    Meta_Keyword_Description_en: {
      type: DataTypes.STRING,
    },
    Meta_Keyword_Description_ar: {
      type: DataTypes.STRING,
    },
    Meta_og_title_en: {
      type: DataTypes.STRING,
    },
    Meta_og_title_ar: {
      type: DataTypes.STRING,
    },
    Meta_og_description_en: {
      type: DataTypes.STRING,
    },
    Meta_og_description_ar: {
      type: DataTypes.STRING,
    },
    Meta_og_image: {
      type: DataTypes.STRING,
    },
    Meta_og_Url: {
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
