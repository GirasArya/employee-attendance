import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Attendance from './pages/Attendance/Attendance';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
import ManageUser from './User/ManageUser';
function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/attendance-form' element={<Attendance />} />
            <Route path='/manageuser' element={<ManageUser />} />
            <Route path='*' element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
