import { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { reset, register } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const { name, email, password, password2 } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            //if it is susccessul we want to re-direct
            navigate("/")
        }

        //here we dispatch the reset to get aout of the useEffect
        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error("Passwords do not match.")
        } else {
            //we bundle the data
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }


    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser />Register
                </h1>
                <p>Please Create an Account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id='name'
                            value={name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password2'
                            value={password2}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register