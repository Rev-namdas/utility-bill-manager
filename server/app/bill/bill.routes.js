const { createNewPayment, getPaidBillListByUser, getBillList } = require('./bill.controllers')

const router = require('express').Router()

module.exports = (app) => {
	router.post('/create-payment', createNewPayment)
	router.get('/fetch-user-bill-list/:user_id/:bill_type', getPaidBillListByUser)
	router.get('/fetch-bill-list', getBillList)

	return app.use('/api/bill', router)
}