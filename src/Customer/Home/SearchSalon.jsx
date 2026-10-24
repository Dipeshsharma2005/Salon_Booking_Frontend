import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSalons } from "../../Redux/Salon/action";
import SalonList from "../Salon/SalonList";

const SearchSalon = () => {
  const { salon } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    console.log("handleSearch ", e.target.value);
    dispatch(searchSalons(localStorage.getItem("jwt"), e.target.value)); // ✅ correct usage
  };

  return (
    <div className="lg:px-20 px-5">
      <div className="flex flex-col justify-center items-center pb-10 text-white z-20 space-y-3 px-5">
        <input
          onChange={handleSearch}
          className="cursor-pointer border bg-white rounded-md py-4 w-[15rem] md:w-[33rem] outline-none text-black px-5"
          placeholder="Search Salon "
        />
      </div>
      <div>
        <SalonList salons={salon.searchSalons} />
      </div>
    </div>
  );
};

export default SearchSalon;
