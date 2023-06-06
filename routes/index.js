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
import {
  SetHeadAllPages,
  SetHeadTag,
  getHeadAllPages,
  getHeadTag,
  updateHeadTag,
  updateHeadTagAllPage,
} from "../controllers/Head.js";
import {
  getZadipFormData,
  setZadipFormData,
} from "../controllers/ZadipForm.js";
import {
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/Password.js";
import {
  CreateCertificates,
  getCertificates,
} from "../controllers/certificate.js";

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
router.post("/add_all", SetHeadAllPages);
router.get("/get_all", getHeadAllPages);
router.put("/updatehead/:id", updateHeadTag);
router.put("/add_all_update/:id", updateHeadTagAllPage);
router.get("/get_zadipform", getZadipFormData);
router.post("/zadip_form", setZadipFormData);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-password", updatePassword);
router.post("/create_certificate", CreateCertificates);
router.get("/certificates", getCertificates);

router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
