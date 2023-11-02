//This Node.js code is designed to work with the Express framework to handle POST requests and calculate the required number of bricks for a wall based on its width, height, brick width, and brick length.
// NOTE: This code has been successfully tested on Postman to ensure its functionality

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/calculate-bricks', (req, res) => {
  const { wallWidth, wallHeight, brickWidth, brickLength } = req.body;
  const bricksRequired = (wallWidth * wallHeight) / (brickWidth * brickLength);
  res.send({ bricksRequired });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
