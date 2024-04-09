const UserModel = require("../Models/UsersModel");
const UserValid = require("../Utils/UsersValidation");
const bcrypt = require("bcrypt");

const GetAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetUserByID = async (req, res) => {
  const user_id = req.params.id;
  try {
    const foundedUser = await UserModel.findById(user_id);
    if (foundedUser) {
      return res.status(200).json({ data: foundedUser });
    } else {
      return res.status(404).json({ error: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const Register = async (req, res) => {
  const RegisteredData = req.body;
  if (UserValid(RegisteredData)) {
    try {
      let foundedUser = await UserModel.findOne({
        email: RegisteredData.email.toLowerCase(),
      });
      if (foundedUser) {
        return res.status(400).json({ error: "User Already Exists" });
      }

      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(RegisteredData.password, salt);
      RegisteredData.password = hashedPassword;

      RegisteredData.email = req.body.email.toLowerCase();
      let newUser = new UserModel(RegisteredData);
      await newUser.save();
      return res
        .status(201)
        .json({ message: "User Registered Successfully", data: newUser });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({
      error:
        UserValid.errors[0].instancePath.split("/")[1] +
        ": " +
        UserValid.errors[0].keyword +
        " ==> " +
        UserValid.errors[0].message,
    });
  }
};

const Login = async (req, res) => {
  const userData = req.body;
  try {
    let foundedUser = await UserModel.findOne({
      email: userData.email.toLowerCase(),
    });
    if (!foundedUser)
      return res.status(401).json({ error: "Invalid Email / Password" });

    let isMatch = await bcrypt.compare(userData.password, foundedUser.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid Email / Password" });

    return res.status(200).json({ message: "Logged-In Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateUserById = async (req, res) => {
  const user_id = req.params.id;
  if (UserValid(req.body)) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(user_id, req.body, {
        new: true,
      });
      if (updatedUser) {
        return res
          .status(200)
          .json({ message: "Updated Successfully", data: updatedUser });
      } else {
        return res.status(404).json({ error: "User Not Found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({
      error: "Invalid Input Data",
    });
  }
};

const DeleteUserById = async (req, res) => {
  const user_id = req.params.id;
  try {
    await UserModel.findByIdAndDelete(user_id);
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  GetAllUsers,
  GetUserByID,
  Register,
  Login,
  UpdateUserById,
  DeleteUserById,
};
