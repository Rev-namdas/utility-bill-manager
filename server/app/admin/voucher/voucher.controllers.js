const db = require("../../config/dbConfig")
const { catchBlockCodes } = require("../../helpers/catchBlockCode")
const { statusCode } = require("../../helpers/httpStatusCodes")
const validateApiFields = require("../../helpers/validateApiFields")

const createNewVoucher = async (req, res) => {
	const { voucher, amount } = req.body

	const isValid = validateApiFields({ voucher, amount })

	if(!isValid){
		console.log('📌 createNewVoucher | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		const data = {
			voucher: voucher.trim().toLowerCase(),
			amount: parseInt(amount)
		}
		const result = await db('vouchers').insert(data)

		if(result.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: "Failed !"
			})
		}

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			msg: 'Voucher Created Successfully'
		})
	} catch (err) {
		catchBlockCodes(res, err)
	}
}

const getVoucherList = async (req, res) => {
	try {
		const result = await db('vouchers').select('*')

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			list: result
		})
	} catch (err) {
		catchBlockCodes(res, err)
	}
}

const updateVoucherStatus = async (req, res) => {
	const { id, status } = req.body

	const isValid = validateApiFields({ id, status })

	if(!isValid){
		console.log('📌 createNewVoucher | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}
	
	try {
		const result = await db('vouchers')
							.update('status', status)
							.where('id', id)

		if(result === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Voucher Not Updated'
			})
		}

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			msg: 'Voucher Updated'
		})
	} catch (err) {
		catchBlockCodes(res, err)
	}
}

const verifyVoucher = async (req, res) => {
	const { voucher } = req.params

	const isValid = validateApiFields({ voucher })

	if(!isValid){
		console.log('📌 createNewVoucher | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		const voucherData = voucher.trim().toLowerCase()
		const result = await db('vouchers')
						.select('amount')
						.where('voucher', voucherData)

		if(result.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Invalid Voucher'
			})
		}

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			msg: 'Voucher Assigned',
			amount: result[0].amount
		})
	} catch (err) {
		catchBlockCodes(res, err)
	}
}

module.exports = {
	createNewVoucher, getVoucherList,
	updateVoucherStatus, verifyVoucher
}