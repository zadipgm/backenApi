import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "First_Name", "Last_Name", "Email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (req, res) => {
  const id = req.params.id;
  console.log("here s user", id);
  const user = await Users.findOne({
    attributes: ["First_Name", "Last_Name", "Email"],
    where: {
      id: id,
    },
  });

  if (!user) {
    res.status(404).json({ msg: "User not found!" });
    return;
  } else {
    res.json(user);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("here s user", id);
  const { First_Name, Last_Name, Email } = req.body;
  try {
    await Users.update(
      {
        First_Name: First_Name,
        Last_Name: Last_Name,
        Email: Email,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ msg: "user successfully Updated!" });
  } catch (msg) {
    res.status(500).json({ msg: "Oops... an error has occurred!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await Users.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    res.status(404).json({ msg: "User not found!" });
    return;
  }

  try {
    await Users.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ msg: "Account successfully deleted!" });
  } catch (msg) {
    res.status(500).json({ msg: "Oops... an error has occurred!" });
  }
};
export const Register = async (req, res) => {
  const { First_Name, Last_Name, Email, Password, Confirm_Password, Role } =
    req.body;
  if (Password !== Confirm_Password)
    return res.status(400).send({
      message_en: "Password and Confirm Password do not match",
      message_ar: "Password and Confirm Password do not match",
    });
  const user = await Users.findAll({
    where: {
      Email: Email,
    },
  });
  console.log("here is user", user.length);
  if (user.length >= 1)
    return res.status(400).send({
      message_en: "Email Already Exist",
      message_ar: "Email Already Exist",
    });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(Password, salt);
  const hashConfirmPassword = await bcrypt.hash(Confirm_Password, salt);
  try {
    await Users.create({
      First_Name: First_Name,
      Last_Name: Last_Name,
      Email: Email,
      Password: hashPassword,
      Confirm_Password: hashConfirmPassword,
      Role: Role,
    });
    res.json({ message_en: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        Email: req.body.Email,
      },
    });
    const match = await bcrypt.compare(req.body.Password, user[0].Password);

    if (!match)
      return res
        .status(400)
        .json({ message_en: "Wrong Password", message_ar: "كلمة مرور خاطئة" });
    const userId = user[0].id;
    const email = user[0].Email;
    const accessToken = jwt.sign(
      { userId, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, isLogin: true });
  } catch (error) {
    res.status(404).json({ message_ar: "Email not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
