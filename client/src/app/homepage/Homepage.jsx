import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import React from 'react'
import PageTitle from '../../layout/PageTitle'

export default function Homepage() {
  const navigate = useNavigate()

  return (
    <div className='px-5'>
      <PageTitle>Homepage</PageTitle>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center w-full">
          <Button 
            variant='outline'
            className='h-full grid grid-cols-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 shadow-lg group transition-all'
            onClick={() => navigate('/gas-bill')}
          >
            <div className='flex items-center justify-center p-5 rounded-lg bg-white'>
              <img src="gas.png" alt="Gas Bill" className='h-24 w-24 transition-transform transform group-hover:scale-y-110' />
            </div>
            <div className='text-white text-xl font-bold'>Gas Bill</div>
          </Button>

          <Button 
            variant='outline'
            className='h-full grid grid-cols-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 shadow-lg group transition-all'
            onClick={() => navigate('/electricity-bill')}
          >
            <div className='flex items-center justify-center p-5 rounded-lg bg-white'>
              <img src="electricity.png" alt="Electricity Bill" className='h-24 w-24 transition-transform transform group-hover:scale-y-110' />
            </div>
            <div className='text-white text-xl font-bold'>Electricity Bill</div>
          </Button>

          <Button 
            variant='outline'
            className='h-full grid grid-cols-2 rounded-xl bg-gradient-to-r from-violet-500 to-sky-500 shadow-lg group transition-all'
            onClick={() => navigate('/water-bill')}
          >
            <div className='flex items-center justify-center p-5 rounded-lg bg-white'>
              <img src="water.png" alt="Water Bill" className='h-24 w-24 transition-transform transform group-hover:scale-y-110' />
            </div>
            <div className='text-white text-xl font-bold'>Water Bill</div>
          </Button>
        </div>
      </div>
    </div>
  )
}
