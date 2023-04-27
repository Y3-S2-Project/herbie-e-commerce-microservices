import asyncHandler from "../middleware/async.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

//Create new shopping cart
const createCart = asyncHandler(async (req, res) => {
  const { userId, products } = req.body;
  try {
    // Check if user already has a cart
    const existingCart = await Cart.findOne({ userId: userId });

    if (existingCart) {
      // If user has an existing cart, add new item to the products array
      existingCart.products.push(...products);
      const savedCart = await existingCart.save();
      res.status(201).json(savedCart);
    } else {
      // If user doesn't have a cart, create a new cart and add the item
      const newCart = new Cart({ userId: userId });
      newCart.products.push(...products);
      const cartCount = await Cart.countDocuments();
      newCart.cartId = "CID00" + (parseInt(cartCount) + 1);
      const savedCart = await newCart.save();
      res.status(201).json(savedCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get cart by userId
const getCartByUserId = asyncHandler(async (req, res) => {
  try {
    // Get cart by userId
    const cart = await Cart.findOne({ userId: req.params.userId });
    // check if cart exists
    if (cart) {
      // Get products in the cart
      const products = await Promise.all(
        cart.products.map(async (item) => {
          const product = await Product.findById(item.product);
          return { product, quantity: item.quantity };
        })
      );
      // Return cart and products
      res.status(200).json({ ...cart.toJSON(), products });
    } else {
      // If cart doesn't exist, return error
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    // Return any server error
    res.status(500).json(err);
  }
});

//Update shopping cart
const updateCart = asyncHandler(async (req, res) => {
  try {
    // Get cart by userId
    const cart = await Cart.findOne({ userId: req.params.userId });
    // Check if cart exists
    if (cart) {
      // Get product and quantity from request body
      const { product, quantity } = req.body;
     // Find index of product in cart
      const index = cart.products.findIndex((item) => item.product == product);
      // check if product exists in cart
      if (index >= 0) {
        // If product exists, update the quantity
        cart.products[index].quantity = quantity;
      } else {
        // If product doesn't exist, add the product and quantity to the cart
        cart.products.push({ product: product, quantity: quantity });
      }
      // Save the cart
      const updatedCart = await cart.save();
      // Return the updated cart
      res.status(200).json(updatedCart);
    } else {
      // If cart doesn't exist, return error
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    // Return any server error
    res.status(500).json(err);
  }
});

//Delete shopping cart
const deleteCart = asyncHandler(async (req, res) => {
  try {
    // Find cart by userId and delete
    const cart = await Cart.findOne({ userId: req.params.userId });
    // Check if cart exists
    if (cart) {
      await cart.delete();
      res.status(200).json({ message: "Cart deleted successfully" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete product from shopping cart
const deleteProductFromCart = asyncHandler(async (req, res) => {
  try {
    // Find cart by userId
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      // Filter out the product to be deleted
      cart.products = cart.products.filter(
        (item) => item.product != req.params.productId
      );
      // Save the cart
      const updatedCart = await cart.save();
      // Return the updated cart
      res.status(200).json(updatedCart);
    } else {
      // If cart doesn't exist, return error
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get total price of shopping cart
const getTotalPrice = asyncHandler(async (req, res) => {
  try {
    // Find cart by userId
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate("userId", "name")
      .populate("products.product", "pPrice");
    // Check if cart exists
    if (cart ) {
      let totalPrice = 0;
      cart.products.forEach((item) => {
        if (item.product.pPrice) {
          totalPrice += item.product.pPrice * item.quantity;
        }
      });
      
      // Return the total price
      res.status(200).json({ totalPrice });
    } else {
      // If cart doesn't exist, return error
      res.status(404).json({ message: "Cart not found" });
    }
    // Return any server error
  } catch (err) {
    res.status(500).json(err);
  }
});


//Get the count of products in the cart
const getCartCount = asyncHandler(async (req, res) => {
  try {
    // Find cart by userId
    const cart = await Cart.findOne({ userId: req.params.userId });
    // Check if cart exists
    if (cart) {
      // Get the count of products in the cart
      let count = 0;
      // Loop through the products array and increment count
      cart.products.forEach((item) => {
        count += 1;
      });
      // Return the count
      res.status(200).json({ count });
    } else {
      // If cart doesn't exist, return error
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    // Return any server error
    res.status(500).json(err);
  }
});

module.exports = {
  createCart,
  getCartByUserId,
  updateCart,
  deleteCart,
  deleteProductFromCart,
  getTotalPrice,
  getCartCount,
};
