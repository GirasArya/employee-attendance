const express = require('express');
const router = express.Router()
const { getAttendanceByEmployeeId, createAttendance, updateAttendance, getAllAttendance, updateAttendanceStatus } = require('../controllers/attendanceController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadFileMiddleware');

router.get('/admin/get', authenticateToken, isAdmin, getAllAttendance)
router.put('/admin/update/:id', authenticateToken, isAdmin, updateAttendanceStatus)

router.get('/get/:employee_id', authenticateToken, getAttendanceByEmployeeId)
router.post('/create', authenticateToken, upload.single('photo'), createAttendance,)
router.put('/update/:id', authenticateToken, updateAttendance)


module.exports = router