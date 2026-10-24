import { AccountBalance, AccountBox, Add, Category, Dashboard, Inventory, Logout, Notifications, NotificationsNone, Receipt, ShoppingBag } from '@mui/icons-material';
import { useTheme } from '@mui/material'
import React from 'react'
import DrawerList from '../../Salon Admin/DrawerList';
// #019031

const SalonDrawerList = ({toggleDrawer}) => {
    const theme=useTheme();
    const menu1=[
        {
            name:"Dashboard",
            path:"/salon-dashboard",
            icon:<Dashboard  sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<Dashboard sx={{color:theme.palette.secondary.main}}/>
        },
        {
            name:"Bookings",
            path:"/salon-dashboard/bookings",
            icon:<ShoppingBag sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<ShoppingBag sx={{color:theme.palette.secondary.main}}/>
        },
        {
            name:"Services",
            path:"/salon-dashboard/services",
            icon:<Inventory sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<Inventory sx={{color:theme.palette.secondary.main}}/>
        },
        {
            name:"Add Services",
            path:"/salon-dashboard/add-services",
            icon:<Add sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<Add sx={{color:theme.palette.secondary.main}}/>
        },
        {
            name:"Payment",
            path:"/salon-dashboard/payment",
            icon:<AccountBalance sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<AccountBalance sx={{color:theme.palette.secondary.main}}/>
        },
        {
            name:"Transaction",
            path:"/salon-dashboard/transaction",
            icon:<Receipt sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<Receipt sx={{color:theme.palette.secondary.main}}/>
        },
        {
            name:"Category",
            path:"/salon-dashboard/category",
            icon:<Category sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<Category sx={{color:theme.palette.secondary.main}}/>
        },
        {
            name:"Notifications",
            path:"/salon-dashboard/notifications",
            icon:<NotificationsNone sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<Notifications sx={{color:theme.palette.secondary.main}}/>
        }
    ]
    
    const menu2=[
            {
            name:"Account",
            path:"/salon-dashboard/account",
            icon:<AccountBox sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<AccountBox sx={{color:theme.palette.secondary.main}}/>
        },
        {
            name:"Logout",
            path:"/",
            icon:<Logout sx={{color:theme.palette.primary.main}}/>,
            activeIcon:<Logout sx={{color:theme.palette.secondary.main}}/>
        }
    ]
  return (
        <DrawerList menu1={menu1} menu2={menu2} toggleDrawer={toggleDrawer}/>
  )
}

export default SalonDrawerList