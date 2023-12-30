import React from 'react'
import Navbar from './Navbar'
import AdminNavbar from './AdminNavbar'
import Sidebar from './Sidebar'
import AdminSidebar from './AdminSidebar'

export default function Layout({ admin = false, children }) {
  return (
	<>
		{ admin ? <AdminNavbar /> : <Navbar /> }
		{ admin ? <AdminSidebar /> : <Sidebar /> }
		<div className='m-4 md:ml-[270px] md:mt-4 md:mr-5'>
			{children}
		</div>
	</>
  )
}
