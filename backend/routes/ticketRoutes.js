const express = require("express")
const protect = require("../middleware/authMiddleware")
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require("../controllers/ticketController")
const router = express.Router()

const noteRouter = require("./noteRoutes")

//Re-route into note router
//it means note router wants to use this route
router.use("/:ticketId/notes", noteRouter)

//in order to get all your to tickets tyou should be authenticated
router.route("/").get(protect, getTickets).post(protect, createTicket)
router.route("/:id").get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)



module.exports = router