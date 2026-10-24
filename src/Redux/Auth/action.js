import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./actionTypes";
import api from "../../config/api"; // use your preconfigured Axios instance

// ✅ Register
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await api.post("/auth/signup", userData.data);
    const user = response.data;

    if (user?.access_token) {
      localStorage.setItem("jwt", user.access_token);
      if (user?.refresh_token) {
        localStorage.setItem("refreshToken", user.refresh_token);
      }
      userData.navigate("/");
    }

    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (error) {
    let message = "Something went wrong during signup.";
    if (error.response) {
      if (error.response.status === 409) {
        message = "Email or username already exists.";
      } else if (error.response.status === 400) {
        message = error.response.data?.message || "Invalid input.";
      } else {
        message = error.response.data?.message || message;
      }
    }

    dispatch({
      type: REGISTER_FAILURE,
      payload: message,
    });
  }
};

// ✅ Login
export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await api.post("/auth/login", userData.data);
    const user = response.data;

    if (user?.access_token) {
      localStorage.setItem("jwt", user.access_token);
      if (user?.refresh_token) {
        localStorage.setItem("refreshToken", user.refresh_token);
      }

      // redirect based on role
      if (user?.role === "ROLE_ADMIN") {
        userData.navigate("/admin");
      } else if (user?.role === "ROLE_SALON_OWNER") {
        userData.navigate("/salon-dashboard");
      } else {
        userData.navigate("/");
      }
    }

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    let message = "Something went wrong. Please try again.";

    if (error.response) {
      if (error.response.status === 401) {
        message = "Invalid email or password.";
      } else if (error.response.status === 400) {
        message = error.response.data?.message || "Invalid input.";
      } else {
        message = error.response.data?.message || message;
      }
    }

    dispatch({
      type: LOGIN_FAILURE,
      payload: message,
    });
  }
};

// ✅ Get User
export const getUser = (token) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await api.get("/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// ✅ Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("refreshToken");
  dispatch({ type: LOGOUT });
};

export const refreshAccessToken = () => async (dispatch) => {
  try {

    const refreshToken = localStorage.getItem("refreshToken");

    const response = await api.post("/auth/access-token/refresh-token", {
      refreshToken
    });

    const data = response.data;
    console.log("refreshed");

    localStorage.setItem("jwt", data.jwt);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data.jwt;

  } catch (error) {

    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");

    dispatch({ type: LOGOUT });

    window.location.href = "/login";
  }
};