import React, { useEffect, useMemo } from "react";
import EarningCharts from "./chart/EarningCharts";
import ReportCard from "./Report/ReportCard";
import AccountBalance from "@mui/icons-material/AccountBalance";
import BookingCharts from "./chart/BookingCharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalonBookings } from "../../Redux/Booking/action";
import { getTotalPrice } from "../../util/totalEarning";

const SalonHomePage = () => {
  const dispatch = useDispatch();
  const { salon, booking } = useSelector((store) => store);

  useEffect(() => {
    if (salon.salon) {
      dispatch(fetchSalonBookings({ jwt: localStorage.getItem("jwt") }));
    }
  }, [salon.salon, dispatch]);

  // 🧠 Derived stats
  const stats = useMemo(() => {
    const allBookings = booking.bookings || [];

    const totalEarnings = getTotalPrice(allBookings);
    const totalBookings = allBookings.length;
    const cancelledBookings = allBookings.filter(
      (b) => b.status === "CANCELLED"
    ).length;
    const refundedBookings = allBookings.filter(
      (b) => b.status === "REFUNDED"
    ).length;

    const totalRefunds = allBookings
      .filter((b) => b.status === "REFUNDED")
      .reduce((sum, b) => sum + (b.refundAmount || 0), 0);

    return {
      totalEarnings,
      totalBookings,
      cancelledBookings,
      refundedBookings,
      totalRefunds,
    };
  }, [booking.bookings]);

  return (
    <div className="space-y-5">
      <div className="lg:flex gap-5">
        {/* Left Section: Charts */}
        <div className="space-y-10 rounded-md w-full lg:w-[70%]">
          <div className="border rounded-lg p-5 w-full">
            <h1 className="text-lg font-bold pb-5" style={{ color: "#019031" }}>
              Total Revenue
            </h1>
            <EarningCharts bookings={booking.bookings} />
          </div>
        </div>

        {/* Right Section: Report Cards */}
        <section className="space-y-5 w-full lg:w-[30%]">
          <ReportCard
            icon={<AccountBalance />}
            value={`₹${stats.totalEarnings}`}
            title="Total Earnings"
          />
          <ReportCard
            icon={<AccountBalance />}
            value={stats.totalBookings}
            title="Total Bookings"
          />
          <ReportCard
            icon={<AccountBalance />}
            value={`₹${stats.totalRefunds}`}
            title="Total Refunds"
          />
          <ReportCard
            icon={<AccountBalance />}
            value={stats.cancelledBookings}
            title="Cancelled Bookings"
          />
        </section>
      </div>

      {/* Booking Stats Chart */}
      <div className="space-y-10 rounded-md w-full">
        <div className="border rounded-lg p-5 w-full">
          <h1 className="text-lg font-bold pb-5" style={{ color: "#019031" }}>
            Total Bookings
          </h1>
          <BookingCharts bookings={booking.bookings} />
        </div>
      </div>
    </div>
  );
};

export default SalonHomePage;
