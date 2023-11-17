const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 3000;
let userData = [];
let id = 1;

app.post("/user-data", (req, res) => {
  const uniqueUserId = id++;
  const user = { id: uniqueUserId, ...req.body };
  userData.push(user);
  res.status(200).json(user);
});

app.get("/getUsers", (req, res) => {
  res.status(200).json(userData);
});

app.patch("/update-data", (req, res) => {
  const updateData = req.query.id;
  const index = userData.findIndex((user) => user.id == updateData);

  if (index !== -1) {
    userData[index] = { ...userData[index], ...req.body.user };
    res.status(200).json(userData[index]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.delete("/delete-user", (req, res) => {
  const userToDelete = req.query.id;
  const index = userData.findIndex((user) => user.id == userToDelete);
  
  if (index !== -1) {
    const deletedUser = userData.splice(index, 1);
    res.status(200).json( deletedUser );
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is ruuning on port : ${port}`);
});

