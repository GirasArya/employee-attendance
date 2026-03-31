const db = require('../db')
const bcrypt = require('bcrypt');


const getRoles = (req, res) => {
    const sql = "SELECT * FROM role";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err.message
            });
        }
        res.status(200).json({
            status: true,
            data: results
        });
    });
};

const signUp = async (req, res) => {
    try {
        const { username, email, password, role_id } = req.body;

        if (!username || !email || !password || !role_id) {
            return res.status(400).json({
                status: false,
                error: "All fields are required"
            });
        } else if (password.length < 8) {
            return res.status(400).json({
                status: false,
                error: "Password must be at least 8 characters long"
            });
        }

        const checkDuplicateEmailQuery = "SELECT * FROM employee WHERE email = ?";
        db.query(checkDuplicateEmailQuery, [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ status: false, error: err.message });
            }
            if (results.length > 0) {
                return res.status(400).json({ status: false, error: "Email already registered" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = "INSERT INTO employee (username, email, password, role_id) VALUES (?, ?, ?, ?)";
            db.query(sql, [username, email, hashedPassword, parseInt(role_id)], (err, results) => {
                if (err) {
                    return res.status(500).json({ status: false, error: err.message });
                }
                res.status(201).json({ status: true, message: "User registered successfully" });
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const getAllEmployee = (req, res) => {
    const sql = `
        SELECT e.id, e.username, e.email, r.id as role_id, r.name as role
        FROM employee AS e
        JOIN role AS r ON e.role_id = r.id
        ORDER BY e.id ASC
    `
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err.message
            });
        }
        res.status(200).json({
            status: true,
            data: results
        });
    });
}

const getEmployeeById = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM employee WHERE id= ${id}`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err.message
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: false,
                error: "Employee not found"
            });
        } else {
            res.status(200).json({
                status: true,
                data: results
            });
        }
    });
}

const deleteEmployee = (req, res) => {
    const { id } = req.params;

    const checkEmployeeQuery = "SELECT * FROM employee WHERE id = ?";
    db.query(checkEmployeeQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err.message
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: false,
                error: "Employee not found"
            });
        }
        if (results[0].role_id === 1) {
            return res.status(403).json({
                status: false,
                error: "Cannot delete admin employee"
            });
        }

        const sql = `DELETE FROM employee WHERE id= ${id}`;
        db.query(sql, [id], (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err.message
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    status: false,
                    error: "Employee not found"
                });
            }
            res.status(200).json({
                status: true,
                message: "Employee deleted successfully"
            });
        });
    });
}

const updateEmployeeRole = (req, res) => {
    const { id } = req.params;
    const { role_id } = req.body;

    const checkQuery = "SELECT * FROM employee WHERE id = ?";
    db.query(checkQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err.message
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: false,
                error: "Employee not found"
            });
        }
        if (results[0].role_id === 1) {
            return res.status(403).json({
                status: false,
                error: "Cannot update admin employee role"
            });
        }
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        db.query(sql, [role_id, id], (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    error: err.message
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    status: false,
                    error: "Employee not found"
                });
            }
            res.status(200).json({
                status: true,
                message: "Employee role updated successfully"
            })
        })
    })
}

module.exports = {
    getRoles,
    signUp,
    getAllEmployee,
    getEmployeeById,
    deleteEmployee,
    updateEmployeeRole
}