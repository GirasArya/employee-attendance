const { getRoles, signUp, getAllEmployee, getEmployeeById, deleteEmployee } = require('../controllers/userController');
const express = require('express');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router()

router.get('/employee', authenticateToken, getAllEmployee)
router.get('/employee/:id', authenticateToken, getEmployeeById)
router.get('/roles', getRoles)
router.post('/signup', signUp)
router.delete('/employee/delete/:id', authenticateToken, deleteEmployee, isAdmin)

module.exports = router

