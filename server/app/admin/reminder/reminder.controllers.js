const db = require("../../config/dbConfig")
const { catchBlockCodes } = require("../../helpers/catchBlockCode")
const { statusCode } = require("../../helpers/httpStatusCodes")
const validateApiFields = require("../../helpers/validateApiFields")
const moment = require('moment')
const nodemailer = require('nodemailer')

const checkUserReminders = async (req, res) => {
	const { id } = req.params

	const isValid = validateApiFields({ id })

	if(!isValid){
		console.log('📌 checkUserReminders | Api Field(s) Errors')
		return res.status(statusCode.BAD_REQUEST)
		.send({
			flag: 'FAIL',
			msg: "Api Field(s) Errors"
		})
	}

	try {
		const today = moment().startOf('date').unix()
		let result = await db('reminder')
								.select('reminder.*', 'users.email')
								.leftJoin('users', 'reminder.user_id', '=', 'users.id')
								.whereNotNull('reminder.card_no')
								.andWhere('reminder.user_id', id)
								
		if(result.length === 0){
			return res.status(statusCode.OK)
			.send({
				flag: 'FAIL',
				msg: 'Cannot proceed!'
			})
		}

		
		for(let each of result){
			if(each.autopay && today === each.autopay){
				const paymentMonth = moment(each.month, 'MMMM').add(1, 'month').format('MMMM')
				
				await db('bill_payments').insert({
					user_id: each.user_id,
					bill_type: each.bill_type,
					card_no: each.card_no,
					month: paymentMonth,
					amount: each.amount,
					created_at: moment().unix()
				})

				// Create a transporter using the default SMTP transport
				const transporter = nodemailer.createTransport({
					host: 'mail.mskhantrading.com',
					port: 465,
					secure: true,
					auth: {
						user: 'utilitybill@mskhantrading.com',
						pass: 'Wx9UY&R-5zdT',
					},
				});

				try {
					const today = moment(paymentMonth, 'MMMM').startOf('date').unix()
					const autopayDate = moment.unix(today).add(1, 'month').startOf('date').unix()
					const reminderDate = moment.unix(autopayDate).subtract(7, 'days').startOf('date').unix()

					await db('reminder')
							.where({ id: each.id})
							.update({ 
								month: paymentMonth,
								reminder: reminderDate,
								autopay: autopayDate,
								created_at: moment().unix()	
							})
				} catch (err) {
					catchBlockCodes(res, err, 'sendEmail')
				}
				
				// Define the email data
				const mailOptions = {
					from: `Utility Bill Manager <${'utilitybill@mskhantrading.com'}>`,
					to: each.email,
					subject: 'Utility Bill Manager',
					html: `
					<h3><strong>Welcome to Utility Bill Manager</strong></h3>
					<p>Your monthly ${each.bill_type} bill ${paymentMonth} (${each.amount} TK) paid!</p>
					`
				};
			
				// Send the email
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						catchBlockCodes(res, error, 'sendEmail')
					}

					console.log('Email sent:', info.response);
				});
			} else if(each.reminder && today === each.reminder){
				const paymentMonth = moment(each.month, 'MMMM').add(1, 'month').format('MMMM')
				
				// Create a transporter using the default SMTP transport
				const transporter = nodemailer.createTransport({
					host: 'mail.mskhantrading.com',
					port: 465,
					secure: true,
					auth: {
						user: 'utilitybill@mskhantrading.com',
						pass: 'Wx9UY&R-5zdT',
					},
				});

				try {
					const today = moment(paymentMonth, 'MMMM').startOf('date').unix()
					const autopayDate = moment.unix(today).add(1, 'month').startOf('date').unix()
					const reminderDate = moment.unix(autopayDate).subtract(7, 'days').startOf('date').unix()

					await db('reminder')
							.where({ id: each.id})
							.update({ 
								month: paymentMonth,
								reminder: reminderDate,
								created_at: moment().unix()	
							})
				} catch (err) {
					catchBlockCodes(res, err, 'sendEmail')
				}
				
				// Define the email data
				const mailOptions = {
					from: `Utility Bill Manager <${'utilitybill@mskhantrading.com'}>`,
					to: each.email,
					subject: 'Utility Bill Manager',
					html: `
					<h3><strong>Welcome to Utility Bill Manager</strong></h3>
					<p>Your monthly ${each.bill_type} bill ${paymentMonth} (${each.amount} TK) is due!</p>
					`
				};
			
				// Send the email
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						catchBlockCodes(res, error, 'checkUserReminders')
					}

					console.log('Email sent:', info.response);
				});
			}
		}

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			list: result
		})
	} catch (err) {
		catchBlockCodes(res, err, 'checkUserReminders')
	}
}

const getReminderList = async (req, res) => {
	try {
		const result = await db('reminder')
								.select('reminder.*', 'users.username')
								.leftJoin('users', 'reminder.user_id', '=', 'users.id')

		return res.status(statusCode.OK)
		.send({
			flag: 'SUCCESS',
			list: result
		})
	} catch (err) {
		catchBlockCodes(res, err, 'getReminderList')
	}
} 

module.exports = {
	checkUserReminders, getReminderList
}