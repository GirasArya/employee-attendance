const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT


//define routes
const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
const attendanceRoutes = require('./routes/attendanceRoute')


app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/attendance', attendanceRoutes)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

