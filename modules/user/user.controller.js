import userModel from "../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendToEmail } from "../../utilities/sendEmail.js";

const signUp = async (req, res) => {
  const { email } = req.body;
  const registeredUser = await userModel.findOne({ email: email });
  if (registeredUser) {
    res
      .status(409)
      .json({ msg: "this email linked to another account, Try sign in" });
  } else {
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await userModel.insertMany({
      ...req.body,
      password: hashedPassword,
    });
    sendToEmail(email);

    res.status(201).json({ message: "added successfully", newUser });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const foundedUser = await userModel.findOne({ email: email });
  if (foundedUser) {
    const match = bcrypt.compareSync(password, foundedUser.password);
    if (match) {
      const token = jwt.sign({ id: foundedUser.id }, "7amada");
      const logIn = await userModel.findByIdAndUpdate(foundedUser.id, {
        isLogIn: true,
      });
      res.status(200).json({ message: "Welcome", token, logIn });
    } else {
      res.status(400).json({ message: "password wrong" });
    }
  } else {
    res.status(404).json({ msg: "user not founded" });
  }
};

const changePassword = async (req, res) => {
  const { email, password } = req.body;
  const foundedUser = await userModel.findOneAndUpdate(
    { email: email },
    { password: password },
    { new: true }
  );
  res.status(201).json({ msg: "user data updated successfully", foundedUser });
};

const updateUser = async (req, res) => {
  const { token } = req.headers;
  const { id } = jwt.verify(token, "7amada");

  const { userName, age } = req.body;
  const foundedUser = await userModel.findByIdAndUpdate(
    id,
    {
      userName: userName,
      age: age,
    },
    { new: true }
  );
  res.status(201).json({ msg: "user data updated successfully", foundedUser });
};

const deleteUser = async (req, res) => {
  const { token } = req.headers;
  const { id } = jwt.verify(token, "7amada");

  const { userName, age } = req.body;
  const foundedUser = await userModel.findByIdAndDelete(id);
  res.status(201).json({ msg: "user deleted successfully", foundedUser });
};

const softDeletedUser = async (req, res) => {
  const { token } = req.headers;
  const { id } = jwt.verify(token, "7amada");

  const deletedElements = await userModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true }
  );
  res.json({ msg: "soft delete to user ", deletedElements });
};

const logOut = async (req, res) => {
  const { token } = req.headers;
  const { id } = jwt.verify(token, "7amada");

  const logOut = await userModel.findByIdAndUpdate(
    id,
    {
      isLogIn: false,
    },
    { new: true }
  );
  res.json({ msg: "logged out", logOut });
};

const verifiy = async (req, res) => {
  const { token } = req.headers;
  const { id } = jwt.verify(token, "7amada");

  const verified = await userModel.findByIdAndUpdate(
    id,
    {
      isVerified: true,
    },
    { new: true }
  );
  res.json({ msg: "verified", verified });
};
export {
  signUp,
  signIn,
  changePassword,
  updateUser,
  deleteUser,
  softDeletedUser,
  logOut,
  verifiy,
};
