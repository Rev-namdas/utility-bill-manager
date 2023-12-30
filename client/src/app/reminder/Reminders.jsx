import React, { useEffect, useState } from 'react'
import PageTitle from '../../layout/PageTitle'
import { fetchUserReminderList, updateReminderAction } from '../../api/apiCall'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Card } from '../../components/ui/card'
import moment from 'moment'
import { Button } from '../../components/ui/button'
import { errorMsg, successMsg } from '../../helpers/notificationMsg'

export default function Reminders() {
	const [reminderList, setReminderList] = useState([])
	
	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const user_id = sessionStorage.getItem('utl_id')
		const res = await fetchUserReminderList(user_id)
		setReminderList(res?.list || [])
	}
	
	const handleReminderAction = async (id) => {
		const res = await updateReminderAction(id)

		if(res.flag === 'SUCCESS'){
			successMsg(res.msg)
			fetchData()
		} else {
			errorMsg(res.msg)
		}
	}

  return (
	<>
		<PageTitle>Reminder Settings</PageTitle>

		<Card className="w-full md:w-1/2 mx-auto shadow-lg p-6 mt-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Sl</TableHead>
						<TableHead>Bill Type</TableHead>
						<TableHead>Month</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Reminder</TableHead>
						<TableHead>Auto Pay</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>	
				<TableBody>
					{reminderList.map((each, index) => (
						<TableRow key={each.id}>
							<TableCell>{ index + 1 }</TableCell>
							<TableCell>{ each.bill_type.toUpperCase() }</TableCell>
							<TableCell>{ each.month }</TableCell>
							<TableCell>{ each.amount }</TableCell>
							<TableCell>{ each.reminder && moment.unix(each.reminder).format('DD-MMM-YY') }</TableCell>
							<TableCell>{ each.autopay && moment.unix(each.autopay).format('DD-MMM-YY') }</TableCell>
							<TableCell>
								{each.autopay &&
								<Button 
									onClick={() => handleReminderAction(each.id)}
								>
									Autopay Off
								</Button>
								}
								{each.reminder && !each.autopay &&
								<Button 
									onClick={() => handleReminderAction(each.id)}
								>
									Reminder Off
								</Button>
								}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	</>
  )
}