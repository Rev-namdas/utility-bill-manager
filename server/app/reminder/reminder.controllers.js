const db = require("../config/dbConfig")
const { catchBlockCodes } = require("../helpers/catchBlockCode")
const { statusCode } = require("../helpers/httpStatusCodes")

const getReminderListByUser = async (req, res) => {
	const { user_id } = req.params
	
	try {
		const result = await db('reminder').select('*').where('user_id', user_id)

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			list: result
		})
	} catch (err) {
		catchBlockCodes(res, err)
	}
}

const updateReminderAction = async (req, res) => {
	const { id } = req.params

	try {
		const data = {
			card_no: null,
			month: null,
			amount: null,
			reminder: null,
			autopay: null,
		}
		const result = await db('reminder').update(data).where('id', id)

		if(result.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Reminder Update Failed'
			})
		}

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			msg: 'Settings Updated'
		})
	} catch (err) {
		catchBlockCodes(res, err)
	}
}

module.exports = {
	getReminderListByUser, updateReminderAction
}