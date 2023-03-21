import HeadTag from "../models/HeadModel.js";
export const SetHeadTag = async (req, res) => {
  const {
    Page_Title,
    Meta_Description,
    Meta_Keyword_Description,
    Meta_og_title,
    Meta_og_description,
    Meta_og_image,
    Page_Name,
    Allow_All_Pages,
  } = req.body;

  try {
    await HeadTag.create({
      Page_Title: Page_Title,
      Meta_Description: Meta_Description,
      Meta_Keyword_Description: Meta_Keyword_Description,
      Meta_og_title: Meta_og_title,
      Meta_og_description: Meta_og_description,
      Meta_og_image: Meta_og_image,
      Page_Name: Page_Name,
      Allow_All_Pages: Allow_All_Pages,
    });
    res.json({ message_en: "Head tag Data Added Successfully!" });
  } catch (error) {
    res.json({ message_en: error, message_en: error });
    console.log(error);
  }
};

export const getHeadTag = async (req, res) => {
  let page = req.query.page;
  try {
    const page_tags = await HeadTag.findAll({
      where: {
        Page_Name: page,
      },
    });
    res.json(page_tags);
  } catch (error) {
    console.log(error);
  }
};
export const updateHeadTag = async (req, res) => {
  const id = req.params.id;
  const {
    Page_Title,
    Meta_Description,
    Meta_Keyword_Description,
    Meta_og_title,
    Meta_og_description,
    Meta_og_image,
    Page_Name,
  } = req.body;
  try {
    await HeadTag.update(
      {
        Page_Title: Page_Title,
        Meta_Description: Meta_Description,
        Meta_Keyword_Description: Meta_Keyword_Description,
        Meta_og_title: Meta_og_title,
        Meta_og_description: Meta_og_description,
        Meta_og_image: Meta_og_image,
        Page_Name: Page_Name,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ msg: "Data successfully Updated!" });
  } catch (msg) {
    res.status(500).json({ msg: "Oops... an error has occurred!" });
  }
};
