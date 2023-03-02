import express from "express";
// import {
//   getUsers,
//   Register,
//   Login,
//   Logout,
//   deleteUser,
//   editUser,
//   updateUser,
// } from "../controllers/Users.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
// import { SetHeadTag, getHeadTag } from "../controllers/Head.js";
// import { getZadipFormData } from "../controllers/ZadipForm.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HEY!");
});
// router.get("/users", getUsers);
// router.delete("/delete/:id", deleteUser);
// router.get("/edit/:id", editUser);
// router.put("/update:id", updateUser);
// router.post("/register", Register);
// router.post("/login", Login);
// router.post("/set_head", SetHeadTag);
// router.get("/get_head", getHeadTag);
// router.get("/get_zadipform", getZadipFormData);

// router.get("/token", refreshToken);
// router.delete("/logout", Logout);

export default router;
