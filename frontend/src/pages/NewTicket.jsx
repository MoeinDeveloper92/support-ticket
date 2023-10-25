import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTicket, reset } from '../features/ticket/ticketSlice'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import BackButton from '../components/BackButton'
const NewTicket = () => {

    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState("iPhone")
    const [description, setDescription] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            dispatch(reset())
            navigate("/tickets")
        }

        dispatch(reset())
    }, [dispatch, navigate, isError, isSuccess, message])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({ product, description }))
    }


    if (isLoading) {
        return <Spinner />
    }

    return <>
        <BackButton url={"/"} />
        <section className="heading">
            <h1>Create New Tciket</h1>
            <p>Please fill out the form below</p>
        </section>

        <section className="form">
            <div className="form-group">
                <label htmlFor="name">Customer Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    disabled
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Customer Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    disabled
                />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <select onChange={(e) => setProduct(e.target.value)} name="product" value={product} id="product">
                        <option value="iPhone">iPhone</option>
                        <option value="Macbook Pro">Macbook Pro</option>
                        <option value="iMac">iMac</option>
                        <option value="iPad">iPad</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                        name="description"
                        id="description"
                        className='form-control'
                    >

                    </textarea>
                </div>
                <div className="form-group">
                    <button className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default NewTicket