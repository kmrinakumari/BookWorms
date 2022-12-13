import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Admin = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Admin