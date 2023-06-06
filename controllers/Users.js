import Users from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: [
        "id",
        "name_en",
        "name_ar",
        "email",
        "gender",
        "nationalID",
        "procedures",
      ],
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
    attributes: ["name_en", "name_ar", "email"],
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
  const { name_en, name_ar, email } = req.body;
  try {
    await Users.update(
      {
        name_en: name_en,
        name_ar: name_ar,
        email: email,
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
  const {
    name_en,
    name_ar,
    email,
    phoneNumber,
    nationalID,
    password,
    role,
    gender,
  } = req.body;

  const user = await Users.findOne({
    where: {
      nationalID: nationalID,
    },
  });
  if (user === null) {
    try {
      await Users.create({
        name_en: name_en,
        name_ar: name_ar,
        nationalID: nationalID,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        gender: gender,
        role: role,
      });
      res.json({ message_en: "Registration Successful" });
    } catch (error) {
      console.log(error);
    }
  }
  if (user && user.dataValues.nationalID === nationalID) {
    return res.status(400).send({
      message_en: "National ID already Exist",
      message_ar: "National ID Already Exist",
    });
  }
};

export const Login = async (req, res) => {
  let userEmail = req.body.email;
  try {
    const user = await Users.findAll({
      where: {
        email: userEmail,
      },
    });
    const match = req.body.password === user[0].password;
    const matchEmail = userEmail === user[0].email;

    if (!match) {
      return res
        .status(400)
        .json({ message_en: "Wrong Password", message_ar: "كلمة مرور خاطئة" });
    }

    res.json({ isLogin: true, email: userEmail });
  } catch (error) {
    res
      .status(400)
      .json({ message_ar: "Invalid Email", message_en: "Invalid Email" });
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
