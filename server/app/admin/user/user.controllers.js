const db = require("../../config/dbConfig")
const { catchBlockCodes } = require("../../helpers/catchBlockCode")
const { statusCode } = require("../../helpers/httpStatusCodes")
const validateApiFields = require("../../helpers/validateApiFields")
const crypto = require('crypto')

const getUserList = async (req, res) => {
	const result = await db('users').select('*')

	return res.status(statusCode.OK)
	.send({
		flag: 'SUCCESS',
		list: result
	})
}

const updateUserStatusById = async (req, res) => {
	const { id }  = req.params

	const isValid = validateApiFields({ id })

	if(!isValid){
		console.log('📌 updateUserStatusById | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		const result = await db('users')
								.update('status', db.raw('!status'))
								.where('id', id)

		if(result === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Not Updated! Something went wrong'
			})
		}

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			msg: 'User status updated'
		})
	} catch (err) {
		catchBlockCodes(res, err, 'updateUserStatusById')
	}
}

const adminUserLogin = async (req, res) => {
	const { username, password } = req.body

	const isValid = validateApiFields({ username, password })

	if(!isValid){
		console.log('📌 userLogin | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		const result = await db('admin_users')
								.select('status')
								.where('username', username.trim().toLowerCase())
								.where('password', password.trim())

		if(result.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Wrong Credential!'
			})
		}

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			token: crypto.randomUUID(),
			msg: 'Successful'
		})
	} catch (err) {
		catchBlockCodes(res, err, 'adminUserLogin')
	}
}

module.exports = {
	getUserList, updateUserStatusById, adminUserLogin
}