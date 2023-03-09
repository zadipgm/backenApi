import ResetToken from "../models/ResetTokens.js";
import Users from "../models/UserModel.js";
import Sequelize from "sequelize";
import bcrypt from "bcrypt";

export const forgotPassword = async (req, res) => {
  let userEmail = req.body.Email;
  console.log("userEmail", userEmail);
  let email = await Users.findOne({ where: { Email: userEmail } });
  if (email == null) {
    return res.json({ status: "ok" });
  }
  await ResetToken.update(
    {
      used: 1,
    },
    {
      where: {
        email: userEmail,
      },
    }
  );

  let fpSalt = crypto.randomBytes(64).toString("base64");
  let expireDate = new Date(new Date().getTime() + 60 * 60 * 1000);

  await ResetToken.create({
    email: userEmail,
    expiration: expireDate,
    token: fpSalt,
    used: 0,
  });
  PasswordResetEmail(email, fpSalt);
  return res.json({ status: "Email Link has been sent to you" });
};

export const resetPassword = async (req, res) => {
  const Op = Sequelize.Op;
  let email = req.body.email;
  let token = req.body.token;
  await ResetToken.destroy({
    where: {
      expiration: { [Op.lt]: Sequelize.fn("CURDATE") },
    },
  });

  let record = await ResetToken.findOne({
    where: {
      email: email,
      expiration: { [Op.gt]: Sequelize.fn("CURDATE") },
      token: token,
      used: 0,
    },
  });

  if (record == null) {
    return res.sendStatus(404);
  } else {
    return res.json({ status: "TOKEN VALID" });
  }
};

export const updatePassword = async (req, res) => {
  const Op = Sequelize.Op;
  const { email, token, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.json({
      status: "error",
      message: "Passwords do not match. Please try again.",
    });
  }

  let record = await ResetToken.findOne({
    where: {
      email: email,
      expiration: { [Op.gt]: Sequelize.fn("CURDATE") },
      token: token,
      used: 0,
    },
  });

  if (record == null) {
    return res.json({
      status: "error",
      message: "Token not valid. Please try the reset password process again.",
    });
  } else {
    await ResetToken.update(
      {
        used: 1,
      },
      {
        where: {
          email: email,
        },
      }
    );
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);

  await Users.update(
    {
      Password: hashPassword,
      Confirm_Password: hashConfirmPassword,
    },
    {
      where: {
        Email: email,
      },
    }
  );

  return res.json({
    status: "ok",
    message: "Password reset. Please login with your new password.",
  });
};
