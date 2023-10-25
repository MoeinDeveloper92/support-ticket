import { useEffect, useState } from 'react'
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { reset, login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
const Login = () => {
    const [formData, setFormData] = useState({

        email: "",
        password: "",

    })

    const { email, password } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, dispatch, navigate])
    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt />Login
                </h1>
                <p>Please Login to get Support</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>

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
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login