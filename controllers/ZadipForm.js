import ZadipForm from "../models/ZadipFormsModel.js";

export const getZadipFormData = async (req, res) => {
  try {
    const users = await ZadipForm.findAll({
      attributes: [
        "id",
        "Name",
        "Email",
        "MobileNumber",
        "ServiceName",
        "Page",
      ],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
