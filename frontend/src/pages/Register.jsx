import { useState } from 'react'
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"


const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const { name, email, password, password2 } = formData


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
        }
        console.log(formData)
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