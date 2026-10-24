import { Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'

const OwnerDetailsForm = ({formik}) => {
  return (
    <Container component={"main"} >
      <div>
        <Typography variant="h4" className="text-center">
          Owner Details
        </Typography>
        <form className="" onSubmit={formik.handleSubmit}>
          <TextField
            required
            fullWidth
            label="First Name"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            sx={{ mb: 3, mt: 3 }}
          />

          <TextField
            required
            fullWidth
            label="Last Name"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            sx={{ mb: 3 }}
          />
          <TextField
            required
            fullWidth
            label="User Name"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            sx={{ mb: 3 }}
          />

          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            id="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            variant="outlined"
            sx={{ mb: 3 }} // margin bottom
          />
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phone"
            type="tel"
            onChange={formik.handleChange}
            value={formik.values.phone}
            sx={{ mb: 3 }}
          />

          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            id="password"
            type="password"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.password}
            sx={{ mb: 3 }} // margin bottom
          />
        </form>
      </div>
    </Container>
  )
}

export default OwnerDetailsForm