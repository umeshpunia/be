const express = require("express");
const CatSchema = require("../models/category.model");
const multer = require("multer");

const router = express.Router();

// upload file starts
const catPath = "assets/images/category";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, catPath);
  },
  filename: function (req, file, cb) {
    console.log("filename upload", file);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage }).single("picture");

// upload file ends

// add category
router.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(503).json({ msg: "Some Error In File Uploading" });
    } else if (err) {
      return res.status(504).json({ msg: err.message });
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
    const { title, description } = req.body;
    console.log("api", req.file);
    const picture = req.file.filename;

    if (!title || !description)
      return res.status(400).json({ msg: "Please Fill Values" });

    let insCat = new CatSchema({ title, picture, description });

    insCat.save((err, data) => {
      if (err) return res.status(500).json({ msg: err.message });
      if (!data) return res.status(501).json({ msg: "Please Try Again" });
      res.json({ msg: "Successfully Added" });
    });
  });
});

router.get("/", (req, res) => {
  CatSchema.find({}, (err, data) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (data.length < 1)
      return res.status(200).json({ msg: "No Category Found" });
    res.status(200).json({ msg: data });
  });
});

module.exports = router;
