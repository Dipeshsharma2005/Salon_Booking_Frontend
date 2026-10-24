import { Box, Button, InputLabel, Rating, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createReview } from '../../Redux/Review/action';

const CreateReviewForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { reviewText: "", rating: 0 },
    onSubmit: (values) => {
      dispatch(createReview({
        salonId: id,
        jwt: localStorage.getItem('jwt'),
        reviewData: values,
      }))
      window.alert("Review created successfully")
      formik.resetForm()
    }
  })

  return (
    <Box component={"form"}
      sx={{ mt: 3 }}
      onSubmit={formik.handleSubmit}
      className='space-y-5 w-full lg:w-1/2'>
      
      <TextField
        fullWidth
        id='reviewText'
        name='reviewText'
        label='Review'
        variant='outlined'
        multiline
        rows={4}
        value={formik.values.reviewText}
        onChange={formik.handleChange}
      />

      <div className='space-y-2'>
        <InputLabel className='mt-5'>Rating</InputLabel>
        <Rating 
          id="rating"
          name='rating'
          value={formik.values.rating || 0}
          onChange={(event, newValue) => formik.setFieldValue("rating", newValue)}
          precision={0.5}
        />
      </div>

      <Button variant='contained' color='primary' type='submit'>
        Submit Review
      </Button>
    </Box>
  )
}

export default CreateReviewForm
