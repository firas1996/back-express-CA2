const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const createToken = (id, name) => {
  return jwt.sign({ id, name, test: "hello" }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

exports.protectorMW = async (req, res, next) => {
  try {
    let token;
    // 1) bech t'thabat ken el user 3andou token ou bien non !
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({
        message: "You are not logged in !!!",
      });
    }
    // 2) nthabat si el token valid or not !!!!
    const verified = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    console.log(verified);
    // 3) thabat ken moula el token mizel mawjoud wala tfasa5 !!!
    const theUser = await User.findById(verified.id);
    if (!theUser) {
      res.status(404).json({
        message: "User no longer exist !!!",
      });
    }
    // 4) thabat si el token tsan3et 9bal wala ba3d e5er password update !!!
    next();
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

// Create a user

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, confirm_pass, role } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      confirm_pass,
      // role: role === "admin" ? "user" : role,
    });
    res.status(201).json({
      message: "User Created !!!",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required !!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "User does not exist !!!",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400).json({
        message: "Incorrect Password !!!",
      });
    }

    const token = createToken(user._id, user.name);

    res.status(200).json({
      message: "Logged in !!!!",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

// Get all the users in our DB

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users Fetched !!!",
      nbr: users.length,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.getUserbyId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "User Fetched !!!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const Newuser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "User Updated !!!",
      data: Newuser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(203).json({
      message: "User Deleted !!!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};
