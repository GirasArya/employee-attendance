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
    Button,
    Select,
    IconButton
} from '@chakra-ui/react'
import { MdDelete, MdAdd, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TfiCheck } from "react-icons/tfi";
import { userApi } from '../api/axios';
const AdminEmployeeTable = ({ employeeData, employeeRole, refreshData }) => {
    const [user, setUser] = useState(null)
    const [editRole, setEditRole] = useState(null)
    const [userToUpdate, setUserToUpdate] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const sessionUser = localStorage.getItem('user')

        if (!isTokenValid()) {
            navigate('/login')
            return
        }

        setUser(JSON.parse(sessionUser))
    }, [])

    const handleChangeRole = (e, user) => {
        setEditRole(e.target.value)
        setUserToUpdate(user)
    }

    const handleUpdateRole = async () => {
        try {
            const response = await userApi.put(`/admin/update/${userToUpdate.id}`, {
                role_id: editRole
            })
            alert(response.data.message)
            refreshData()
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await userApi.delete(`/admin/delete/${id}`)
            alert(response.data.message)
            refreshData()
        } catch (error) {
            console.error(error)
        }
    }

    console.log(employeeData)
    return (
        <div className='w-full h-[80%]'>
            <div className='w-full flex items-center justify-between mb-8'>
                <h1 className='text-2xl font-bold  text-'>Employee Database Record</h1>

                <a href="/signup">
                    <Button
                        variant={'solid'}
                        rightIcon={<MdAdd />}
                        colorScheme='blue'
                    >
                        Add Employee
                    </Button>
                </a>
            </div>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Employee Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {employeeData?.map((record) => (
                            <>
                                <Tr key={record.id}>
                                    <Td>{record.username}</Td>
                                    <Td>{record.email}</Td>
                                    <Td>
                                        <Select
                                            onChange={(e) => handleChangeRole(e, record)}
                                            placeholder='Select option'
                                            size='sm'
                                            w={'50%'}
                                            disabled={record.role_id === 1}
                                            bg={'gray.200'}
                                            defaultValue={record.role_id}
                                            icon={<MdOutlineKeyboardArrowDown />}
                                        >
                                            {employeeRole.map((data) => (
                                                <option key={data.id} value={data.id} selected={data.id === record.role_id}>
                                                    {data.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </Td>
                                    <Td>
                                        {record.role_id !== 1 && (
                                            <div className='flex items-center gap-2'>
                                                <IconButton onClick={handleUpdateRole} icon={<TfiCheck />} />
                                                <IconButton onClick={() => handleDelete(record.id)} icon={<MdDelete />} />
                                            </div>
                                        )}
                                    </Td>
                                   
                                </Tr>
                            </>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AdminEmployeeTable