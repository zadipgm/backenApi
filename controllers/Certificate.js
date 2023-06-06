import Certificates from "../models/certificate.js";

export const getCertificates = async (req, res) => {
  try {
    const certificate = await Certificates.findAll({
      attributes: [
        "id",
        "name",
        "certificate_number",
        "nationalID",
        "gender",
        "expiry_date",
        "procedures",
      ],
    });
    res.json(certificate);
  } catch (error) {
    console.log(error);
  }
};
export const CreateCertificates = async (req, res) => {
  const { name, certificate_number, nationalID, gender, expiry_date } =
    req.body;

  const certificate = await Certificates.findOne({
    where: {
      nationalID: nationalID,
    },
  });
  console.log(certificate === null);
  if (certificate === null) {
    try {
      await Certificates.create({
        name: name,
        certificate_number: certificate_number,
        nationalID: nationalID,
        expiry_date: expiry_date,
        gender: gender,
      });
      res.json({ message_en: "Certificate Generated Successfully" });
    } catch (error) {
      console.log(error);
    }
  }
  if (certificate && certificate.dataValues.nationalID === nationalID) {
    return res.status(400).send({
      message_en: "Certificate opposed to this National ID already Exist",
      message_ar: "Certificate opposed to this National ID already Exist",
    });
  }
};
