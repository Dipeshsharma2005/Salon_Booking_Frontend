import { Box, Grid, LinearProgress, Rating } from '@mui/material';
import React from 'react';

const RatingCard = ({ ratingSummary }) => {
  if (!ratingSummary) return null;

  const { averageRating, totalRatings, breakdown } = ratingSummary;

  return (
    <div className="border p-5 rounded-md">
      <div className="pb-10 space-x-3 flex items-center">
        <Rating
          readOnly
          value={averageRating}
          precision={0.5}
          name="Rating"
        />
        <p className="opacity-60">{totalRatings}</p>
      </div>

      <Box>
        {breakdown.map((item, index) => (
          <Grid container alignItems="center" spacing={1} key={index} className="mb-2">
            <Grid item xs={2}>
              <p>{item.label}</p>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                sx={{ bgcolor: '#d0d0d0', height: 7, borderRadius: 4 }}
                variant="determinate"
                value={item.percentage}
                color="success"
              />
            </Grid>
            <Grid item xs={2}>
              <p className="opacity-50 p-2">{item.count}</p>
            </Grid>
          </Grid>
        ))}
      </Box>
    </div>
  );
};

export default RatingCard;
