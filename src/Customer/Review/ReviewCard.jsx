import { AccountCircle, Delete } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Rating } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReview } from '../../Redux/Review/action'

const ReviewCard = ({ item }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector((store) => store)

  const handleDeleteReview = () => {
    dispatch(
      deleteReview({
        reviewId: item.id,
        jwt: localStorage.getItem('jwt'),
      })
    )
  }

  const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFBD33', '#33FFBD', '#BD33FF']

  const getRandomColor = (str) => {
    if (!str) return colors[0]
    const hash = str.charCodeAt(0) + (str.charCodeAt(1) || 0)
    return colors[hash % colors.length]
  }

  const nameForAvatar = item.user?.fullName || 'Guest'

  return (
    <div className="flex justify-between">
      <div className="w-[80%]">
        <Grid container>
          <Grid item xs={3} lg={1.5}>
            <Box>
              <Avatar
                className="text-white"
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: getRandomColor(nameForAvatar),
                }}
              >
                {nameForAvatar !== 'Guest' ? nameForAvatar[0] : <AccountCircle size={12} />}
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <div className="space-y-2">
              <p className="font-semibold text-lg">{item.user?.fullName || 'Guest'}</p>
              <p className="opacity-70">{item.createdAt ? item.createdAt.split('T')[0] : ''}</p>
            </div>
            <div>
              <Rating
                readOnly
                value={item.rating || 0}
                precision={0.5}
                defaultValue={0}
                name="Rating"
              />
            </div>
            <p>{item.reviewText || ''}</p>
          </Grid>
        </Grid>
      </div>

      {item.user?.id === auth.user?.id && (
        <IconButton onClick={handleDeleteReview}>
          <Delete sx={{ scale: 1.3 }} />
        </IconButton>
      )}
    </div>
  )
}

export default ReviewCard
