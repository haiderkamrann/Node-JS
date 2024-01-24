const router = require("express").Router();
const { User, Image, validate } = require("../models/user");
const bcryptjs = require("bcryptjs");
const multer = require("multer");


router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcryptjs.genSalt(Number(process.env.SALT));
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use unique filenames
  },
});

const upload = multer({ storage: storage });

// Handle image upload
router.post("/upload",upload.single("image") ,async (req, res) => {
  try {
    const newImage = new Image({
      filename: req.file.filename,
    });
    await newImage.save();

    res.json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve all images from MongoDB
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;