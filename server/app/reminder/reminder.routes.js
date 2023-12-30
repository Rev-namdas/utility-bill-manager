const { getReminderListByUser, updateReminderAction } = require('./reminder.controllers')

const router = require('express').Router()

module.exports = (app) => {
	router.get('/fetch-user-reminder-list/:user_id', getReminderListByUser)
	router.post('/update-reminder-action/:id', updateReminderAction)

	return app.use('/api/reminder', router)
}