import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [listRole, setListRole] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')
    const getListRole = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user/roles`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setListRole(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getListRole()
    }, [])


    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8000/api/user/signup`, {
                "username" : username,
                "email" : email,
                "password" : password,
                "role_id" : role
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(response.data);
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className='h-[100vh] flex justify-center items-center bg-gray-100'>
                <div className='w-[400px] p-5 border-2 rounded-xl bg-white flex flex-col justify-center'>
                    <h4 className='self-center text-2xl font-semibold'>Register Your New Account </h4>
                    <form onSubmit={handleRegister} className='mt-5'>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="Username">Username</label>
                                <input type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='Email'
                                    className='border-2 border-gray-300 rounded-md p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="Email">Email</label>
                                <input type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'
                                    className='border-2 border-gray-300 rounded-md p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="Role">Role</label>
                                <select
                                    defaultValue=""
                                    onChange={(e) => setRole(e.target.value)}
                                    className='border-2 border-gray-300 rounded-md p-2'>
                                    <option value="" selected disabled>Select One Option</option>
                                    {
                                        listRole.map((data, key) =>
                                        (
                                            <option key={data.id} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="Password">Password</label>
                                <input type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password'
                                    className='border-2 border-gray-300 rounded-md p-2' />
                            </div>
                            <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Register</button>
                        </div>
                    </form>

                    <div>
                        <p className='text-sm text-gray-500 mt-5'>Don't have an account? <span className='text-blue-500 cursor-pointer font-semibold'><a href="/signup">Sign Up</a></span>
                        </p>
                    </div>

                    <div>
                        <p className='mt-5 text-sm text-gray-500'>Login as <span className='text-blue-500 cursor-pointer font-semibold'>
                            <a href='/'>Admin</a>
                        </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register