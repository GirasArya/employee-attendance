import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenValid } from '../../utils/auth'

const Dashboard = () => {
    const [user, setUser] = useState(null)
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
    <div>Dashboard</div>
  )
}

export default Dashboard