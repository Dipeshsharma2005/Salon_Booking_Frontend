import { ArrowRightAlt } from '@mui/icons-material';
import { Button, useTheme } from '@mui/material'
import React from 'react'

const BookingCard = ({item}) => {
    const theme=useTheme();
  return (
    <div className='p-5 rounded-md md:flex items-center justify-between' style={{background:theme.palette.background.paper}}>
        <div className='space-y-2'>
            <h1 className='text-2xl font-bold'>
                {item.salonDTO.name}
            </h1>
            <div>
                {item.serviceDTOS.map((service)=><li>
                    {service.name}
                </li>)}
                
            </div>
            <div>
                <p>
                    Time and Date <ArrowRightAlt/> {item.startTime.split('T')[0]}
                </p>
                <p>
                    {item.startTime.split('T')[1]} To {item.endTime.split('T')[1]}
                </p>
            </div>
        </div>
        <div className='space-y-2'>
            <img className='h-28 w-28' src={item.serviceDTOS[0].image} alt="" />
            <p className='text-center '>₹{item.totalPrice}</p>
            <Button color='error' variant='outlined'>Cancel</Button>
        </div>
    </div>
  )
}

export default BookingCard