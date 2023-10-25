const express = require("express")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const colors = require("colors")
const PORT = process.env.PORT || 5000


const connectDB = require("./config/db")
//Connect to DB
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))
app.use(errorHandler)

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Welcome to Support Desk API."
    })
})


app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})