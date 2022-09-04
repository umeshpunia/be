const express = require("express");
const ProSchema = require("../models/product.model");

const CatSchema = require("../models/category.model");
const OrderSchema = require("../models/order.model");

const router = express.Router();

/* --------------------------- products -------------------------- */

// all products
router.get("/product/all", (req, res) => {
  ProSchema.find({}, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (data.length < 1)
      return res.status(200).json({ msg: "No Product Found" });
    res.status(200).json({ msg: data });
  });
});

// single product
router.get("/product/:_id", (req, res) => {
  const { _id } = req.params;
  ProSchema.findOne({ _id }, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (!data) return res.status(404).json({ msg: "No Product Found" });
    res.status(200).json({ msg: data });
  });
});

// product by category
router.get("/product/category/:category", (req, res) => {
  const { category } = req.params;

  ProSchema.find({ category }, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (data.length < 1)
      return res.status(200).json({ msg: "No Product Found" });
    res.status(200).json({ msg: data });
  });
});

// all category

router.get("/category/all", (req, res) => {
  CatSchema.find({}, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (data.length < 1)
      return res.status(200).json({ msg: "No Category Found" });
    res.status(200).json({ msg: data });
  });
});

// single category
router.get("/category/:_id", (req, res) => {
  const { _id } = req.params;
  CatSchema.findOne({ _id }, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (!data) return res.status(404).json({ msg: "No Category Found" });
    res.status(200).json({ msg: data });
  });
});

// place order
router.post("/place-order", (req, res) => {
  const { email, pid, quantity, price, orderId } = req.body;

  OrderSchema({ email, pid, quantity, price, orderId }).save((err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (!data) return res.status(404).json({ msg: "SOmething Wrong" });
    res.status(200).json({ msg: "Congratulations" });
  });
});

module.exports = router;
