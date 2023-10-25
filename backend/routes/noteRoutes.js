const expres = require("express")
const router = expres.Router({
    mergeParams: true
})
const protect = require("../middleware/authMiddleware")
const { getNotes, addNote } = require("../controllers/noteController")


router.route("/").get(protect, getNotes).post(protect, addNote)


module.exports = router



//as you can see it is the child route, which means can be merged with its route oparent which si ticket
//below is the route that we want to send request
// /api/tickets/:ticketId/notes