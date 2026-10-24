import React, { useEffect } from 'react'
import SalonDrawerList from './components/SalonDrawerList'
import Navbar from '../Salon Admin/Navbar'
import BookingTable from './Booking/BookingTable'
import ServiceTable from './Services/ServiceTable'
import TransactionTable from './Transaction/TransactionTable'
import Category from './Category/Category'
import { Route, Routes } from 'react-router-dom'
import SalonHomePage from './Home/SalonHomePage'
import CreateServiceForm from './Services/CreateServiceForm'
import Notifications from '../Customer/Notification/Notifications'
import Payment from './Payment/Payment'
import SalonRoutes from '../Routes/SalonRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalonByOwner } from '../Redux/Salon/action'
import { getUser } from '../Redux/Auth/action'
import { fetchNotificationsBySalon } from '../Redux/Notifications/action'
import useNotificationWebSocket from '../util/useNotificationWebSocket'

const SalonDashboard = ({darkMode,toggleTheme}) => {
      const dispatch = useDispatch();
      const {salon} = useSelector(store=>store)

    useEffect(()=>{
        dispatch(fetchSalonByOwner(localStorage.getItem('jwt') ))
        dispatch(getUser(localStorage.getItem('jwt')))
    },[])


    useEffect(() => {
        if (salon.salon?.id) {
          dispatch(
            fetchNotificationsBySalon({
              jwt: localStorage.getItem("jwt"),
              salonId: salon.salon.id,
            })
          );
        }
      }, [salon.salon?.id, dispatch]); 

useNotificationWebSocket({ userId: salon.salon?.id, type: "salon" });

  return (
    <div className='min-h-screen'>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme}/>
      <section className='lg:flex lg:h-[90vh]'>
        <div className='hidden lg:block h-full'>
          <SalonDrawerList/>
        </div>
        <div className='p-10 w-full lg:w-[80%] overflow-y-auto'>
          <SalonRoutes/>
        </div>
      </section>
    </div>
  )
}

export default SalonDashboard