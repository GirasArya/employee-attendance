const db = require('../db')


const getAllAttendance = (req, res) => {
    const sql = `
        SELECT rec.*, e.username, e.email 
        FROM attendance_record AS rec
        JOIN employee AS e ON rec.employee_id = e.id
        ORDER BY rec.date DESC
    `
    db.query(sql, (err, results) => {
        if (err) {
            console.error('SQL Error: ', err)
            return res.status(500).json({ status: false, error: err.message });
        }
        const data = results.map((res) => {
            return {
                ...res,
                photo: res.photo
                    ? `http://localhost:8000/uploads/${res.photo}`
                    : null
            }
        })
        res.status(200).json({ status: true, data });
    })
}

const updateAttendanceStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !id) {
        return res.status(400).json({
            status: false,
            error: "Missing required fields"
        });
    }
    const sql = "UPDATE attendance_record SET status = ?, `timestamp` = NOW() WHERE id = ?";
    db.query(sql, [status, id], (err, results) => {
        if (err) return res.status(500).json({ status: false, error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ status: false, error: "Record not found" });
        res.status(200).json({ status: true, message: "Status updated successfully" });
    });
}

const getAttendanceByEmployeeId = (req, res) => {
    const { employee_id } = req.params;
    const sql = `SELECT * FROM attendance_record WHERE employee_id = ?`;
    db.query(sql, [employee_id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: false, error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: false, error: "Attendance not found" });
        }

        const data = results.map((record) => ({
            ...record,
            photo: record.photo
                ? `http://localhost:8000/uploads/${record.photo}`
                : null
        }));

        res.status(200).json({ status: true, data });
    });
}

const createAttendance = (req, res) => {
    const { employee_id, date, status } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!employee_id || !date || !status || !photo) {
        return res.status(400).json({
            status: false,
            error: "Missing required fields"
        });
    }
    const checkSql = "SELECT * FROM attendance_record WHERE employee_id = ? AND date = ?";
    db.query(checkSql, [employee_id, date], (err, results) => {
        if (err) {
            console.error('SQL Error:', err)
            return res.status(500).json({ status: false, error: err.message });
        }
        if (results.length > 0) {
            return res.status(400).json({ status: false, error: "Already clocked in for this date" });
        }
        const sql = "INSERT INTO attendance_record (employee_id, date, clock_in, status, photo, timestamp) VALUES (?, ?, NOW(), ?, ?, NOW())";
        db.query(sql, [employee_id, date, status, photo], (err, results) => {
            if (err) {
                console.error('SQL Error:', err)
                return res.status(500).json({ status: false, error: err.message });
            }
            res.status(201).json({ status: true, message: "Attendance recorded successfully" });
        });
    })
}

const updateAttendance = (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE attendance_record SET `clock_out` = NOW(), `status` = 'Out For The Day', `timestamp` = NOW() WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: false, error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ status: false, error: "Attendance not found" });
        }
        res.status(200).json({ status: true, message: "Attendance updated successfully" });
    });
}


module.exports = {
    getAllAttendance,
    updateAttendanceStatus,
    getAttendanceByEmployeeId,
    createAttendance,
    updateAttendance
}