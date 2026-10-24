import { useEffect, useState } from 'react'
import './App.css'
import { Button, CssBaseline, IconButton, ThemeProvider, Tooltip } from '@mui/material'
import { Css, DarkMode, DeleteOutline, DeleteSweepSharp } from '@mui/icons-material'
import { greenDarkTheme, greenLightTheme } from './theme/greenTheme'
import Home from './Customer/Home/Home'
import SalonDetails from './Customer/Salon/Salon Details/SalonDetails'
import Bookings from './Customer/Booking/Bookings'
import Notifications from './Customer/Notification/Notifications'
import Navbar from './Customer/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './Customer/Home/ScrollToTop'
import SalonDashboard from './Salon/SalonDashboard'
import CustomerRoutes from './Routes/CustomerRoutes'
import SignupForm from './Auth/SignupForm'
import LoginForm from './Auth/LoginForm'
import Auth from './Auth/Auth'
import BecomePartner from './Salon/BecomePartner/BecomePartner'

function App() {
  const [darkMode, setdarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches
);
  const toggleTheme = () => {
    setdarkMode(!darkMode);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => setdarkMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  return (

    <>
    <ThemeProvider theme={darkMode?greenDarkTheme:greenLightTheme}>
        <CssBaseline />
        <Routes>
          <Route path='/salon-dashboard/*' element={<SalonDashboard  darkMode={darkMode} toggleTheme={toggleTheme}/>}/>
          <Route path='/register' element={<Auth  darkMode={darkMode} toggleTheme={toggleTheme}/>}/>
          <Route path='/login' element={<Auth  darkMode={darkMode} toggleTheme={toggleTheme}/>}/>
          <Route path='/become-partner' element={<BecomePartner  darkMode={darkMode} toggleTheme={toggleTheme}/>}/>
          <Route path='*' element={<CustomerRoutes darkMode={darkMode} toggleTheme={toggleTheme}/>}/>
        </Routes>
    </ThemeProvider> 
    </>
  )
}

export default App
