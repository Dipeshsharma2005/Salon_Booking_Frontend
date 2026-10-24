import { Circle, FiberManualRecord, NotificationsActive } from '@mui/icons-material';
import { Card, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../Redux/Notifications/action';
import { useNavigate } from 'react-router-dom';

const NotificationCard = ({item}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleReadNotification = () => {
        dispatch(markNotificationAsRead({
            jwt: localStorage.getItem('jwt'),
            notificationId:item.id,
        }))
        navigate('/bookings')
    }
  return (
    <div>
        <Card
         sx={{bgcolor: item.isRead?theme.palette.background.default:theme.palette.background.paper}} 
         className='cursor-pointer p-5 flex items-center gap-5'
         onClick={handleReadNotification}>
        
            <NotificationsActive/>
            <div>
                <p>{item.description}</p>
                <h1 className='space-x-3'>
                    {item.serviceDTOS.map((item)=>(<span>
                           <FiberManualRecord fontSize='small'/> {item.name}
                        </span>
                    ))}
                        
                </h1>
            </div>
        </Card>
    </div>
  )
}

export default NotificationCard