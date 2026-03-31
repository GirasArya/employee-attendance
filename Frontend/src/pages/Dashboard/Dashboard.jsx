import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import AdminAttendanceTable from '../../components/AdminAttendanceTable'
import { attendanceApi } from '../../api/axios'
import { Toast } from '@chakra-ui/react'

const Dashboard = () => {
  const [attendanceRecord, setAttendanceRecord] = useState([])

  const getAttendanceRecord = async () => {
    try {
      const response = await attendanceApi.get('/admin/get')
      setAttendanceRecord(response.data.data)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAttendanceRecord()
  }, [])

  return (
    <div className='h-[100vh] w-full flex justify-center items-center bg-gray-100'>
      <div className='h-[100vh] w-[90rem] flex flex-col justify-center items-center'>
        <AdminSidebar />
        <div id='admin-main-content' className=' w-full h-[100%] flex justify-center items-center mt-5'>
          <AdminAttendanceTable attendanceData={attendanceRecord}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard