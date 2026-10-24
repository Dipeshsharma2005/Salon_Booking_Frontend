import { Divider, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DrawerList = ({ menu1, menu2, toggleDrawer }) => {

  const theme = useTheme();

  const navigate=useNavigate();

  const location=useLocation();

  const handleClick=(item)=>{
    navigate(item.path);
    if(toggleDrawer){
        toggleDrawer(false);
    }
  }
  const activeItemStyle = {
    color: theme.palette.secondary.main,
    background: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    borderTopRightRadius: '9999px',
    borderBottomRightRadius: '9999px',
  };
    const inactiveItemStyle = {
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
  };
  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r border-gray-600 py-3.5">
        
        <div className="space-y-1.5">

          {menu1.map((item, index) => (
            <div onClick={()=>handleClick(item)} className='cursor-pointer pr-8' key={index} >
                <div style={item.path===location.pathname?activeItemStyle:inactiveItemStyle}>
                    <ListItemIcon>{item.path===location.pathname?item.activeIcon:item.icon}</ListItemIcon>
                    <ListItemText>{item.name}</ListItemText> 
                </div>
            
            </div>
          ))}
        </div>

        
        <Divider 
        sx={{ marginY: 2, marginX: 2 }} 
        />
        
        <div className="space-y-1.5">
            {menu2.map((item, index) => (
            <div onClick={()=>handleClick(item)} className='cursor-pointer pr-8' key={index} >
                <div  style={item.path===location.pathname?activeItemStyle:inactiveItemStyle}>
                    <ListItemIcon>{item.path===location.pathname?item.activeIcon:item.icon}</ListItemIcon>
                    <ListItemText>{item.name}</ListItemText> 
                </div>
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
