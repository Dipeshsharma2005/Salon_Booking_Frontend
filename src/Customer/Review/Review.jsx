import React, { useEffect } from 'react';
import ReviewCard from './ReviewCard';
import RatingCard from './RatingCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../Redux/Review/action';
import { useParams } from 'react-router-dom';

const Review = () => {
  const dispatch = useDispatch();
  const { review } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchReviews({
      salonId: id,
      jwt: localStorage.getItem('jwt')
    }));
  }, [id]);

  return (
    <div className='pt-10 flex flex-col lg:flex-row gap-20'>
      <section className='w-full md:w-1/2 lg:w-[40%] space-y-2]'>
        <h1 className='font-semibold text-lg pb-4'>Review & Ratings</h1>
        <RatingCard ratingSummary={review.ratingSummary} />
      </section>

      <section className='w-full md:w-1/2 lg:w-[60%]'>
        <div className='mt-10 space-y-5'>
          {review.reviews.map((item) => (
            <div className='space-y-4' key={item.id}>
              <ReviewCard item={item} />
              <Divider />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Review;
