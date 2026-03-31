import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenValid } from '../utils/auth';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Badge,
    Button
} from '@chakra-ui/react'
import { FaExternalLinkAlt } from "react-icons/fa";
const AdminAttendanceTable = (attendanceData) => {
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

    const handleBadge = (status) => {
        switch (status) {
            case "Present":
                return (
                    <Badge variant='solid' colorScheme='green'>Present</Badge>
                )
                break;
            case "Out for the day":
                return (
                    <Badge variant='solid' colorScheme='yellow'>Out for the day</Badge>
                )
            default:
                return (
                    <Badge variant='solid' colorScheme='red'>Absent</Badge>
                )
                break;
        }
    }

    const handleWorkingTime = (In, Out) => {
        const clockIn = new Date(In)
        const clockOut = Out ? new Date(Out) : new Date()
        const diff = clockOut - clockIn
        const hours = Math.floor(diff / 3600000)
        const minutes = Math.floor((diff % 3600000) / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        return `${hours}h ${minutes}m ${seconds}s`
    }

    return (
        <div className='w-full h-[80%]'>
            <div>
                <h1 className='text-2xl font-bold mb-8'>Employee Attendance Record</h1>
            </div>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Employee Name</Th>
                            <Th>Date (DD-MM-YYYY)</Th>
                            <Th>Clock In</Th>
                            <Th>Clock Out</Th>
                            <Th>Status</Th>
                            <Th>Photo</Th>
                            <Th>Work Time</Th>
                            <Th>Timestamp</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {attendanceData.attendanceData.map((record) => (
                            <Tr key={record.id}>
                                <Td>{record.username}</Td>
                                <Td>{new Date(record.date).toLocaleDateString('en-GB')}</Td>
                                <Td>{record.clock_in ? new Date(record.clock_in).toLocaleTimeString() : "N/A"}</Td>
                                <Td>{record.clock_out ? new Date(record.clock_out).toLocaleTimeString() : "N/A"}</Td>
                                <Td>{handleBadge(record.status)}</Td>
                                <Td>
                                    <a href={record.photo} className='flex items-center gap-2 text-blue-500 underline' target='_blank'>
                                        Link
                                        <FaExternalLinkAlt />
                                    </a>
                                </Td>
                                <Td>{handleWorkingTime(record.clock_in, record.clock_out)}</Td>
                                <Td>{new Date(record.timestamp).toLocaleString('en-GB')}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AdminAttendanceTable