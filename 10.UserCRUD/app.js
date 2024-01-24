const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
app.use(cors()); 
app.use(bodyParser.json());
let userData = [];
let id = 1; 

app.post("/post-user", (req, res) => {
  const user = { id: id++, ...req.body };
  userData.push(user);
  res.status(201).json(user); 
});

app.get("/getUsers", (req, res) => {
  res.status(200).json(userData);
});

app.put("/updateUsers/:id", (req, res) => {
  const updateData = parseInt(req.params.id);
  const index = userData.findIndex((user) => user.id === updateData);
  if (index !== -1) {
    userData[index] = { ...userData[index], ...req.body };
    res.status(200).json(userData[index]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.delete("/deleteUsers/:id", (req, res) => {
  const userToDelete = parseInt(req.params.id);
  const index = userData.findIndex((user) => user.id === userToDelete);
  if (index !== -1) {
    const deletedUser = userData.splice(index, 1);
    res.status(200).json(deletedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
})