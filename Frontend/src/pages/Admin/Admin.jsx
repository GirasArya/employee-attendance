import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api/axios'

const Admin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
        const response = await authApi.post(`/login`, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        },)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/');
    } catch (error) {
        console.error(error);
    }
}

  return (
    <div className='h-[100vh] flex justify-center items-center bg-gray-100'>
      <div className='w-[400px] p-5 border-2 rounded-xl bg-white flex flex-col justify-center'>
        <h4 className='self-center text-2xl font-semibold'>Admin Dashboard Login</h4>
        <form onSubmit={handleLogin} method="post" className='mt-5'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="Email">Email</label>
              <input type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='border-2 border-gray-300 rounded-md p-2' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="Password">Password</label>
              <input type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='border-2 border-gray-300 rounded-md p-2' />
            </div>
            <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Login</button>
          </div>
        </form>

        <div>
          <p className='mt-5 text-sm text-gray-500'>Back to  <span className='text-blue-500 cursor-pointer font-semibold'>
            <a href='/login'>attendance</a>
          </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Admin