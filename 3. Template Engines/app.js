const express = require('express')
const app = express()

const port = 3000;

// to set the view engine
app.set('view engine', 'hbs')


// template engine route 
app.get("", (req,res) => {
    res.render('index' , {
        currentUser: 'Haider'
    });
})

app.listen(port, () => {
    console.log(`Listening to the port: ${port}`)
})
