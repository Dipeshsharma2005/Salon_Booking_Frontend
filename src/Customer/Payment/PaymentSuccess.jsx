import { Button, useTheme } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentScuccessAction } from '../../Redux/Payment/action';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    const location = useLocation();

    const getQueryParams = (key)=>{
        const params = new URLSearchParams(location.search);
        return params.get(key);
    }

    const paymentId = getQueryParams('razorpay_payment_id');
    const paymentLinkId = getQueryParams('razorpay_payment_link_id');

    useEffect(()=>{
        if(paymentId){
            dispatch(paymentScuccessAction({
                paymentId,
                paymentLinkId,
                jwt: localStorage.getItem("jwt")
            }))
        }
    })
  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
        
        <div style={{background:theme.palette.primary.main , color:theme.palette.secondary.main}} className='p-8 w-[90%] lg:w-[35%] border rounded-md h-[49vh] flex flex-col gap-7 items-center justify-center'>
            <h1 className='text-3xl font-semibold'>
                Congratulations!
            </h1>
            <h1 className='text-2xl font-semibold text-center'>
                Your Booking Get Confirmed!
            </h1>
            <div>
                <Button variant='contained' color='secondary' onClick={()=>navigate("/")}>Go To Home</Button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess