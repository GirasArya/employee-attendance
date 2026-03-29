const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../db')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const sql = "SELECT * FROM employee WHERE email = ?";
        db.query(sql, [email], async (err, results) => {
            if (err || results.length === 0) {
                return res.status(401).json({
                    status: false,
                    error: "Invalid email or password"
                });
            }
            const user = results[0];
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({
                    status: false,
                    error: "Invalid email or password"
                });
            } else {
                const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({
                    status: true,
                    message: "Login successful",
                    user: {
                        username: user.username,
                        email: user.email,
                        role_id: user.role_id
                    },
                    token: token
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
}


module.exports = {
    login
}