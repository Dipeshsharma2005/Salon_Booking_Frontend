import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  CircularProgress,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import { DateTimePicker, LocalizationProvider, MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const SalonDetailsForm = ({ formik }) => {
  const [uploadImage, setUploadedImage] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("salonDetails.images", [
      ...formik.values.salonDetails.images,
      image,
    ]);
    setUploadedImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.salonDetails.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("salonDetails.images", updatedImages);
  };

  return (
    <Container component={"main"}>
      <div>
        <Typography variant="h4" className="text-center mb-6" sx={{marginBottom:3}}>
          Salon Details
        </Typography>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Image upload section */}
          <div className="flex gap-4 flex-wrap">
            {formik.values.salonDetails.images.map((image, index) => (
              <div
                key={index}
                className="border relative w-24 h-24 rounded-md overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt={`salon-${index}`}
                />
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(255,255,255,0.7)",
                  }}
                  size="small"
                >
                  <Close fontSize="small" />
                </IconButton>
              </div>
            ))}

            {/* Upload button */}
            <label htmlFor="fileInput" className="relative">
              <input
                onChange={handleImageUpload}
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
              />
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternate className="text-gray-400" />
              </span>
              {uploadImage && (
                <div className="absolute top-0 bottom-0 left-0 right-0 w-24 h-24 flex justify-center items-center bg-white/70">
                  <CircularProgress size={24} />
                </div>
              )}
            </label>
          </div>

          <TextField
          required
          sx={{marginBottom: 2}}
            fullWidth
            id="salonDetails.name"
            name="salonDetails.name"
            label="Salon Name"
            value={formik.values.salonDetails.name}
            onChange={formik.handleChange}
            error={
              formik.touched.salonDetails?.name &&
              Boolean(formik.errors.salonDetails?.name)
            }
          />
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="Select Opening Time"
                sx={{ width: "100%",marginBottom: 2}}
                fullWidth
                value={formik.values.salonDetails.openTime ? dayjs(formik.values.salonDetails.openTime, "HH:mm:ss") : null}
                onChange={(value) => {
                  if (value) {
                    formik.setFieldValue("salonDetails.openTime", value.format("HH:mm:ss"));
                  }
                }}
              />
            </LocalizationProvider>
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                sx={{ width: "100%" }}
                fullWidth
                value={formik.values.salonDetails.closeTime ? dayjs(formik.values.salonDetails.closeTime, "HH:mm:ss") : null}
                onChange={(value) => {
                  if (value) {
                    formik.setFieldValue("salonDetails.closeTime", value.format("HH:mm:ss"));
                  }
                }}
                label="Select Closing Time"
              />
            </LocalizationProvider>
        </form>
      </div>
    </Container>
  );
};

export default SalonDetailsForm;
