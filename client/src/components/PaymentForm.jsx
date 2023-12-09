import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { errorMsg, successMsg } from '../helpers/notificationMsg'
import { checkEmailExists, fetchBillListByUser, setUserEmail, submitPayment } from '../api/apiCall'
import moment from 'moment/moment'
  

export default function PaymentForm({ fromFor = '' }) {
	const initial = {
		card_no: '',
		month: '',
		amount: '',
		email: '',
		bill_type: fromFor,
	}
	const [inputData, setInputData] = useState(initial)
	const [billList, setBillList] = useState([])
	const [monthList, setMonthList] = useState([])
	const [popUp, setPopUp] = useState(false)
	const [isEmailExist, setIsEmailExist] = useState(false)
	const [setupStep, setSetupStep] = useState(1)

	const fetchData = async () => {
		const id = sessionStorage.getItem('utl_id')

		if(id){
			const bills = await fetchBillListByUser(id, fromFor)

			if(bills.flag === 'SUCCESS'){
				setBillList(bills?.list || [])
			}
		}
	}

	useEffect(() => {
		(async () => {
			fetchData()

			const id = sessionStorage.getItem('utl_id')

			if(id){
				const res = await checkEmailExists(id)
				
				if(res.flag === 'SUCCESS'){
					if(res.email){
						setIsEmailExist(true)
						setInputData(prev => ({
							...prev,
							email: res.email
						}))
					}
				}
			}

			const today = new Date()
			const currentMonth = today.getMonth()
			const monthList = [
				{ label: 'January' , value: 'January' },
				{ label: 'February' , value: 'February' },
				{ label: 'March' , value: 'March' },
				{ label: 'April' , value: 'April' },
				{ label: 'May' , value: 'May' },
				{ label: 'June' , value: 'June' },
				{ label: 'July' , value: 'July' },
				{ label: 'August' , value: 'August' },
				{ label: 'September' , value: 'September' },
				{ label: 'October' , value: 'October' },
				{ label: 'November' , value: 'November' },
				{ label: 'December' , value: 'December' }
			]
			setMonthList(monthList.slice(0, currentMonth))
		})()
	}, [])

	const handleInputData = (e) => {
		setInputData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handlePayNow = () => {
		setSetupStep(1)
		if(!inputData.card_no && !inputData.month && !inputData.amount){
			return errorMsg('Input Data First')
		}
		
		setPopUp(true)
	}

	const handleChoice = async (choice) => {
		if(!isEmailExist) return setSetupStep(2)

		if(choice === 'reminder'){
			inputData.reminder = true
		} else if(choice === 'autopay'){
			inputData.autopay = true
		}

		const id = sessionStorage.getItem('utl_id')
		delete inputData.email
		inputData.user_id = id

		const res = await submitPayment(inputData)

		if(res.flag === 'SUCCESS'){
			if(inputData.reminder){
				successMsg('Paid! Also you will get an email reminder, from next month.')
			} else if(inputData.autopay){
				successMsg('Paid! Also your bill will be auto paid, from next month.')
			}
			setInputData(initial)
		} else {
			errorMsg(res.msg)
		}

		fetchData()
		setPopUp(false)
	}

	const handleEmailSave = async () => {
		const id = sessionStorage.getItem('utl_id')
		
		const payload = {
			id: id,
			email: inputData.email
		}

		const res = await setUserEmail(payload)

		if(res.flag === 'SUCCESS'){
			successMsg(res.msg)
			setSetupStep(1)
			setIsEmailExist(true)
		} else {
			errorMsg(res.msg)
		}
	}

  return (
	<>
	<Card className="w-full md:w-1/3 mx-auto shadow-lg p-6">
		<div className='grid grid-cols-4 gap-3 items-center'>
			<Label htmlFor='id'>Card No</Label>
			<Input 
				id='id'
				className='col-span-3'
				name='card_no'
				value={inputData.card_no}
				onChange={handleInputData}
			/>
			
			<Label htmlFor='month'>Month</Label>
			<Select onValueChange={(selected) => {
				const e = {
					target: {
						name: 'month',
						value: selected
					}
				}

				handleInputData(e)
			}}>
				<SelectTrigger className="w-full col-span-3">
					<SelectValue placeholder="Select Month" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
					<SelectLabel>Months</SelectLabel>
						{monthList.map((each, index) => (
							<SelectItem key={index} value={ each.value }>
								{ each.label }
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			
			<Label htmlFor='amount'>Amount</Label>
			<Input 
				id='amount'
				className='col-span-3'
				type='number'
				min='1'
				name='amount'
				value={inputData.amount}
				onChange={handleInputData}
			/>

			<div className="col-span-4 grid justify-end">
				<Button className='px-7' onClick={handlePayNow}>Pay Now</Button>
			</div>
		</div>
	</Card>

	<Dialog open={popUp} onOpenChange={setPopUp}>
		<DialogContent>
			<DialogHeader>
			<DialogTitle className='mb-3'>Select your choice</DialogTitle>
			<DialogDescription asChild>
				{ setupStep === 1 
				?
				<div className="grid grid-cols-2 gap-2">
					<Button 
						variant='outline'
						className='py-20'
						onClick={() => handleChoice('reminder')}
					>
						Want Reminder ?
					</Button>
					<Button 
						variant='outline'
						className='py-20'
						onClick={() => handleChoice('autopay')}
					>
						Auto Pay ?
					</Button>
				</div>
				:
				<div className='grid grid-cols-4 gap-3 items-center'>
					<Label htmlFor='email'>Email</Label>
					<Input 
						id='email'
						className='col-span-3'
						name='email'
						value={inputData?.email}
						onChange={handleInputData}
					/>

					<Button className='col-span-4 text-right' onClick={handleEmailSave}>Save</Button>
				</div>
				}
			</DialogDescription>
			</DialogHeader>
		</DialogContent>
	</Dialog>

	<Card className="w-full md:w-1/3 mx-auto shadow-lg p-6 mt-4">
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead>Bill Type</TableHead>
				<TableHead>Card No</TableHead>
				<TableHead>Month</TableHead>
				<TableHead>Amount</TableHead>
				<TableHead>Created</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{billList.map(each => (
				<TableRow key={each.id}>
					<TableCell>{ (each.bill_type).toUpperCase() }</TableCell>
					<TableCell>{ each.card_no }</TableCell>
					<TableCell>{ each.month }</TableCell>
					<TableCell>{ each.amount }</TableCell>
					<TableCell>{ moment.unix(each.created_at).format('DD-MMM-YY hh:mm a') }</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
	</Card>
	</>
  )
}
