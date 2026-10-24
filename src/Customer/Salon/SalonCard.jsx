import { useTheme } from '@mui/material';
import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const SalonCard = ({item,ratingSummary}) => {
    const theme = useTheme();
    const navigate=useNavigate();
    const averageRating = ratingSummary?.averageRating ?? 0;
    const totalRatings = ratingSummary?.totalRatings ?? 0;
  return (
    <div className='cursor-pointer' onClick={()=>navigate(`/salon/${item.id}`)}>
        <div className='w-56 md:w-80 rounded-md shadow-md hover:shadow-lg transition' style={{background:theme.palette.background.paper}}>
                 <img
        className="w-full h-[15rem] object-cover rounded-t-md"
        src={item.images[0]}
        alt="Salon"
        />
              {/* Salon Info */}
      <div className="p-5 space-y-2">
        <h2 className="text-lg font-semibold">{item.name}</h2>

        {/* Rating Badge */}
        <div className="flex items-center gap-1 text-white text-sm bg-green-700 rounded-full px-2 py-1 w-fit">
          {averageRating.toFixed(1)} <StarIcon sx={{ fontSize: "16px" }} />
          <span className="opacity-70 ml-1">({totalRatings})</span>
        </div>
        <p>{item.address}</p>
      </div>

    </div>
    </div>
  )
}

export default SalonCard