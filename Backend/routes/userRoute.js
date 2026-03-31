const { getRoles, signUp, getAllEmployee, getEmployeeById, deleteEmployee, updateEmployeeRole } = require('../controllers/userController');
const express = require('express');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router()

router.get('/admin/get', authenticateToken, isAdmin, getAllEmployee)
router.get('/admin/get/:id', authenticateToken, isAdmin, getEmployeeById)
router.delete('/admin/delete/:id', authenticateToken, isAdmin, deleteEmployee)
router.put('/admin/update/:id', authenticateToken, isAdmin, updateEmployeeRole) 

router.get('/roles', getRoles)
router.post('/signup', signUp)

module.exports = router

