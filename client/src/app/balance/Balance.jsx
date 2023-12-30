import PageTitle from '../../layout/PageTitle'
import { fetchBillListByUserId, fetchUserBalance } from '../../api/apiCall'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Card } from '../../components/ui/card'
import moment from 'moment'

export default function Balance() {
	const [balance, setBalance] = useState(0)
	const [balanceList, setBalanceList] = useState([])

	useEffect(() => {
		(async () => {
			const user_id = sessionStorage.getItem('utl_id')
			const res = await fetchUserBalance(user_id)
			if(res?.user){
				setBalance(res?.user[0]?.balance)
			}

			const details = await fetchBillListByUserId(user_id)
			setBalanceList(details.list)
		})()
	}, [])

	return (
	<>
		<PageTitle>Current Balance: {balance}</PageTitle>

		<Card className="w-full md:w-1/2 mx-auto shadow-lg p-6 mt-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Sl</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Bill Type</TableHead>
						<TableHead>Bill Month</TableHead>
						<TableHead className='text-right'>Amount</TableHead>
					</TableRow>
				</TableHeader>	
				<TableBody>
					{balanceList.map((each, index) => (
						<TableRow key={each.id}>
							<TableCell>{ index + 1 }</TableCell>
							<TableCell>{ moment.unix(each.created_at).format('DD-MMM-YY') }</TableCell>
							<TableCell>{ each.bill_type.toUpperCase() }</TableCell>
							<TableCell>{ each.month }</TableCell>
							<TableCell className='text-right'>{ each.amount }</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	</>
	)
}
