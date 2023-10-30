const express = require('express')
const path = require('path')
const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/signup', function (req, res) {
  res.render('index')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

