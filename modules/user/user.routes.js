import express from "express";
import {
  signUp,
  signIn,
  changePassword,
  updateUser,
  deleteUser,
  softDeletedUser,
  logOut,
  verifiy,
} from "./user.controller.js";
import validation from "../../middleware/validation.js";
import { signUpSchema, signInSchema } from "./user.validation.js";
import authorization from "../../middleware/autorization.js";
const userRoutes = express.Router();
userRoutes.post("/signUp", validation(signUpSchema), signUp);
userRoutes.post("/signIn", validation(signInSchema), signIn);
userRoutes.patch("/changePassword", authorization, changePassword);
userRoutes.patch("/updateUser", authorization, updateUser);
userRoutes.delete("/deleteUser", authorization, deleteUser);
userRoutes.post("/softDeletedUser", authorization, softDeletedUser);
userRoutes.post("/logOut", authorization, logOut);
userRoutes.post("/user/verify", authorization, verifiy);
export default userRoutes;
