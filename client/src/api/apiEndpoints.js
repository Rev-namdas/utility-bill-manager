export const API_ENDPOINTS = {
	create_user: '/user/create-user',
	user_login: '/user/user-login',
	check_email_exists: '/user/check-email-exists/',
	update_user_email: '/user/update-user-email',
	fetch_user_balance_by_id: '/user/fetch-user-balance/',
	
	submit_payment: '/bill/create-payment',
	fetch_bill_list_by_user: '/bill/fetch-user-bill-list/',
	fetch_bill_list: '/bill/fetch-bill-list',
	fetch_bill_list_by_user_id: '/bill/fetch-bill-list-by-user-id/',
	fetch_user_bill_amount: '/bill/fetch-bill-amount-by-user-id/',

	fetch_user_reminder_list: '/reminder/fetch-user-reminder-list/',
	update_reminder_action: '/reminder/update-reminder-action/',

	fetch_reminder_list: '/admin/reminder/fetch-reminder-list',
	check_notification_action: '/admin/reminder/fetch-user-notification/',

	fetch_user_list: '/admin/user/fetch-user-list',
	update_user_status_by_id: '/admin/user/update-user-status-by-id/',
	admin_user_login: '/admin/user/admin-user-login',
	update_user_balance_by_id: '/admin/user/update-user-balance',
	create_new_voucher: '/admin/voucher/create-new-voucher',
	fetch_voucher_list: '/admin/voucher/fetch-voucher-list',
	change_voucher_status: '/admin/voucher/update-voucher-status',
	verify_voucher: '/admin/voucher/verify-voucher/',
}