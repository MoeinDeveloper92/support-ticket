const express = require("express")
const protect = require("../middleware/authMiddleware")
const { registerUser, loginUser, getMe } = require("../controllers/userController")
const router = express.Router()

router.route("/").post(registerUser)
router.route("/login").post(loginUser)
router.route("/me").get(protect, getMe)


module.exports = router