const { createNewVoucher, getVoucherList, updateVoucherStatus, verifyVoucher } = require('./voucher.controllers')

const router = require('express').Router()

module.exports = (app) => {
	router.post('/create-new-voucher', createNewVoucher)
	router.get('/fetch-voucher-list', getVoucherList)
	router.post('/update-voucher-status', updateVoucherStatus)
	router.get('/verify-voucher/:voucher', verifyVoucher)

	return app.use('/api/admin/voucher', router)
}