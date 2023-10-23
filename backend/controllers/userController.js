const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateToken = require("../auth/generateToken")


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
    //Find if user  already Exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        //Bad Request
        res.status(400)
        throw new Error("User Already Exist!")
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})


//@Desc     Login user to the app
//@route    POST/api/users/login
//@access   public
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    //when we hekc for the user, we need to check for the password  
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        //UnAuthorized access
        res.status(401)
        throw new Error("Invalid Credentials")
    }
})


//@desc     Get current user
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res, next) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})


module.exports = {
    registerUser,
    loginUser,
    getMe
}