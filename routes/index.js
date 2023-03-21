import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  deleteUser,
  editUser,
  updateUser,
} from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { SetHeadTag, getHeadTag, updateHeadTag } from "../controllers/Head.js";
import {
  getZadipFormData,
  setZadipFormData,
} from "../controllers/ZadipForm.js";
import {
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/Password.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HEY!");
});
router.get("/users", getUsers);
router.delete("/delete/:id", deleteUser);
router.get("/edit/:id", editUser);
router.put("/update:id", updateUser);
router.post("/register", Register);
router.post("/login", Login);
router.post("/set_head", SetHeadTag);
router.get("/get_head", getHeadTag);
router.put("/updatehead/:id", updateHeadTag);
router.get("/get_zadipform", getZadipFormData);
router.post("/zadip_form", setZadipFormData);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-password", updatePassword);

router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
