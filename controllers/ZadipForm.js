import SendEmailToAdmin from "../email_template/SendEmailToAdmin.js";
import SendEmailToUser from "../email_template/sendEmailToUser.js";
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
export const setZadipFormData = async (req, res) => {
  const { Name, Email, MobileNumber, ServiceName, Page } = req.body;
  if ((Name, Email, MobileNumber, ServiceName, Page)) {
    try {
      await ZadipForm.create({
        Name: Name,
        Email: Email,
        MobileNumber: MobileNumber,
        ServiceName: ServiceName,
        Page: Page,
      });
      res.json({
        message_en: "Request submitted",
        message_ar: "Request submitted",
      });
      SendEmailToUser(Email, Name);
      SendEmailToAdmin(Email, MobileNumber, Name, ServiceName);
    } catch (error) {
      res.json({ message_en: "Try again", message_ar: "Try again" });
      console.log(error);
    }
  }
};
