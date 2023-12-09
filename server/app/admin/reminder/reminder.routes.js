const { checkUserReminders, getReminderList } = require('./reminder.controllers')

const router = require('express').Router()

module.exports = (app) => {
	router.get('/fetch-user-notification/:id', checkUserReminders)
	router.get('/fetch-reminder-list', getReminderList)

	return app.use('/api/reminder', router)
}