import React from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { AddPhotoAlternate, Close } from "@mui/icons-material";

const SalonAddressForm = ({ formik }) => {
  return (
    <Container component={"main"}>
      <div>
        <Typography variant="h4" className="text-center">
          Salon Address
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 p-4"
        >
          <Grid container spacing={2}>
            <Grid item size={12}>
              <TextField
                fullWidth
                id="address"
                name="salonAddress.address"
                label="Address"
                required
                value={formik.values.salonAddress.address}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                fullWidth
                id="email"
                name="salonAddress.email"
                label="Salon Email"
                type="email"
                required
                value={formik.values.salonAddress.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                fullWidth
                id="city"
                name="salonAddress.city"
                label="City"
                required
                value={formik.values.salonAddress.city}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="phone"
                name="salonAddress.phone"
                label="Phone Number"
                required
                value={formik.values.salonAddress.phone}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="pincode"
                name="salonAddress.pincode"
                label="Pincode"
                required
                value={formik.values.salonAddress.pincode}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SalonAddressForm;
