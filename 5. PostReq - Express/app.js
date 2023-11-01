const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/process-user", (req, res) => {
  res.send(`Name: ${req.body.name} <br> Email: ${req.body.email}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


