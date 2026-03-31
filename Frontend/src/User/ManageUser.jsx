import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminEmployeeTable from '../components/AdminEmployeeTable'
import { userApi } from '../api/axios'

const ManageUser = () => {
    const [employeeData, setEmployeeData] = useState([])
    const [employeeRole, setEmployeeRole] = useState([])

    const getEmployeeData = async () => {
        try {
            const response = await userApi.get('/admin/get')
            setEmployeeData(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getEmployeeRole = async () => {
        try {
            const response = await userApi.get('/roles')
            setEmployeeRole(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getEmployeeData()
        getEmployeeRole()
    }, [])

    return (
        <div className='h-[100vh] w-full flex justify-center items-center bg-gray-100'>
            <div className='h-[100vh] w-[90rem] flex flex-col justify-center items-center'>
                <AdminSidebar />
                <div id='admin-main-content' className=' w-full h-[100%] flex justify-center items-center mt-5'>
                    <AdminEmployeeTable employeeData={employeeData} employeeRole={employeeRole} refreshData={getEmployeeData} />
                </div>
            </div>
        </div>
    )
}

export default ManageUser