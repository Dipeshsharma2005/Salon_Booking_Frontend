import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadToCloudinary } from '../../util/uploadToCloudinary'
import { createCategory } from '../../Redux/Category/action'

const CategoryForm = ({setActiveTab}) => {

  const dispatch = useDispatch();
  const [uploadImage, setUploadedImage] = useState(false);

  const formik=useFormik({
    initialValues:{
      name:"",
      image:"",
    },
 onSubmit: (values) => {
  console.log("Submitting category:", values);
  dispatch(
    createCategory({ category: values, jwt: localStorage.getItem("jwt") })
  );
  setActiveTab(1);
}

  });

  const handleImageUpload = async(event) => {
    const file= event.target.files[0];
    setUploadedImage(true);
    const image= await uploadToCloudinary(file);
    formik.setFieldValue("image", image);
    setUploadedImage(false);
  }
  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={formik.handleSubmit} className='space-y-4 p-4 w-full lg:w-1/2'>
        <Grid container spacing={2}>
          <Grid className='w-24 h-24' size={{xs:12}}>
            {formik.values.image?(<div className='border relative'>
              <img className='w-24 h-24 object-cover' src={formik.values.image} alt="" />
              <IconButton sx={{position:'absolute',top:0,right:0}} color='primary'>
                <Close/>
              </IconButton>
            </div>):<>
              <input type='file' accept='image/*' id='fileInput' onChange={handleImageUpload} style={{display:'none'}}/>

              <label htmlFor='fileInput' className='relative'>
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
                  <AddPhotoAlternate className='text-gray-400'/>
                </span>
                {uploadImage && <div className='absolute top-0 bottom-0 left-0 right-0 w-24 h-24 flex justify-center items-center'>
                  <CircularProgress/>
                </div>}
              </label>
            </>}
            
          </Grid>
          <Grid size={12}>
            <TextField fullWidth
            id='name'
            name='name'
            label='Name'
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={12}>
            <Button type='submit' variant='outlined' fullWidth sx={{py:'.8rem'}}>
              Create Category
            </Button>        
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default CategoryForm