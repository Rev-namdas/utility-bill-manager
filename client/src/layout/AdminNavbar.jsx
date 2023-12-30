import React, { useState } from 'react'
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
import {
	Sheet,
	SheetContent,
	SheetTrigger,
  } from "../components/ui/sheet"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BadgePlus, BellRing, Percent, ScrollText, Users } from 'lucide-react'

export default function AdminNavbar() {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	
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

  const MenuItem = ({ children, to }) => {
    const location = useLocation()
    let style = ''
    
    if(location.pathname === to){
      style = 'h-10 grid grid-cols-4 items-center cursor-pointer p-2 select-none rounded rounded bg-[#508D69] text-white hover:bg-[#508D69]/80'
    } else {
      style = 'h-10 grid grid-cols-4 items-center cursor-pointer p-2 select-none rounded rounded bg-slate-200/50 text-black hover:bg-[#508D69]/80 hover:text-white'
    }
    
    return (
      <Link to={to} className={style} onClick={() => setIsSidebarOpen(false)}>
        { children }
      </Link>
    )
  }
  
  return (
	<div className='px-5 py-3 sticky top-0 left-0 bg-[#508D69] text-white font-semibold flex justify-between items-center z-20'>
		<Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
			<SheetTrigger className='visible md:hidden'>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
				<path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
				</svg>
			</SheetTrigger>
			<SheetContent side='left' className='w-[300px]'>
				<div className='w-[250px] h-full flex flex-col gap-2 mt-4'>
				<MenuItem to='/admin/dashboard'>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
					</svg>
					<span className='col-span-3'>Dashboard</span>
				</MenuItem>
				<MenuItem to='/admin/user-list'>
					<Users />
					<span className='col-span-3'>User List</span>
				</MenuItem>
				<MenuItem to='/admin/bill-list'>
					<ScrollText />
					<span className='col-span-3'>Bill List</span>
				</MenuItem>
				<MenuItem to='/admin/reminder-list'>
					<BellRing />
					<span className='col-span-3'>Reminder List</span>
				</MenuItem>
				<MenuItem to='/admin/user-balance'>
					<BadgePlus />
					<span className='col-span-3'>Balance</span>
				</MenuItem>
				<MenuItem to='/admin/voucher'>
					<Percent />
					<span className='col-span-3'>Voucher</span>
				</MenuItem>
				</div>
			</SheetContent>
		</Sheet>

		<div className='text-xl'>Admin</div>
		<div>
		<Button size='sm' className='bg-white text-[#508D69] font-bold hover:border hover:border-white hover:bg-[#508D69] hover:text-white' onClick={handleLogout}>Logout</Button>
		</div>
	</div>
  )
}
