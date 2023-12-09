import PageTitle from '../../layout/PageTitle'
import { Button } from '../../components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentForm from '../../components/PaymentForm'

export default function ElectricityBill() {
	const navigate = useNavigate()

  return (
	<div className='p-5'>
		<PageTitle>Electricity Bill</PageTitle>
		<Button 
			variant='outline' 
			size='sm'
			onClick={() => navigate('/')}
		>
			Go Back
		</Button>

		<div className='mt-5'>
			<PaymentForm fromFor='electricity' />
		</div>
	</div>
  )
}
