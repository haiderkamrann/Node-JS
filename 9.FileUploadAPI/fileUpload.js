const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage }).single("user_file");

app.post("/upload", upload, (req, res) => {
  res.send("File Upload!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

