import React from 'react'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <>
            <section className="heading">
                <h2>What Do you need help with?</h2>
                <p>Please choose from an option below.</p>
            </section>
            <Link to={"/new-ticket"} className='btn btn-reverse btn-block'>
                <FaQuestionCircle />Create New Ticket
            </Link>
            <Link to={"/tickets"} className='btn  btn-block'>
                <FaTicketAlt />View My Tickets
            </Link>
        </>
    )
}

export default Home