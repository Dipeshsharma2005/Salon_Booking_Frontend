import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DarkMode, LightMode, Menu, NotificationsActive } from "@mui/icons-material";
import { Badge, Drawer, IconButton, Tooltip, useTheme } from "@mui/material";
import SalonDrawerList from "../Salon/components/SalonDrawerList";
import { fetchNotificationsBySalon } from "../Redux/Notifications/action";

const Navbar = ({ darkMode, toggleTheme }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { salon, notification } = useSelector((store) => store);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => setOpen(newOpen);

  // Fetch notifications initially
  useEffect(() => {
    if (salon.salon?.id) {
      dispatch(fetchNotificationsBySalon({
        jwt: localStorage.getItem("jwt"),
        salonId: salon.salon.id,
      }));
    }
  }, [salon.salon?.id, dispatch]);


  return (
    <div className="h-[10vh] flex items-center justify-between border-b border-gray-600 px-5">
      <div className="flex items-center gap-3">
        <IconButton onClick={() => toggleDrawer(true)}>
          <Menu color="primary" />
        </IconButton>
        <h1 className="text-xl cursor-pointer font-bold">Salon Booking</h1>
        <div className='flex items-center gap-5 cursor-pointer'>
                <h1 onClick={()=>{navigate("/")}}>Home</h1>
            </div>
      </div>

      <div className="flex gap-5 px-5">
        <IconButton onClick={() => navigate("/salon-dashboard/notifications")}>
          <Badge
            badgeContent={notification.unreadCount}
            color="error"
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.65rem",
                height: "16px",
                minWidth: "16px",
                padding: "0 4px",
              },
            }}
          >
            <NotificationsActive
              sx={{
                scale: 1.2,
                color: theme.palette.mode === "dark" ? "#FFD700" : "#4A90E2",
              }}
            />
          </Badge>
        </IconButton>

        <Tooltip title={darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              transition: "all 0.4s ease",
              borderRadius: "50%",
              p: 1.2,
              backgroundColor: darkMode
                ? "rgba(255,215,0,0.15)"
                : "rgba(74,144,226,0.15)",
              "&:hover": {
                backgroundColor: darkMode
                  ? "rgba(255,215,0,0.3)"
                  : "rgba(74,144,226,0.3)",
                transform: "rotate(40deg) scale(1.1)",
                boxShadow: darkMode
                  ? "0 0 12px rgba(255,215,0,0.8)"
                  : "0 0 12px rgba(74,144,226,0.8)",
              },
            }}
          >
            {darkMode ? <LightMode sx={{ color: "#FFD700", fontSize: 28 }} /> : <DarkMode sx={{ color: "#4A90E2", fontSize: 28 }} />}
          </IconButton>
        </Tooltip>
      </div>

      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <SalonDrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;
