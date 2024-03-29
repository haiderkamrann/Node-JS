require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors")
const connection = require("./db")
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

//database connection
connection();

//middleware
app.use(express.json())
app.use(cors())

app.use("/uploads", express.static("uploads"));

//routes

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

const port = 5713;
app.listen(port, () => console.log(`Listening on port ${port}`))