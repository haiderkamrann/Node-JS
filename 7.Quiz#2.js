const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.use(bodyParser.json());

app.post('/calculate', function (req, res) {
    const { valueOne, valueTwo, sign } = req.body;
    if (sign === "-") {
      const result = valueOne - valueTwo;
      res.send({ result });
    }
  });

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

