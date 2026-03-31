import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userApi } from '../../api/axios'
import { useToast } from '@chakra-ui/react'


const Register = () => {
    const navigate = useNavigate()
    const [listRole, setListRole] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')
    const toast = useToast()
    const getListRole = async () => {
        try {
            const response = await userApi.get('/roles', {
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
            const response = await userApi.post('/signup', {
                "username": username,
                "email": email,
                "password": password,
                "role_id": role
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            toast({
                title: 'Register Successful',
                description: response.data.message,
                status: 'success',
                position: 'bottom-right',
                variant: 'top-accent',
                duration: 3000,
                isClosable: true,
            })
            navigate('/')
        } catch (error) {
            console.error(error)
            toast({
                title: 'Register Failed',
                description: error.data?.error,
                status: 'error',
                position: 'bottom-right',
                variant: 'top-accent',
                duration: 3000,
                isClosable: true,
            })
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
                                <label htmlFor="Username">Full Name</label>
                                <input type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder='Email'
                                    className='border-2 border-gray-300 rounded-md p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="Email">Email</label>
                                <input type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder='Email'
                                    className='border-2 border-gray-300 rounded-md p-2' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="Role">Role</label>
                                <select
                                    defaultValue=""
                                    onChange={(e) => setRole(e.target.value)}
                                    required
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
                                    required
                                    placeholder='Password'
                                    className='border-2 border-gray-300 rounded-md p-2' />
                            </div>
                            <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Register</button>
                        </div>
                    </form>

                    <div>
                        <p className='text-sm text-gray-500 mt-5'>Already have an account? <span className='text-blue-500 cursor-pointer font-semibold'><a href="/login">Login</a></span>
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Register