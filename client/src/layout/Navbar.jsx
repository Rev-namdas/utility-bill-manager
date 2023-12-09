import React from 'react'
import { Button } from '../components/ui/button'

export default function Navbar() {
  const handleLogout = () => {
    sessionStorage.removeItem('utl_auth')
    window.location.reload()
  }
  
  return (
	<div className='px-5 py-3 sticky top-0 left-0 bg-[#508D69] text-white font-semibold flex justify-between items-center'>
    <div className='text-xl'>Utility Manager</div>
    <div>
      <Button size='sm' className='bg-white text-[#508D69] font-bold hover:border hover:border-white hover:bg-[#508D69] hover:text-white' onClick={handleLogout}>Logout</Button>
    </div>
  </div>
  )
}
