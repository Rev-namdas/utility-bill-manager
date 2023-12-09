import React from 'react'
import { Button } from '../components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import { useNavigate } from 'react-router-dom'

export default function AdminNavbar() {
  const navigate = useNavigate()
	
  const handleLogout = () => {
    sessionStorage.removeItem('utl_admin_auth')
    window.location.reload()
  }

  const handleNavigation = (selected) => {
	const routes = {
		'dashboard': '/admin/dashboard',
		'user-list': '/admin/user-list',
		'bill-list': '/admin/bill-list',
		'reminder-list': '/admin/reminder-list',
	}

	if(routes[selected]){
		navigate(routes[selected])
	}
  }
  
  return (
	<div className='px-5 py-3 sticky top-0 left-0 bg-[#508D69] font-semibold flex justify-between items-center'>
    <div className='text-xl text-white hidden md:block'>Admin | Utility Manager</div>
    <div className='text-xl text-white block md:hidden'>Admin</div>
    <div className='flex items-center gap-3'>
		<div>
			<Select onValueChange={handleNavigation}>
				<SelectTrigger className="text-[#508D69] font-bold h-9">
					<SelectValue placeholder="Navigation" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
					<SelectLabel>Jump To</SelectLabel>
						<SelectItem value='dashboard'>Dashboard</SelectItem>
						<SelectItem value='user-list'>User List</SelectItem>
						<SelectItem value='bill-list'>Bill List</SelectItem>
						<SelectItem value='reminder-list'>Reminder List</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
		<div>
			<Button size='sm' className='bg-white text-[#508D69] font-bold hover:border hover:border-white hover:bg-[#508D69] hover:text-white' onClick={handleLogout}>Logout</Button>
		</div>
    </div>
  </div>
  )
}
