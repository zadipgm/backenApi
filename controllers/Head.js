import HeadTag from "../models/HeadModel.js";
export const SetHeadTag = async (req, res) => {
  console.log("here is body", req.body);
  const {
    Page_Title,
    Meta_Name,
    Meta_Description,
    Meta_Property,
    Meta_Property_Description,
    Page_Name,
  } = req.body;
  try {
    await HeadTag.create({
      Page_Title: Page_Title,
      Meta_Name: Meta_Name,
      Meta_Description: Meta_Description,
      Meta_Property: Meta_Property,
      Meta_Property_Description: Meta_Property_Description,
      Page_Name: Page_Name,
    });
    res.json({ message_en: "Data Added Successfully!" });
  } catch (error) {
    res.json({ message_en: error, message_en: error });
    console.log(error);
  }
};

export const getHeadTag = async (req, res) => {
  let page = req.query.page;

  try {
    const user = await HeadTag.findAll({
      where: {
        Page_Name: page,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
