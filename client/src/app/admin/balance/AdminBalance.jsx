import PageTitle from '../../../layout/PageTitle'
import { fetchUserList, updateUserBalance } from '../../../api/apiCall'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { errorMsg, successMsg } from '../../../helpers/notificationMsg'

export default function AdminBalance() {
	const [userList, setUserList] = useState([])
	const [isEditMode, setIsEditMode] = useState(false)
	const [inputData, setInputData] = useState('')

	const fetchData = async () => {
		const res = await fetchUserList()
		setUserList(res?.list || [])
	}
	
	useEffect(() => {
		fetchData()
	}, [])
	
	const handleEdit = () => {
		setIsEditMode(true)
	}
	
	const handleCancel = () => {
		setIsEditMode(false)
	}

	const handleUpdate = async (id) => {
		const payload = {
			id: id,
			balance: inputData
		}

		const res = await updateUserBalance(payload)
		
		if(res.flag === 'SUCCESS'){
			setIsEditMode(false)
			successMsg(res.msg)
			fetchData()
		} else {
			errorMsg(res.msg)
		}
	}

	return (
	<>
		<PageTitle>User Balance</PageTitle>

		<Card className="w-full md:w-1/2 mx-auto shadow-lg p-6">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>Sl</TableHead>
						<TableHead className='text-center'>Username</TableHead>
						<TableHead className='text-center'>Balance</TableHead>
						<TableHead className='text-center'>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{userList.map((each, index) => (
						<TableRow key={each.id}>
							<TableCell className='text-center'>{ index + 1 }</TableCell>
							<TableCell className='text-center'>{ each.username }</TableCell>
							<TableCell>
								<div className="flex justify-center items-center">
									{isEditMode
									?
									<Input 
										className='w-20 text-center' 
										defaultValue={each.balance} 
										onChange={(e) => setInputData(e.target.value)}
									/>
									:
									each.balance
									}
								</div>
							</TableCell>
							<TableCell className='text-center'>
								{isEditMode
								?
								<div className='flex justify-center gap-1'>
									<Button className='bg-green-600 hover:bg-green-700' onClick={() => handleUpdate(each.id)}>
										Update
									</Button>
									<Button onClick={handleCancel}>
										Cancel
									</Button>
								</div>
								:
								<Button onClick={handleEdit}>
									Edit
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
