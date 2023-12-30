import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import React, { useEffect, useState } from 'react'
import PageTitle from '../../layout/PageTitle'
import BarChart from '../../components/BarChart'
import { fetchUserBillAmount } from '../../api/apiCall'

export default function Homepage() {
  const navigate = useNavigate()
  const [billAmount, setBillAmount] = useState({
    gas: [], water: [], electricity: []
  })

  let gasMonthList = {
    'January': 0, 
    'February': 0, 
    'March': 0, 
    'April': 0, 
    'May': 0, 
    'June': 0, 
    'July': 0, 
    'August': 0, 
    'September': 0, 
    'October': 0, 
    'November': 0, 
    'December': 0
  }

  let waterMonthList = {
    'January': 0, 
    'February': 0, 
    'March': 0, 
    'April': 0, 
    'May': 0, 
    'June': 0, 
    'July': 0, 
    'August': 0, 
    'September': 0, 
    'October': 0, 
    'November': 0, 
    'December': 0
  }

  let electricityMonthList = {
    'January': 0, 
    'February': 0, 
    'March': 0, 
    'April': 0, 
    'May': 0, 
    'June': 0, 
    'July': 0, 
    'August': 0, 
    'September': 0, 
    'October': 0, 
    'November': 0, 
    'December': 0
  }

  useEffect(() => {
    (async () => {
      const user_id = sessionStorage.getItem('utl_id')
      const res = await fetchUserBillAmount(user_id)

      let gasBill          = res?.list?.filter(each => each.bill_type === 'gas')
      let waterBill        = res?.list?.filter(each => each.bill_type === 'water')
      let electricityBill  = res?.list?.filter(each => each.bill_type === 'electricity')
      
      gasBill?.forEach(each => gasMonthList[each.month] = each.amount)
      waterBill?.forEach(each => waterMonthList[each.month] = each.amount)
      electricityBill?.forEach(each => electricityMonthList[each.month] = each.amount)

      setBillAmount({
        gas: gasMonthList,
        water: waterMonthList,
        electricity: electricityMonthList
      })
    })()
  }, [])

  return (
    <div className='px-5'>
      <PageTitle>Homepage</PageTitle>

      <div className="flex flex-col-reverse md:flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center w-full">
            <BarChart 
              title='Gas Bill' 
              values={Object.values(billAmount.gas)} 
            />
            <BarChart 
              title='Electricity Bill' 
              values={Object.values(billAmount.electricity)} 
            />
            <BarChart 
              title='Water Bill' 
              values={Object.values(billAmount.water)} 
            />
        </div>
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
