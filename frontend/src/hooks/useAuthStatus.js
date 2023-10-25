import { useEffect, useState } from "react";
//we need to select the user from the state to see we are logged in or not
import { useSelector } from "react-redux";


export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        setLoading(false)


    }, [user])

    return { loggedIn, loading }
}
