import { Card, Divider } from '@mui/material'
import React from 'react'
import { getTotalPrice } from '../../util/totalEarning'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalonBookings } from '../../Redux/Booking/action';

const Payment = () => {
   const dispatch = useDispatch();
  const { salon, booking } = useSelector((store) => store);
  React.useEffect(() => {
    if (salon.salon) {
      dispatch(fetchSalonBookings({ jwt: localStorage.getItem("jwt") }));
    }
  }, [salon.salon]);
  return (
    <div>
      <div>
        <Card className='space-y-4 p-5 rounded-md lg:w-[55%]'>
          <h1 className='text-gray-500 text-xl'>Total Earning</h1>
          <h1 className='font-bold text-3xl pb-1'>₹{getTotalPrice(booking.bookings)}</h1>
          <Divider sx={{marginBottom:"1rem" ,marginTop:"1rem"}}/>
          <p className='text-lg'>Last Payment : <strong>₹{booking.bookings?.[booking.bookings.length - 1]?.totalPrice || 0}</strong></p>
        </Card>
      </div>
    </div>
  )
}

export default Payment