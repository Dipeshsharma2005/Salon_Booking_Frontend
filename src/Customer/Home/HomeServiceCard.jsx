import React from 'react'
import { useTheme } from "@mui/material/styles";


const HomeServiceCard = ({item}) => {
    const theme = useTheme();
  return (
    <div className='flex justify-center items-center flex-col gap-4 rounded-lg p-5 w-32 h-48  ' style={{background:theme.palette.background.paper}}> 
        <img className='w-20 h-20 rounded-full' src={item.image} alt="" />
        <h1 className='text-center text-xl'>{item.name}</h1>
    </div>
  )
}

export default HomeServiceCard