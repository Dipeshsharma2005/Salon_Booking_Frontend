import { AccountCircle, DarkMode, LightMode, NotificationsActive } from '@mui/icons-material'
import { Avatar, Badge, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../Redux/Auth/action';
import { store } from '../../Redux/store';
import useNotificationWebSocket from '../../util/useNotificationWebSocket';
import { fetchNotificationsByUser } from '../../Redux/Notifications/action';

const Navbar = ({darkMode,toggleTheme}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch=useDispatch();
    const {auth, salon, notification}=useSelector(store=>store)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
    const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout=()=>{
    dispatch(logout())
    handleClose();
  }

useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (token) {
    dispatch(getUser(token));
  }
}, [dispatch]);

useEffect(() => {
    if (auth.user?.id) {
      dispatch(
        fetchNotificationsByUser({
          jwt: localStorage.getItem("jwt"),
          userId: auth.user.id,
        })
      );
    }
  }, [auth.user?.id, dispatch]); 

useNotificationWebSocket({ userId: auth.user?.id, type: "user" });

  const navigate=useNavigate()
  return (
    <div className='z-50 px-6 flex items-center justify-between py-2'>
        <div className='flex items-center gap-10'>
            <h1 className='cursor-pointer font-bold text-2xl' onClick={()=>{navigate("/")}}>
                Salon Services
            </h1>
            <div className='flex items-center gap-5 cursor-pointer'>
                <h1 onClick={()=>{navigate("/")}}>Home</h1>
            </div>
        </div>

        <div className='flex items-center gap-3 md:gap-6'>
          {  auth.user?.role==="CUSTOMER"?<Button onClick={()=>navigate('/become-partner')} variant='outlined'>
                Become Partner
            </Button>: null }

            <IconButton onClick={()=>{navigate("/notifications")}}>
                <Badge badgeContent={notification.unreadCount} color="error" overlap="circular" sx={{
                    "& .MuiBadge-badge": {
                        fontSize: "0.65rem",   
                        height: "16px",        
                        minWidth: "16px",      
                        padding: "0 4px",      
                    }
                }}>
                    <NotificationsActive sx={{ scale:1.2, color: darkMode ? "#FFD700" : "#4A90E2" }} />
                </Badge>
            </IconButton>

            <Tooltip title={darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}>
            <IconButton
                onClick={toggleTheme}
                sx={{
                    transition: "all 0.4s ease",
                    borderRadius: "50%",
                    p: 1.2,
                    backgroundColor: darkMode ? "rgba(255,215,0,0.15)" : "rgba(74,144,226,0.15)",
                    "&:hover": {
                        backgroundColor: darkMode ? "rgba(255,215,0,0.3)" : "rgba(74,144,226,0.3)",
                        transform: "rotate(40deg) scale(1.1)",
                        boxShadow: darkMode
                        ? "0 0 12px rgba(255,215,0,0.8)"
                        : "0 0 12px rgba(74,144,226,0.8)"
                    }
                }}
            >
                {darkMode ? (
                <LightMode sx={{ color: "#FFD700", fontSize: 28 , transition: "0.3s ease"}} />  // golden sun
                ) : (
                <DarkMode sx={{ color: "#4A90E2", fontSize: 28, transition: "0.3s ease" }} />  // cool moon
                )}
            </IconButton>
            </Tooltip>

            {auth.user?.id?<div className='flex gap-1 items-center'>
                <h1 className='text-lg font-semibold'>
                    {auth.user?.fullName.split(" ")[0]}
                </h1>
                <IconButton 
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                >
                    <Avatar sx={{backgroundColor:"green",height:"45px",width:"45px"}}>
                        {auth.user?.fullName[0].toUpperCase()}
                    </Avatar>
                </IconButton>
                <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={()=>{
            navigate("/bookings") ;
            handleClose()}}>
                My Bookings
            </MenuItem>

        {auth.user?.role==="SALON_OWNER" && <MenuItem onClick={()=>{
            navigate("/salon-dashboard") ;
            handleClose();
        }}>Salon Dashboard</MenuItem>}
        
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
            </div>:
            <IconButton onClick={()=>navigate("/login")}>
                <AccountCircle sx={{fontSize:"45px",color:"green"}}/>
            </IconButton>}
        </div>
    </div>
  )
}

export default Navbar