import React, { useEffect } from 'react'
import ProfileFieldCard from './ProfileFieldCard'
import { Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalonByOwner } from '../../Redux/Salon/action';

const Profile = () => {

    const {salon,auth} = useSelector(store=>store);
  return (
    <div className='lg:px-20 lg:bottom-20 space-y-20'>
        <div className='w-full lg:w-[70%]'>
            <h1 className='text-5xl font-bold pb-5'>{salon.salon?.name}</h1>
             <section className='grid grid-cols-2 gap-3'>
            <div className='col-span-2'>
                <img className='w-full rounded-md h-[15rem] object-cover' src={salon.salon?.images[0]} alt="" />
            </div>
            <div className='col-span-1'>
                <img className='w-full rounded-md h-[15rem] object-cover' src={salon.salon?.images[1]} alt="" />
            </div>
            <div className='col-span-1'>
                <img className='w-full rounded-md h-[15rem] object-cover' src={salon.salon?.images[2]} alt="" />
            </div>
        </section>
        </div>
        <div className='mt-10 lg:w-[70%]'>
            <div className='flex items-center justify-between pb-3'>
                <h1 className='text-2xl font-bold text-gray-500'>Owner Details</h1>
            </div>
            <div>
                <ProfileFieldCard keys={"Owner Name"} value={auth.user?.fullName}/>
                <Divider/>
                <ProfileFieldCard keys={"Email"} value={auth.user?.email}/>
                <Divider/>
                <ProfileFieldCard keys={"Role"} value={"Salon_Owner"}/>
            </div>
        </div>
        <div className='mt-10 lg:w-[70%]'>
            <div className='flex items-center justify-between pb-3'>
                <h1 className='text-2xl font-bold text-gray-500'>Salon Details</h1>
            </div>
            <div>
                <ProfileFieldCard keys={"Salon Name"} value={salon.salon?.name}/>
                <Divider/>
                <ProfileFieldCard keys={"Salon Address"} value={salon.salon?.address}/>
                <Divider/>
                <ProfileFieldCard keys={"Open Time"} value={salon.salon?.openTime +" AM"}/>
                <Divider/>
                <ProfileFieldCard keys={"Close Time"} value={salon.salon?.closeTime+" PM"}/>
                <Divider/>

            </div>
        </div>
    </div>
  )
}

export default Profile