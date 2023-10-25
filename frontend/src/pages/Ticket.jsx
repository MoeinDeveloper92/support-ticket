import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTicket, closeTicket } from "../features/ticket/ticketSlice"
import { getNotes, reset as noteReset } from "../features/notes/noteSlice"
import BackButton from "../components/BackButton"
import { useParams, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import NoteItem from "../components/NoteItem"

const Ticket = () => {

    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.ticket)
    const { notes, isLoading: notesIsLoading } = useSelector((state) => state.note)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const params = useParams()
    const { ticketId } = params

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))

        //get notes
        dispatch(getNotes(ticketId))
        //if we add dispatch as deendcy we will get stcuk in constant loop
        //eslint-disable-next-line
    }, [isError, message, ticketId])


    if (isLoading || notesIsLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>Something went worng</h3>
    }

    //Close Ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticket._id))
        toast.success("Ticket Closed")
        navigate("/tickets")
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url={"/tickets"} />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}

            {ticket.status !== 'closed' && (
                <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket