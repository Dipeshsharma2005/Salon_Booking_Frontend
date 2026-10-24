import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, fetchNotificationsBySalon, fetchNotificationsByUser } from "../../Redux/Notifications/action";
import SockJS from "sockjs-client/dist/sockjs";
import { Stomp } from "@stomp/stompjs";
const Notifications = () => {
  const dispatch = useDispatch();
  const { auth,salon, notification } = useSelector((store) => store);
  useEffect(() => {
    if (auth.user?.id) {
      dispatch(
        fetchNotificationsByUser({
          jwt: localStorage.getItem("jwt"),
          userId: auth.user.id,
        })
      );
    }
  }, [auth.user?.id, dispatch]); 
  useEffect(() => {
    if (salon.salon?.id) {
      dispatch(
        fetchNotificationsBySalon({
          jwt: localStorage.getItem("jwt"),
          salonId: salon.salon.id,
        })
      );
    }
  }, [salon.salon?.id, dispatch]); 
  //REAL-TIME NOTIFICATIONS
  
  return (
    <div className="px-5 md:flex flex-col items-center mt-10 min-h-screen">
      {" "}
      <div>
        {" "}
        <h1 className="text-3xl font-bold py-5"> Notifications </h1>{" "}
      </div>{" "}
      <div className="space-y-4 md:w-[35rem]">
        {" "}
        {notification.notifications.map((item) => (
          <NotificationCard item={item} />
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default Notifications;
