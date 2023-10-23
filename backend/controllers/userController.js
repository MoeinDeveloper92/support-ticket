const asyncHandler = require("express-async-handler")
//@Desc     register a new User
//@route    POST/api/users
//@access   Public//we dont need to authenticate the user   
const registerUser = asyncHandler(async (req, res, next) => {
    //destructure the req.body
    const { name, email, password } = req.body
    //run validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please include all the fields.")
    }
    res.send("Regiter Route")
})

//@Desc     Login user to the app
//@route    POST/api/users/login
//@access   public
const loginUser = asyncHandler(async (req, res, next) => {
    res.send("Login user")
})

module.exports = {
    registerUser,
    loginUser
}