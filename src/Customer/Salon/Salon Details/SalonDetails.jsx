import React, { useEffect, useState } from 'react'
import { Button, Divider } from '@mui/material'
import SalonServiceDetails from './SalonServiceDetails';
import SalonDetail from './SalonDetail';
import Reviews from '../../Review/Review';
import CreateReviewForm from '../../Review/CreateReviewForm';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchSalonById } from '../../../Redux/Salon/action';

const tabs=[{name:"All Services"},{name:"Reviews"},{name:"Create Review"}]
const SalonDetails = () => {

    const [selectedTab,setSelectedTab]=useState(tabs[0]);
    const handleSelectedTab=(tab)=>setSelectedTab(tab);
    const {id} = useParams(); // Assuming id is passed as a parameter in the URL which is given in route path '/salon/:id'
    const dispatch = useDispatch(); 

    useEffect(()=>{
        if(id){
            dispatch(fetchSalonById(id));
        }
    },[id]);
  return (
    <div className='px-5 lg:px-20'>
        <SalonDetail/>
        <div className='space-y-4'>
            <div className='flex gap-2'>
                {tabs.map((tab ,index)=><Button key={index} onClick={()=>handleSelectedTab(tab)} variant={tab.name==selectedTab.name?"contained":"outlined"}>{tab.name}</Button>)}
            </div>
            <Divider />
        </div>
        <div>
            {selectedTab.name=="Create Review"?
                <div className='flex justify-center'> <CreateReviewForm/></div>:
                selectedTab.name=="Reviews"?
                <div><Reviews /></div>:
                <div><SalonServiceDetails/></div>}
        </div>
    </div>
  )
}

export default SalonDetails