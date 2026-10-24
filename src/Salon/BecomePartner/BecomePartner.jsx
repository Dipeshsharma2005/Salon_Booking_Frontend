import React from 'react'
import SellerAccountForm from './SellerAccountForm'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';

const BecomePartner = () => {
  const navigate = useNavigate();

  return (
    <div className="grid md:gap-10 grid-cols-4 min-h-screen">
      {/* Left: Form Section */}
      <section className="lg:col-span-2 md:col-span-3 col-span-4 p-10 shadow-lg rounded-b-md">
        <SellerAccountForm />

        <div className="mt-10 space-y-2">
          <h1 className="text-center text-md font-medium">
            Have an account?
          </h1>
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </section>

      {/* Right: Marketing Section */}
      <section className="hidden md:flex col-span-2 flex-col items-center justify-center p-10">
        <h1 className="text-3xl font-bold text-center">
          Join the Marketplace Revolution
        </h1>
        <p className="mt-4 text-lg  font-bold" style={{color:"green"}}>
          Boost Your Sales Today
        </p>
      </section>
    </div>
  )
}

export default BecomePartner
