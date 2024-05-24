const jwt = require("jsonwebtoken");
const Cart = require("../models/cartModel");

exports.cart = async (req, res) => {
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
    const cartData = await Cart.findOne({ userId: decoded.id });
    if (!cartData) {
      await Cart.create({
        userId: decoded.id,
        username: decoded.username,
        products: cartProducts,
      });
    } else {
      const newProducts = [...cartData.products, ...cartProducts];
      await Cart.findOneAndUpdate(
        { userId: decoded.id },
        { products: newProducts }
      );
    }
    const data = await Cart.findOne({ userId: decoded.id });
    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      message: "Internal server Error",
    });
  }
};
