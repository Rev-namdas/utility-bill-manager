import React, { useEffect, useState } from 'react'
import { Card } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { changeVoucherStatus, createNewVoucher, fetchVoucherList } from '../../../api/apiCall'
import { errorMsg, successMsg } from '../../../helpers/notificationMsg'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'

export default function AdminVoucher() {
	const initialState = {
		voucher: '',
		amount: ''
	}
	const [inputData, setInputData] = useState(initialState)
	const [voucherList, setVoucherList] = useState([])

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const res = await fetchVoucherList()
		setVoucherList(res?.list || [])
	}

	const handleInputData = (e) => {
		setInputData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = async () => {
		const res = await createNewVoucher(inputData)
		if(res.flag === 'SUCCESS'){
			successMsg(res.msg)
			setInputData(initialState)
			fetchData()
		} else {
			errorMsg(res.msg)
		}
	}

	const handleStatus = async (obj) => {
		const payload = {
			id: obj.id,
			status: obj.status ? 0 : 1
		}
		const res = await changeVoucherStatus(payload)
		if(res.flag === 'SUCCESS'){
			successMsg(res.msg)
			fetchData()
		} else {
			errorMsg(res.msg)
		}
	}

	return (
		<>
		<Card className="w-full md:w-1/2 mx-auto shadow-lg p-6">
			<div className="grid grid-cols-4 gap-3">
				<div className="col-span-2 grid gap-2">
					<Label htmlFor='input'>Voucher Name</Label>
					<Input 
						placeholder='Type Voucher Name' 
						name='voucher'
						value={inputData.voucher}
						onChange={handleInputData}
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor='input'>Deduct Amount</Label>
					<Input 
						type='number' 
						placeholder='Type Amount'
						name='amount'
						value={inputData.amount}
						onChange={handleInputData}
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor='btn'>Action</Label>
					<Button onClick={handleSubmit}>Create</Button>
				</div>
			</div>
		</Card>

		<Card className="w-full md:w-1/2 mx-auto shadow-lg p-6 mt-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Sl</TableHead>
						<TableHead>Voucher Name</TableHead>
						<TableHead className='text-right'>Deduct Amount</TableHead>
						<TableHead className='text-center'>Action</TableHead>
					</TableRow>
				</TableHeader>	
				<TableBody>
					{voucherList.map((each, index) => (
						<TableRow key={each.id}>
							<TableCell>{ index + 1 }</TableCell>
							<TableCell>{ each.voucher.toUpperCase() }</TableCell>
							<TableCell className='text-right'>{ each.amount }</TableCell>
							<TableCell className='text-center'>
								{each.status
								?
								<Button className='bg-red-600 hover:bg-red-700' onClick={() => handleStatus(each)}>
									Deactivate
								</Button>
								:
								<Button className='bg-green-600 hover:bg-green-700' onClick={() => handleStatus(each)}>
									Activate
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
