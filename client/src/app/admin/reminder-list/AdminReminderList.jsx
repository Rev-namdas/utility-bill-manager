import moment from 'moment'
import { fetchBillList, fetchReminderList } from '../../../api/apiCall'
import { Card } from '../../../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import PageTitle from '../../../layout/PageTitle'
import React, { useEffect, useState } from 'react'

export default function AdminReminderList() {
	const [billList, setBillList] = useState([])

	useEffect(() => {
		(async () => {
			const res = await fetchReminderList()
			setBillList(res?.list || [])
		})()
	}, [])
	

  return (
	<>
	<PageTitle>Reminder List</PageTitle>

	<Card className="w-full md:w-1/2 mx-auto shadow-lg p-6">
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>User</TableHead>
					<TableHead>Month</TableHead>
					<TableHead>Bill Type</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Card No</TableHead>
					<TableHead>Reminder</TableHead>
					<TableHead>Autopay</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{billList.map(each => (
					<TableRow key={each.id}>
						<TableCell>{ each.username }</TableCell>
						<TableCell>{ each.month }</TableCell>
						<TableCell>{ (each.bill_type).toUpperCase() }</TableCell>
						<TableCell>{ each.amount }</TableCell>
						<TableCell>{ each.card_no }</TableCell>
						<TableCell>
							{ 
							each.reminder
							? moment.unix(each.reminder).format('DD-MMM-YY') 
							: '-'
							}
						</TableCell>
						<TableCell>
							{ 
							each.autopay
							? moment.unix(each.autopay).format('DD-MMM-YY') 
							: '-'
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
