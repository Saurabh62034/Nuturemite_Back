const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "a valid username is required"],
      unique: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        image: {
          type: Object,
          default:
            "https://images.unsplash.com/photo-1682077354213-6836dcfd91a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamp: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
