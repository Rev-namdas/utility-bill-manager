import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './app/homepage/Homepage'
import Login from './app/login/Login'
import Register from './app/register/Register'
import GasBill from './app/gas-bill/GasBill'
import ElectricityBill from './app/electricity-bill/ElectricityBill'
import WaterBill from './app/water-bill/WaterBill'
import AdminUserList from './app/admin/user-list/AdminUserList';
import AdminLogin from './app/admin/login/AdminLogin';
import AdminDashboard from './app/admin/dashboard/AdminDashboard';
import Layout from './layout/Layout';
import AdminBillList from './app/admin/bill-list/AdminBillList';
import AdminReminderList from './app/admin/reminder-list/AdminReminderList';
import AdminBalance from './app/admin/balance/AdminBalance';
import Balance from './app/balance/Balance';
import Reminders from './app/reminder/Reminders';
import AdminVoucher from './app/admin/voucher/AdminVoucher';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    (() => {
      const session = sessionStorage.getItem('utl_auth')

      if(!['', null, undefined].includes(session)){
        setIsAuth(true)
      }

      const adminSession = sessionStorage.getItem('utl_admin_auth')

      if(!['', null, undefined].includes(adminSession)){
        setIsAdmin(true)
      }
    })()
  }, [])
  
  if(isAuth){
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
  
        <BrowserRouter>
          <Layout>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/gas-bill' element={<GasBill />} />
            <Route path='/electricity-bill' element={<ElectricityBill />} />
            <Route path='/water-bill' element={<WaterBill />} />
            <Route path='/balance' element={<Balance />} />
            <Route path='/reminders' element={<Reminders />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
          </Layout>
        </BrowserRouter>
      </>
    )
  } else if(isAdmin){
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
  
        <BrowserRouter>
          <Layout admin>
          <Routes>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/user-list' element={<AdminUserList />} />
            <Route path='/admin/bill-list' element={<AdminBillList />} />
            <Route path='/admin/reminder-list' element={<AdminReminderList />} />
            <Route path='/admin/user-balance' element={<AdminBalance />} />
            <Route path='/admin/voucher' element={<AdminVoucher />} />
            <Route path='*' element={<Navigate to='/admin/dashboard' />} />
          </Routes>
          </Layout>
        </BrowserRouter>
      </>
    )
  } else {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
  
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }

}

export default App
