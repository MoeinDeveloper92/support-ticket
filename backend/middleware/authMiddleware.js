const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")


const protect = asyncHandler(async (req, res, next) => {
    let token;
    //we need t first check iof the jwt is set
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            //GEt token from Header
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            //call the next piece of middleware
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized.")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("No Token, Not Authorized")
    }
})

module.exports = protect