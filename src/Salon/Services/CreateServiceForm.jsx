import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Box, Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadToCloudinary } from '../../util/uploadToCloudinary'
import { createServiceAction } from '../../Redux/Salon Services/action'
import { getCategoriesBySalon } from '../../Redux/Category/action'


const CreateServiceForm = () => {


  const formik=useFormik({
    initialValues:{
      name:"",
      image:"",
      description:"",
      price:"",
      duration:"",
      categoryId:""    },
    onSubmit:(values)=>{
      console.log(formik.values)
      dispatch(createServiceAction({service:values,jwt:localStorage.getItem('jwt')}))
      window.alert("Service created successfully")
      formik.resetForm()
    }
    
  });
  const {category,salon} =useSelector(store=>store)
  const dispatch = useDispatch();
  const [uploadImage, setUploadedImage] = useState(false);

    React.useEffect(() => {
      if(salon.salon){
        dispatch(getCategoriesBySalon({jwt:localStorage.getItem('jwt'),salonId: salon.salon?.id  }  ))
      }
    },[salon.salon])

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
          <Grid item className='w-24 h-24' size={{xs:12}}>
            {formik.values.image?<div className='border relative'>
              <img className='w-24 h-24 object-cover' src={formik.values.image} alt="" />
              <IconButton sx={{position:'absolute',top:0,right:0}} color='primary'>
                <Close/>
              </IconButton>
            </div>:<>
              <input onChange={handleImageUpload} type='file' accept='image/*' id='fileInput' style={{display:'none'}}/>

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
          <Grid item size={12}>
            <TextField fullWidth
            id='name'
            name='name'
            label='Name'
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            />
          </Grid>
          <Grid item size={12}>
            <TextField fullWidth
            multiline
            rows={4}
            id='description'
            name='description'
            label='Description'
            required
            value={formik.values.description}
            onChange={formik.handleChange}
            />
          </Grid>
            <Grid item size={{xs:12,sm:6}} >
            <TextField fullWidth
            id='price'
            name='price'
            label='Price'
            required
            value={formik.values.price}
            onChange={formik.handleChange}
            />
          </Grid>
            <Grid item size={{xs:12,sm:6}}>
            <TextField fullWidth
            id='duration'
            name='duration'
            label='Duration'
            required
            value={formik.values.duration}
            onChange={formik.handleChange}
            />
          </Grid>
            <Grid item size={{xs:12}}>
            {/* <TextField fullWidth
            id='name'
            name='name'
            label='Name'
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            /> */}

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name="categoryId"
          id="demo-simple-select"
          value={formik.values.categoryId}
          label="Category"
          onChange={formik.handleChange}
        >
          {category.categories.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>) }
        </Select>
      </FormControl>
    </Box>
  
          </Grid>
          <Grid item size={12}>
            <Button type='submit' variant='outlined' fullWidth sx={{py:'.8rem'}}>
              Create Service
            </Button>        
          </Grid>
          </Grid>
      </form>
    </div>
  )
}

export default CreateServiceForm