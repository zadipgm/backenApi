import HeadTag from "../models/HeadModel.js";
import HeadAllPAges from "../models/allpagesModel.js";
export const SetHeadTag = async (req, res) => {
  const {
    Page_Title_en,
    Page_Title_ar,
    Meta_Description_en,
    Meta_Description_ar,
    Meta_Keyword_Description_en,
    Meta_Keyword_Description_ar,
    Meta_og_title_en,
    Meta_og_title_ar,
    Meta_og_description_en,
    Meta_og_description_ar,
    Meta_og_image,
    Page_Name,
    Allow_All_Pages,
    Meta_og_Url,
  } = req.body;

  try {
    await HeadTag.create({
      Page_Title_en: Page_Title_en,
      Page_Title_ar: Page_Title_ar,
      Meta_Description_en: Meta_Description_en,
      Meta_Description_ar: Meta_Description_ar,
      Meta_Keyword_Description_en: Meta_Keyword_Description_en,
      Meta_Keyword_Description_ar: Meta_Keyword_Description_ar,
      Meta_og_title_en: Meta_og_title_en,
      Meta_og_title_ar: Meta_og_title_ar,
      Meta_og_description_en: Meta_og_description_en,
      Meta_og_description_ar: Meta_og_description_ar,
      Meta_og_image: Meta_og_image,
      Meta_og_Url: Meta_og_Url,
      Page_Name: Page_Name,
      Allow_All_Pages: Allow_All_Pages,
    });
    res.json({ message_en: "Head tag Data Added Successfully!" });
  } catch (error) {
    res.json({ message_en: error, message_en: error });
    console.log(error);
  }
};
// for all pages post
export const SetHeadAllPages = async (req, res) => {
  const { all_page_content } = req.body;

  try {
    await HeadAllPAges.create({
      all_page_content: all_page_content,
    });
    res.json({ message_en: "Head tag Data Added Successfully!" });
  } catch (error) {
    res.json({ message_en: error, message_en: error });
    console.log(error);
  }
};
// for all pages get
export const getHeadAllPages = async (req, res) => {
  try {
    const page_tags = await HeadAllPAges.findAll({
      attributes: ["id", "all_page_content"],
    });
    res.json(page_tags);
  } catch (error) {
    console.log(error);
  }
};

export const getHeadTag = async (req, res) => {
  var page = req.query.page;
  let object = {
    Page_Title_en: "",
    Page_Title_ar: "",
    Meta_Description_en: "",
    Meta_Description_ar: "",
    Meta_Keyword_Description_en: "",
    Meta_Keyword_Description_ar: "",
    Meta_og_title_en: "",
    Meta_og_title_ar: "",
    Meta_og_description_en: "",
    Meta_og_description_ar: "",
    Meta_og_image: "",
    Page_Name: page,
    Meta_og_Url: "",
  };
  if (req.query.page) {
    page = req.query.page;
  } else {
    page = "home";
  }
  if (page !== undefined) {
    try {
      const page_tags = await HeadTag.findAll({
        attributes: [
          "id",
          "Page_Title_en",
          "Page_Title_ar",
          "Meta_Description_en",
          "Meta_Description_ar",
          "Meta_Keyword_Description_en",
          "Meta_Keyword_Description_ar",
          "Meta_og_title_en",
          "Meta_og_title_ar",
          "Meta_og_description_en",
          "Meta_og_description_ar",
          "Meta_og_image",
          "Meta_og_Url",
          "Page_Name",
        ],
        where: {
          Page_Name: page,
        },
      });
      if (page_tags[0]?.Page_Name === undefined) {
        res.json([object]);
        console.log(error);
      } else {
        res.json(page_tags);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
export const updateHeadTag = async (req, res) => {
  const id = req.params.id;
  const {
    Page_Title_en,
    Page_Title_ar,
    Meta_Description_en,
    Meta_Description_ar,
    Meta_Keyword_Description_en,
    Meta_Keyword_Description_ar,
    Meta_og_title_en,
    Meta_og_title_ar,
    Meta_og_description_en,
    Meta_og_description_ar,
    Meta_og_image,
    Page_Name,
    Meta_og_Url,
  } = req.body;
  try {
    await HeadTag.update(
      {
        Page_Title_en: Page_Title_en,
        Page_Title_ar: Page_Title_ar,
        Meta_Description_en: Meta_Description_en,
        Meta_Description_ar: Meta_Description_ar,
        Meta_Keyword_Description_en: Meta_Keyword_Description_en,
        Meta_Keyword_Description_ar: Meta_Keyword_Description_ar,
        Meta_og_title_en: Meta_og_title_en,
        Meta_og_title_ar: Meta_og_title_ar,
        Meta_og_description_en: Meta_og_description_en,
        Meta_og_description_ar: Meta_og_description_ar,
        Meta_og_image: Meta_og_image,
        Meta_og_Url: Meta_og_Url,
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

export const updateHeadTagAllPage = async (req, res) => {
  const id = req.params.id;
  const { all_page_content } = req.body;
  try {
    await HeadAllPAges.update(
      {
        all_page_content,
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
