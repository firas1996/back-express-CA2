const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    console.log("aaaa");
    const newUser = await User.create(req.body);
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
