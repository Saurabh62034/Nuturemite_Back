const User = require("../models/userModel");
const { genToken } = require("../utils/auth.token");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Incomplete Details",
      });
    }
    const newUser = await User.create({
      email: email,
      username: username,
      password: password,
    });
    newUser.save();

    const token = genToken(newUser._id, username);

    return res.status(200).json({
      status: "success",
      token,
      data: newUser,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "fail",
      message: "Internal server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Incomplete Information",
      });
    }

    const user = await User.findOne({ username });

    const correct = await bcrypt.compare(password, user.password);

    if (!correct) {
      return res.status(401).json({
        status: "fail",
        message: "incorrect password",
      });
    }

    const token = genToken(user._id, username);

    return res.status(200).json({
      status: "success",
      message: "successfully logged in",
      token,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Internal server Error",
    });
  }
};
