const db = require('../db')

const getAttendanceByEmployeeId = (req, res) => {
    const { employee_id } = req.params;
    const sql = `SELECT * FROM attendance WHERE employee_id= ${employee_id}`;
    db.query(sql, [employee_id], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err.message
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: false,
                error: "Attendance not found"
            });
        } else {
            res.status(200).json({
                status: true,
                data: results
            });
        }
    });
}

const createAttendance = (req, res) => {
    const { employee_id, date, clock_in, status } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!employee_id || !date || !clock_in || !status) {
        return res.status(400).json({
            status: false,
            error: "Missing required fields"
        });
    }

    try {
        const sql = "INSERT INTO attendance (employee_id, date, clock_in, status, photo, timestamp) VALUES (?, ?, ?, ?, ?, NOW())";
        db.query(sql, [employee_id, date, clock_in, status, photo], (err, results) => {
            if (err) {
                return res.status(500).json({ status: false, error: err.message });
            }
            res.status(201).json({ status: true, message: "Attendance recorded successfully" });
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

const updateAttendance = (req, res) => {
    const { id } = req.params;
    const { clock_out } = req.body;

    if (!clock_out) {
        return res.status(400).json({
            status: false,
            error: "Missing required fields"
        });
    } else {
        try {
            const sql = "UPDATE attendance SET clock_out = ?, status = ?, `timestamp` = NOW() WHERE id = ?";
            db.query(sql, [clock_out, 'Out for the day', id], (err, results) => {
                if (err) {
                    return res.status(500).json({ status: false, error: err.message });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ status: false, error: "Attendance not found" });
                }
                res.status(200).json({ status: true, message: "Attendance updated successfully" });
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    }
}


module.exports = {
    getAttendanceByEmployeeId,
    createAttendance,
    updateAttendance
}