import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/checkAuthenticity.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "API is Working!" });
});

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
// router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);
router.get("/:userId", getUser);

export default router;
