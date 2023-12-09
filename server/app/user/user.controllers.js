const db = require("../config/dbConfig")
const { catchBlockCodes } = require("../helpers/catchBlockCode")
const { statusCode } = require("../helpers/httpStatusCodes")
const validateApiFields = require("../helpers/validateApiFields")
const crypto = require('crypto')

const createNewUser = async (req, res) => {
	const { username, password } = req.body

	const isValid = validateApiFields({ username, password })

	if(!isValid){
		console.log('📌 createNewUser | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		const data = {
			username: username.trim().toLowerCase(),
			password: password.trim(),
		}
		
		const user = await db('users').insert(data)

		if(user.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'User Not Created!'
			})
		}

		const result = await db('reminder').insert([
			{ user_id: user[0], bill_type: 'gas' },
			{ user_id: user[0], bill_type: 'electricity' },
			{ user_id: user[0], bill_type: 'water' },
		])

		if(result.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Not Created!'
			})
		}

		return res.status(statusCode.CREATED)
		.send({
			flag: 'SUCCESS',
			msg: 'User registration complete'
		})
	} catch (err) {
		if(err.code === 'ER_DUP_ENTRY'){
			return res.status(statusCode.OK).send({
				flag: "FAIL",
				msg: "Username already exists"
			})
		}
		
		catchBlockCodes(res, err, 'createNewUser')
	}
}

const userLogin = async (req, res) => {
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
		const result = await db('users')
								.select('id', 'status')
								.where('username', username.trim().toLowerCase())
								.where('password', password.trim())

		if(result.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Wrong Credential!'
			})
		}

		if(result.length > 0 && result[0].status){
			return res.status(statusCode.OK)
			.send({
				flag: 'SUCCESS',
				token: crypto.randomUUID(),
				msg: 'Successful',
				id: result[0]?.id
			})
		} else {
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Waiting for admin approval'
			})
		}
	} catch (err) {
		catchBlockCodes(res, err, 'userLogin')
	}
}

const fetchEmailExists = async (req, res) => {
	const { id } = req.params

	const isValid = validateApiFields({ id })

	if(!isValid){
		console.log('📌 fetchEmailExists | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		const result = await db('users').select('email').where('id', id)

		if(result.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'ID Not Exist!'
			})
		}

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			email: result[0]?.email
		})
	} catch (err) {
		catchBlockCodes(res, err, 'fetchEmailExists')
	}
}

const updateUserEmail = async (req, res) => {
	const { id, email } = req.body

	const isValid = validateApiFields({ id, email })

	if(!isValid){
		console.log('📌 updateUserEmail | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		const result = await db('users')
							.update('email', email.trim())
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
			msg: 'Email successfully set'
		})
	} catch (err) {
		catchBlockCodes(res, err, 'updateUserEmail')
	}
}

module.exports = {
	createNewUser, userLogin, fetchEmailExists,
	updateUserEmail
}