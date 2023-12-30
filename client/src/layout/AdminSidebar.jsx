import { BadgePlus, BellRing, Percent, ScrollText, Users } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MenuItem = ({ children, to }) => {
	const location = useLocation()
	let style = ''
	
	if(location.pathname === to){
		style = 'h-10 grid grid-cols-4 items-center cursor-pointer p-2 select-none rounded bg-[#508D69] text-white hover:bg-[#508D69]/80'
	} else {
		style = 'h-10 grid grid-cols-4 items-center cursor-pointer p-2 select-none rounded bg-slate-200/50 text-black hover:bg-[#508D69]/80 hover:text-white'
	}
	
	return (
		<Link to={to} className={style}>
			{ children }
		</Link>
	)
}

export default function AdminSidebar() {

	return (
		<div className='w-[250px] h-full fixed border-r-2 p-3 hidden md:flex flex-col gap-2'>
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
	)
}
