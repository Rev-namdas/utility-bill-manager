const { createNewUser, userLogin, fetchEmailExists, updateUserEmail, getUserBalanceByid } = require('./user.controllers')

const router = require('express').Router()

module.exports = (app) => {
	router.post('/create-user', createNewUser)
	router.post('/user-login', userLogin)
	router.get('/check-email-exists/:id', fetchEmailExists)
	router.post('/update-user-email', updateUserEmail)
	router.get('/fetch-user-balance/:user_id', getUserBalanceByid)

	return app.use('/api/user', router)
}