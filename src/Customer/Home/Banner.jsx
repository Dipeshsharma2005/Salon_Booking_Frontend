import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
const navigate = useNavigate(); // Importing useNavigate hook from react-router-dom
  return (
    <div className="w-full relative h-[80vh]">
      <video
        className="w-full h-full object-cover"
        muted
        autoPlay
        autoFocus
        src="https://booksy-public.s3.amazonaws.com/horizontal_.webm"
      />
      <div className="absolute inset-0 bg-black/70"></div>
      {/* Black Overlay */}
      <div className="textPart absolute flex flex-col items-center justify-center text-white inset-0 z-20 space-y-3 px-5">
        <h1 className="text-5xl font-bold">Be your self</h1>
        <p className="text-slate-400 text-2xl text-center font-semibold">
          Discover and Book Beauty, Wellness, and More Near You 🤩
        </p>
        <input
          onClick={() => navigate("/search")}
          className="border-none bg-white rounded-md py-4 w-[15rem] md:w-[33rem] outline-none text-black px-5  font-serif font-bold"
          type="text"
          placeholder="Search Salons ..."
        />
      </div>
    </div>
  );
};

export default Banner;
