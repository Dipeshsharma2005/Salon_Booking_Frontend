import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import SockJS from "sockjs-client/dist/sockjs";
import { addNotification } from '../Redux/Notifications/action';

const useNotificationWebSocket = ({userId,type}) => {
    const [stompClient, setStompClient] = useState(null);
    const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      const sock = new SockJS("http://localhost:5000/api/notifications/ws");
      const stomp = Stomp.over(sock);
      setStompClient(stomp);
    }
  }, [userId]);
  useEffect(() => {
    if (stompClient) {
      stompClient.connect(
        {},
        () => {
          stompClient.subscribe(
            `/notification/${type}/${userId}`,
            (message) => {
              const data = JSON.parse(message.body);
              console.log("Received notification", data);
              dispatch(addNotification(data));
            }
          );
        },
        (error) => console.log("Connection failed", error)
      );
    }
  }, [stompClient,userId]);
}

export default useNotificationWebSocket