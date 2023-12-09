import { Button } from '../../components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentForm from '../../components/PaymentForm'
import PageTitle from '../../layout/PageTitle'

export default function GasBill() {
	const navigate = useNavigate()

  return (
	<div className='p-5'>
		<PageTitle>Gas Bill</PageTitle>
		<Button 
			variant='outline' 
			size='sm'
			onClick={() => navigate('/')}
		>
			Go Back
		</Button>

		<div className='mt-5'>
			<PaymentForm fromFor='gas' />
		</div>
	</div>
  )
}
