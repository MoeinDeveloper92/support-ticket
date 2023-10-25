const asyncHandler = require("express-async-handler")
const Ticket = require("../models/tickeModel")
const User = require("../models/userModel")



//@desc     Create Ticket
//@route    POST /api/tickets
//@access   private
const createTicket = asyncHandler(async (req, res, next) => {
    const { product, description } = req.body
    if (!product || !description) {
        res.status(400)
        throw new Error("Please add description and product.")
    }

    //check for the user
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const newTicket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: "new"
    })

    if (newTicket) {
        res.status(201).json(newTicket)
    }
})



//@desc     Get all the user's ticket
//@route    GET /api/tickets/
//@access   Private
const getTickets = asyncHandler(async (req, res, next) => {
    //get the user that we want the ticket by its JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not Found!")
    }

    const tickets = await Ticket.find({ user: req.user.id })

    if (tickets) {
        res.status(200).json(tickets)
    }
})

//@desc     Get single ticket
//@route    GET /api/tickets/:id
//@access   Private
const getTicket = asyncHandler(async (req, res, next) => {
    const ticketId = req.params.id
    //check for the user
    const userExist = await User.findById(req.user.id)
    if (!userExist) {
        res.status(401)
        throw new Error("User not found")
    }
    //check for the ticket
    const ticket = await Ticket.findById(ticketId)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    //we dont want anybody except the owner of ticket , get the ticket
    if (req.user.id !== ticket.user.toString()) {
        res.status(401)
        throw new Error("Invalid Credentials")
    }

    res.status(200).json(ticket)
})

//@desc     Delete ticket
//@route    DELETE /api/tickets/delete
//@access   private
const deleteTicket = asyncHandler(async (req, res, next) => {
    //get the user using the id in the jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    //get the ticket
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    await Ticket.findByIdAndRemove(req.params.id)
    res.status(200).json({
        success: true
    })
})


//@desc     Update ticket
//@route    PUT /api/tickets/:id
//@access   Private
const updateTicket = asyncHandler(async (req, res, next) => {
    //check for the user
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    //check for the ticket
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)
})


module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
}