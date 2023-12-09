import PageTitle from '../../layout/PageTitle'
import { Button } from '../../components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentForm from '../../components/PaymentForm'

export default function WaterBill() {
	const navigate = useNavigate()

  return (
	<div className='p-5'>
		<PageTitle>Water Bill</PageTitle>
		<Button
			variant='outline' 
			size='sm'
			onClick={() => navigate('/')}
		>
			Go Back
		</Button>

		<div className='mt-5'>
			<PaymentForm fromFor='water' />
		</div>
	</div>
  )
}
