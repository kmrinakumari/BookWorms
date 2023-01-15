import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../main/Footer';
import Header from './Header';

const Admin = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Admin