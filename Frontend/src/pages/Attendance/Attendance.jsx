import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenValid } from '../../utils/auth'
import { attendanceApi } from '../../api/axios'
import { useToast } from '@chakra-ui/react'

const Attendance = () => {
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [attendanceRecord, setAttendanceRecord] = useState([])
    const [date, setDate] = useState('')
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const toast = useToast()
    const [recordBood, setRecordBool] = useState(false)

    const getRecordByEmployeeData = async (id) => {
        try {
            const response = await attendanceApi.get(`/get/${id}`)
            const allRecords = response.data.data
            const presentRecords = allRecords.filter(record => record.status === "Present")
            setAttendanceRecord(presentRecords)
            setRecordBool(presentRecords.length > 0)
        } catch (error) {
            console.error(error)
        }
    }

    const handleClockIn = async (e) => {
        e.preventDefault()
        try {
            const formdata = new FormData()
            formdata.append('employee_id', user?.id)
            formdata.append('date', date)
            formdata.append('status', "Present")
            formdata.append('photo', file)
            const response = await attendanceApi.post(`/create`, formdata)
            if (response.data.status) {
                toast({
                    title: 'Clock in successful!',
                    status: 'success',
                    position: 'bottom-right',
                    variant: 'top-accent',
                    duration: 3000,
                    isClosable: true,
                })
                getRecordByEmployeeData(user?.id)
            }
        } catch (error) {
            alert(error.response?.data.error)
            console.error(error.response?.data)
        }
    }

    const handleClockOut = async () => {
        try {
            const recordId = attendanceRecord[attendanceRecord.length - 1]?.id
            if (!recordId) {
                alert('No attendance record found')
                return
            }

            const response = await attendanceApi.put(`/update/${recordId}`)
            if (response.data.status) {
                setRecordBool(false)
                toast({
                    title: 'Clock out successful!',
                    status: 'success',
                    position: 'bottom-right',
                    variant: 'top-accent',
                    duration: 3000,
                    isClosable: true,
                })
                navigate('/login')
            }
        } catch (error) {
            console.error(error.response?.data)
        }
    }

    useEffect(() => {
        if (!isTokenValid()) {
            navigate('/login')
            return
        }

        const sessionUser = JSON.parse(localStorage.getItem('user'))
        setUser(sessionUser)
        setName(sessionUser?.username)
        getRecordByEmployeeData(sessionUser?.id)

    }, [])

    console.log(attendanceRecord)
    return (
        <div className='h-[100vh] flex justify-center items-center bg-gray-100'>
            {
                recordBood ? (
                    <div className='w-[700px] p-5 border-2 rounded-xl bg-white flex flex-col justify-center'>
                        <h4 className='self-center text-center text-2xl font-semibold'>Confirm Your Attendance</h4>
                        {
                            attendanceRecord.map((record, key) => (
                                <div className='flex flex-col gap-5'>
                                    <div key={record.id} className='mt-5 flex flex-col items-center'>
                                        <p className='text-center  text-xl font-bold'>You have already clocked in for today.</p>
                                        <p className='text-center text-gray-500 font-semibold'>Clock-in Time: {new Date(record.clock_in).toLocaleTimeString()}</p>
                                        <p className='text-center text-gray-500 font-semibold'>Working time :
                                            {
                                                record.clock_in
                                                    ? (() => {
                                                        const clockIn = new Date(record.clock_in)
                                                        const now = new Date()
                                                        const diff = now - clockIn
                                                        const hours = Math.floor(diff / 3600000)
                                                        const minutes = Math.floor((diff % 3600000) / 60000)
                                                        const seconds = Math.floor((diff % 60000) / 1000)
                                                        return ` ${hours}h ${minutes}m ${seconds}s`
                                                    })()
                                                    : 'N/A'
                                            }
                                        </p>
                                        <img src={record.photo} alt="Attendance Photo" className='w-[80%] self-center h-auto mt-3 rounded-md' />
                                    </div>

                                    <button onClick={handleClockOut} className='bg-red-500 text-white rounded-md p-2'>Clock Out</button>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleClockIn} method="post" className='w-[400px] p-5 border-2 rounded-xl bg-white flex flex-col justify-center'>
                            <h4 className='self-center text-2xl font-semibold'>Confirm Your Attendance</h4>
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="Name">Name</label>
                                    <input type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        placeholder='Name'
                                        required
                                        className='border-2 border-gray-300 rounded-md p-2' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="Date">Date</label>
                                    <input type="date"
                                        onChange={(e) => setDate(e.target.value)}
                                        placeholder='Date'
                                        required
                                        className='border-2 border-gray-300 rounded-md p-2' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="Photo">Upload Photo</label>
                                    <input type="file"
                                        accept='.jpg, .png, .jpeg'
                                        onChange={(e) => setFile(e.target.files[0])}
                                        placeholder='File'
                                        required
                                        className='border-2 border-gray-300 rounded-md p-2' />
                                </div>
                                <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Submit</button>
                            </div>
                        </form>
                    </>
                )
            }
        </div>
    )
}

export default Attendance
