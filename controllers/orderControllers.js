const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");

exports.orders = async (req, res) => {
  try {
    const token = req.headers.token;
    const { cartProducts } = req.body;

    if (!token) {
      return res.status(401).json({
        status: "Fail",
        message: "Unauthorized access",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    const ordersData = await Order.create({
      username: decoded.username,
      userId: decoded.id,
      products: cartProducts,
    });
    return res.status(200).json({
      status: "success",
      ordersData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        status: "Fail",
        message: "Unauthorized access",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    const ordersData = await Order.find({ userId: decoded.id });
    console.log(ordersData);
    return res.status(200).json({
      status: "success",
      ordersData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      message: "Internal server error",
    });
  }
};
