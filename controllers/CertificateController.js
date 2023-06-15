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
export const deleteCertificate = async (req, res) => {
  const nationalID = req.params.id;

  const certificate = await Certificates.findOne({
    where: {
      nationalID: nationalID,
    },
  });

  if (!certificate) {
    res.status(404).json({
      message_en: "Certificate not found!",
      message_ar: "Certificate not found!",
    });
  } else {
    try {
      await Certificates.destroy({
        where: {
          nationalID: nationalID.trim(),
        },
      });

      res.status(200).json({
        message_en: "Certificate successfully deleted!",
        message_ar: "Certificate successfully deleted!",
      });
    } catch (msg) {
      res.status(500).json({
        message_en: "Oops... an error has occurred!",
        message_ar: "Oops... an error has occurred!",
      });
    }
  }
};
