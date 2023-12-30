import axios from 'axios'
import { API_ENDPOINTS } from './apiEndpoints'

const client = axios.create({
	baseURL: 'http://localhost:5050/api'
})

export const userSignUp = async (payload) => {
	try {
		const res = await client.post(API_ENDPOINTS.create_user, payload)
		return res.data
	} catch (err) {
		console.log('userSignUp', err.message)
		return null
	}
}

export const userLogin = async (payload) => {
	try {
		const res = await client.post(API_ENDPOINTS.user_login, payload)
		return res.data
	} catch (err) {
		console.log('userLogin', err.message)
		return null
	}
}

export const fetchUserList = async () => {
	try {
		const res = await client.get(API_ENDPOINTS.fetch_user_list)
		return res.data
	} catch (err) {
		console.log('fetchUserList', err.message)
		return null
	}
}

export const changeUserStatus = async (payload) => {
	try {
		const res = await client.patch(API_ENDPOINTS.update_user_status_by_id + payload)
		return res.data
	} catch (err) {
		console.log('changeUserStatus', err.message)
		return null
	}
}

export const adminUserLogin = async (payload) => {
	try {
		const res = await client.post(API_ENDPOINTS.admin_user_login, payload)
		return res.data
	} catch (err) {
		console.log('adminUserLogin', err.message)
		return null
	}
}

export const checkEmailExists = async (payload) => {
	try {
		const res = await client.get(API_ENDPOINTS.check_email_exists + payload)
		return res.data
	} catch (err) {
		console.log('checkEmailExists', err.message)
		return null
	}
}

export const setUserEmail = async (payload) => {
	try {
		const res = await client.post(API_ENDPOINTS.update_user_email, payload)
		return res.data
	} catch (err) {
		console.log('setUserEmail', err.message)
		return null
	}
}

export const submitPayment = async (payload) => {
	try {
		const res = await client.post(API_ENDPOINTS.submit_payment, payload)
		return res.data
	} catch (err) {
		console.log('submitPayment', err.message)
		return null
	}
}

export const fetchBillListByUser = async (user_id, bill_type) => {
	try {
		const res = await client.get(API_ENDPOINTS.fetch_bill_list_by_user + user_id + '/' + bill_type)
		return res.data
	} catch (err) {
		console.log('fetchBillListByUser', err.message)
		return null
	}
}

export const fetchBillList = async () => {
	try {
		const res = await client.get(API_ENDPOINTS.fetch_bill_list)
		return res.data
	} catch (err) {
		console.log('fetchBillList', err.message)
		return null
	}
}

export const fetchReminderList = async () => {
	try {
		const res = await client.get(API_ENDPOINTS.fetch_reminder_list)
		return res.data
	} catch (err) {
		console.log('fetchReminderList', err.message)
		return null
	}
}

export const fetchNotificationActions = async (payload) => {
	try {
		const res = await client.get(API_ENDPOINTS.check_notification_action + payload)
		return res.data
	} catch (err) {
		console.log('fetchNotificationActions', err.message)
		return null
	}
}

export const updateUserBalance = async (payload) => {
	try {
		const res = await client.post(API_ENDPOINTS.update_user_balance_by_id, payload)
		return res.data
	} catch (err) {
		console.log('updateUserBalance', err.message)
		return null
	}
}

export const fetchUserBalance = async (payload) => {
	try {
		const res = await client.get(API_ENDPOINTS.fetch_user_balance_by_id + payload)
		return res.data
	} catch (err) {
		console.log('fetchUserBalance', err.message)
		return null
	}
}

export const fetchBillListByUserId = async (payload) => {
	try {
		const res = await client.get(API_ENDPOINTS.fetch_bill_list_by_user_id + payload)
		return res.data
	} catch (err) {
		console.log('fetchBillListByUserId', err.message)
		return null
	}
}

export const fetchUserReminderList = async (payload) => {
	try {
		const res = await client.get(API_ENDPOINTS.fetch_user_reminder_list + payload)
		return res.data
	} catch (err) {
		console.log('fetchUserReminderList', err.message)
		return null
	}
}

export const updateReminderAction = async (payload) => {
	try {
		const res = await client.post(API_ENDPOINTS.update_reminder_action + payload)
		return res.data
	} catch (err) {
		console.log('updateReminderAction', err.message)
		return null
	}
}

export const fetchUserBillAmount = async (payload) => {
	try {
		const res = await client.get(API_ENDPOINTS.fetch_user_bill_amount + payload)
		return res.data
	} catch (err) {
		console.log('fetchUserBillAmount', err.message)
		return null
	}
}

export const createNewVoucher = async (payload) => {
	try {
		const res = await client.post(API_ENDPOINTS.create_new_voucher, payload)
		return res.data
	} catch (err) {
		console.log('createNewVoucher', err.message)
		return null
	}
}

export const fetchVoucherList = async () => {
	try {
		const res = await client.get(API_ENDPOINTS.fetch_voucher_list)
		return res.data
	} catch (err) {
		console.log('fetchVoucherList', err.message)
		return null
	}
}

export const changeVoucherStatus = async (payload) => {
	try {
		const res = await client.post(API_ENDPOINTS.change_voucher_status, payload)
		return res.data
	} catch (err) {
		console.log('changeVoucherStatus', err.message)
		return null
	}
}

export const verifyVoucher = async (payload) => {
	try {
		const res = await client.get(API_ENDPOINTS.verify_voucher + payload)
		return res.data
	} catch (err) {
		console.log('verifyVoucher', err.message)
		return null
	}
}