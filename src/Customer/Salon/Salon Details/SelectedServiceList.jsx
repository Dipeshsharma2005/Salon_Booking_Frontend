import { Close } from '@mui/icons-material'
import { IconButton, useTheme } from '@mui/material'
import React, { use } from 'react'

const SelectedServiceList = ({onRemove,selectedServices}) => {
    const theme = useTheme();
    const services = Array.isArray(selectedServices)
    ? selectedServices
    : selectedServices?.services || [];
  return (
    <div className='my-5 space-y-2'>
        {services.map((item)=>(
            <div className='py-2 px-4 rounded-md flex items-center justify-between' style={{background:theme.palette.background.paper}}>
                <h1 className='font-thin'>{item.name}</h1>
                <p>₹{item.price}</p>
                <IconButton onClick={()=>onRemove(item.id)}>
                    <Close/>
                </IconButton>
            </div>))}
    </div>
  )
}

export default SelectedServiceList 