import React from 'react'
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "../components/Spinner"
import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoute = () => {
    const { loggedIn, loading } = useAuthStatus()
    if (loading) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to={"/login"} />

}

export default PrivateRoute