import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import OwnerDetailsForm from "./OwnerDetailsForm";
import { useFormik } from "formik";
import SalonDetailsForm from "./SalonDetailsForm";
import SalonAddressForm from "./SalonAddressForm";
import { useDispatch } from "react-redux";
import { createSalon } from "../../Redux/Salon/action";
import { useNavigate } from "react-router-dom";

const steps = ["Owner Details", "Salon Details", "Salon Address"];
const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleActiveStep = (value) => {
  setActiveStep((prev) => Math.min(Math.max(prev + value, 0), steps.length - 1));
};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik=useFormik({
      initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
      phone: "",

      salonAddress: {
        phone: "",
        pincode:"",
        address: "",
        city: "",
        email: "",
      },

      salonDetails:{
        name:"",
        openTime: "",
        closeTime:"",
        images:[],
      },
    },
    onSubmit: (values) => {
  const ownerDetails = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    password: values.password,
    username: values.username,
    role: "SALON_OWNER",
  };

  const salonDetails = {
    name: values.salonDetails.name,
    openTime: values.salonDetails.openTime,
    closeTime: values.salonDetails.closeTime,
    images: values.salonDetails.images,
    ...values.salonAddress,
  };

  console.log("Owner:", ownerDetails);
  console.log("Salon:", salonDetails);

  dispatch(createSalon({salonDetails,ownerDetails,navigate}))  
}
})
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((item) => (
          <Step key={item}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="space-y-10 mt-10">
        <div>{activeStep===0?<OwnerDetailsForm formik={formik}/>:activeStep===1?<SalonDetailsForm formik={formik}/>:<SalonAddressForm formik={formik}/>}</div>
        <div className="flex items-center justify-between">
          <Button
            disabled={activeStep < 1}
            onClick={()=>handleActiveStep(-1)}
            variant="contained"
            color="primary"
          >
            Back
          </Button>
          <Button
            onClick={activeStep === 2 ? formik.handleSubmit : () => handleActiveStep(1)}
            variant="contained"
            color="primary"
          >
            {activeStep===2?"Create Account":"Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerAccountForm;
