const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const cartControllers = require("../controllers/cartControllers");
const orderControllers = require("../controllers/orderControllers");
//AUTHENTICATION AND AUTHORIZATION

router.route("/signup").post(userControllers.signup);
router.route("/login").post(userControllers.login);

router.route("/cart").post(cartControllers.cart);

router.route("/orders").post(orderControllers.orders);
router.route("/getOrders").get(orderControllers.getAllOrder);

module.exports = router;
