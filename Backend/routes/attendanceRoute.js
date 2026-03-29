const express = require('express');
const router = express.Router()
const { getAttendanceByEmployeeId, createAttendance, updateAttendance } = require('../controllers/attendanceController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadFileMiddleware');

router.get('/attendance/:employee_id', authenticateToken, getAttendanceByEmployeeId)
router.post('/attendance/create', authenticateToken, createAttendance, upload.single('photo'))
router.put('/attendance/update/:id', authenticateToken, updateAttendance)


module.exports = router