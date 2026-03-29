import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenValid } from '../../utils/auth'

const Attendance = () => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const sessionUser = localStorage.getItem('user')
    
        if (!isTokenValid()) {
            navigate('/login')
            return
        }
    
        setUser(JSON.parse(sessionUser))
    }, [])
    return (
        <div>
            <p>Welcome, {user?.username}</p>
        </div>
    )
}

export default Attendance