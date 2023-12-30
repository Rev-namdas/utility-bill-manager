const { getUserList, updateUserStatusById, adminUserLogin, updateBalanceById } = require('./user.controllers')

const router = require('express').Router()

module.exports = (app) => {
	router.get('/fetch-user-list', getUserList)
	router.patch('/update-user-status-by-id/:id', updateUserStatusById)
	router.post('/admin-user-login', adminUserLogin)
	router.post('/update-user-balance', updateBalanceById)

	return app.use('/api/admin/user', router)
}