const { createNewPayment, getPaidBillListByUser, getBillList, getBillListByUser, getBillAmountByUser } = require('./bill.controllers')

const router = require('express').Router()

module.exports = (app) => {
	router.post('/create-payment', createNewPayment)
	router.get('/fetch-user-bill-list/:user_id/:bill_type', getPaidBillListByUser)
	router.get('/fetch-bill-list', getBillList)
	router.get('/fetch-bill-list-by-user-id/:user_id', getBillListByUser)
	router.get('/fetch-bill-amount-by-user-id/:user_id', getBillAmountByUser)

	return app.use('/api/bill', router)
}