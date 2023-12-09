const moment = require("moment/moment")
const db = require("../config/dbConfig")
const { catchBlockCodes } = require("../helpers/catchBlockCode")
const { statusCode } = require("../helpers/httpStatusCodes")
const validateApiFields = require("../helpers/validateApiFields")

const createNewPayment = async (req, res) => {
	const { user_id, bill_type, card_no, 
		month, amount, reminder, autopay } = req.body

	const isValid = validateApiFields({ user_id, bill_type, 
		card_no, month, amount })

	if(!isValid){
		console.log('📌 createNewPayment | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		let data = {
			user_id: parseInt(user_id), 
			bill_type: bill_type.trim(), 
			card_no: card_no.trim(), 
			month: month.trim(), 
			amount: parseInt(amount),
			created_at: moment().unix()
		}
		
		const result = await db('bill_payments').insert(data)

		if(result.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Not Created!'
			})
		}

		const paymentMonth = moment(data.month, 'MMMM').startOf('date').unix()
		const autopayDate = moment.unix(paymentMonth).add(1, 'month').startOf('date').unix()
		const reminderDate = moment.unix(autopayDate).subtract(7, 'days').startOf('date').unix()

		if(autopay){
			data.reminder = reminderDate
			data.autopay  = autopayDate
		} else if(reminder){
			data.reminder = reminderDate
		}

		const org_user_id	= data.user_id
		const org_bill_type = data.bill_type 
		delete data.user_id
		delete data.bill_type
		
		const update = await db('reminder')
							.update(data)
							.where('user_id', org_user_id)
							.andWhere('bill_type', org_bill_type)

		if(update === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Failed! Something went wrong'
			})
		}

		return res.status(statusCode.CREATED)
		.send({
			flag: 'SUCCESS',
			msg: 'Bill paid successfully'
		})
	} catch (err) {
		catchBlockCodes(res, err, 'createNewPayment')
	}
}

const getPaidBillListByUser = async (req, res) => {
	const { user_id, bill_type } = req.params

	const isValid = validateApiFields({ user_id, bill_type })

	if(!isValid){
		console.log('📌 getPaidBillListByUser | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		const result = await db('bill_payments')
						.select('*')
						.where('user_id', user_id)
						.andWhere('bill_type', bill_type)
						.orderBy('id', 'desc')

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			list: result
		})
	} catch (err) {
		catchBlockCodes(res, err, 'getPaidBillListByUser')
	}
}

const getBillList = async (req, res) => {
	try {
		const result = await db('bill_payments')
								.select('bill_payments.*', 'users.username')
								.leftJoin('users', 'bill_payments.user_id', '=', 'users.id')

		return res.status(statusCode.OK)
		.send({
			flag: "SUCCESS",
			list: result
		})
	} catch (err) {
		catchBlockCodes(res, err, 'getBillList')
	}
}

module.exports = {
	createNewPayment, getPaidBillListByUser,
	getBillList
}