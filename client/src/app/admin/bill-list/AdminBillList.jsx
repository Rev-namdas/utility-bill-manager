import moment from 'moment'
import { fetchBillList } from '../../../api/apiCall'
import { Card } from '../../../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import PageTitle from '../../../layout/PageTitle'
import React, { useEffect, useState } from 'react'

export default function AdminBillList() {
	const [billList, setBillList] = useState([])

	useEffect(() => {
		(async () => {
			const res = await fetchBillList()
			setBillList(res?.list || [])
		})()
	}, [])
	

  return (
	<>
	<PageTitle>Bill List</PageTitle>

	<Card className="w-full md:w-1/3 mx-auto shadow-lg p-6">
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>User</TableHead>
					<TableHead>Month</TableHead>
					<TableHead>Bill Type</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Card No</TableHead>
					<TableHead>Created</TableHead>
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
						<TableCell>{ moment.unix(each.created_at).format('DD-MMM-YY') }</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Card>
	</>
  )
}
