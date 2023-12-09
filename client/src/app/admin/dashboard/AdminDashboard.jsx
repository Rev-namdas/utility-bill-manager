import moment from 'moment'
import { fetchNotificationActions, fetchUserList } from '../../../api/apiCall'
import PageTitle from '../../../layout/PageTitle'
import React, { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [userList, setUserList] = useState([])
  
  const fetchData = async () => {
    for(let each of userList){
      console.log(each.id)
      await fetchNotificationActions(each.id)
    }
  }
  
  useEffect(() => {
    (async () => {
      const users = await fetchUserList()
      setUserList(users?.list || [])
    })()

    const intervalId = setInterval(() => {
      fetchData()  
      console.log('fetching', moment().format('hh:mm:ss DD-MMM-YY'))
    }, 30000);

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  
  return (
    <PageTitle>Admin Dashboard</PageTitle>
  )
}
