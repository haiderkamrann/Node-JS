// server.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(cors())

app.use('/uploads', express.static('uploads'));


// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://127.0.0.1:27017/imageUploadDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The folder where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use unique filenames
  },
});

const upload = multer({ storage: storage });

// Define a schema for the MongoDB collection
const imageSchema = new mongoose.Schema({
  filename: String,
});

const Image = mongoose.model('Image', imageSchema);

// Handle image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Save image details to MongoDB
    const newImage = new Image({
      filename: req.file.filename,
    });
    await newImage.save();

    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve all images from MongoDB
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
