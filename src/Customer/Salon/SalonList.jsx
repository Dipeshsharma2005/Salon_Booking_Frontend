import React, { useEffect } from "react";
import SalonCard from "./SalonCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalons } from "../../Redux/Salon/action";

const SalonList = ({ salons }) => {
  const dispatch = useDispatch();
  const { auth, salon } = useSelector((store) => store);

  useEffect(() => {
    // If salons were not passed as a prop (like in Home page), fetch all salons
    if (!salons) {
      dispatch(fetchSalons());
    }
  }, [auth.jwt, dispatch, salons]);

  const data = salons || salon.salons; // ✅ use search results if passed, else fallback

  return (
    <div className="flex gap-5 flex-wrap">
      {data.length > 0 ? (
        data.map((item) => <SalonCard key={item.id} item={item} ratingSummary={item.ratingSummary} />
)
      ) : (
        <p className="text-gray-500">No salons found.</p>
      )}
    </div>
  );
};

export default SalonList;
