import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Attendance from './pages/Attendance/Attendance';
import Dashboard from './pages/Dashboard/Dashboard';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/attendance-form' element={<Attendance />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
