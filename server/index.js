const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./app/config/dbConfig')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(morgan('dev'))

// User Routes
require('./app/user/user.routes')(app)
// Payment Routes
require('./app/bill/bill.routes')(app)

/* Admin Routes */
// User Routes
require('./app/admin/user/user.routes')(app)
// Reminder Routes
require('./app/admin/reminder/reminder.routes')(app)

app.listen(5050, () => {
	console.log('✅ App running on Port: 5050')
	db.raw('Select 1')
		.then(() => {
			console.log('✅ DB Connected')
		})
		.catch((err) => {
			console.log(`❌ DB Not Connected\n${err.message}`)
		})
})