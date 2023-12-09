import React from 'react'
import Navbar from './Navbar'
import AdminNavbar from './AdminNavbar'

export default function Layout({ admin = false, children }) {
  return (
	<>
		{ admin ? <AdminNavbar /> : <Navbar /> }
		{children}
	</>
  )
}
