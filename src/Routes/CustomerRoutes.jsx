import React from 'react'
import Navbar from '../Customer/Navbar/Navbar'
import ScrollToTop from '../Customer/Home/ScrollToTop'
import { Route, Routes } from 'react-router-dom'
import Home from '../Customer/Home/Home'
import SalonDetails from '../Customer/Salon/Salon Details/SalonDetails'
import Bookings from '../Customer/Booking/Bookings'
import Notifications from '../Customer/Notification/Notifications'
import NotFound from '../NotFound/NotFound'
import PaymentSuccess from '../Customer/Payment/PaymentSuccess'
import ProtectedRoute from "./ProtectedRoute";
import Auth from '../Auth/Auth'
import SearchSalon from '../Customer/Home/SearchSalon'

const CustomerRoutes = ({ darkMode, toggleTheme }) => {

  return (
    <div className='pb-20'>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <ScrollToTop />

      <Routes>

        {/* Login */}
        <Route path='/login' element={<Auth />} />

        {/* Protected Routes */}

        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>

        <Route path="/salon/:id" element={
          <ProtectedRoute>
            <SalonDetails/>
          </ProtectedRoute>
        }/>

        <Route path="/search" element={
          <ProtectedRoute>
            <SearchSalon/>
          </ProtectedRoute>
        }/>

        <Route path="/bookings" element={
          <ProtectedRoute>
            <Bookings/>
          </ProtectedRoute>
        }/>

        <Route path="/payment-success/:bookingId" element={
          <ProtectedRoute>
            <PaymentSuccess/>
          </ProtectedRoute>
        }/>

        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications/>
          </ProtectedRoute>
        }/>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  )
}

export default CustomerRoutes