import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Button } from "@mui/material";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" or "register"

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <div className="flex justify-center items-center h-[95vh]">
      <div className="p-5 shadow-lg shadow-gray-500 w-full max-w-md">
        {mode === "register" ? (
          <>
            <SignupForm />
            <div className="text-center pt-5">
              Already have an account?{" "}
              <Button onClick={switchMode} variant="text">
                Login
              </Button>
            </div>
          </>
        ) : (
          <>
            <LoginForm />
            <div className="text-center pt-5">
              Don't have an account?{" "}
              <Button onClick={switchMode} variant="text">
                Signup
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
