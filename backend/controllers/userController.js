const { validationResult, ExpressValidator } = require("express-validator");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// handle register user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // extract the neccessary values from the body
  const { name, email, password } = req.body;
  const checkUserAlreadyExist = await UserModel.findOne({ email });

  if (checkUserAlreadyExist) {
    return res
      .status(400)
      .json({ message: `An account with ${email} already exist` });
  }

  const newUser = await UserModel.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
};

// handle user login
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const checkUserAlreadyExist = await UserModel.findOne({ email });

  if (!checkUserAlreadyExist) {
    return res
      .status(400)
      .json({ message: `An account with ${email} does not exist` });
  }

  const comparedPassword = await bcrypt.compare(
    password,
    checkUserAlreadyExist.password
  );
  if (!comparedPassword) {
    return res.status(400).json({ mesaage: "Sorry invalid credentials" });
  }

  res.send("This route is for loggin in user");
};

module.exports = {
  registerUser,
  loginUser,
};
