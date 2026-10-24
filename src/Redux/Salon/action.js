import {
  CREATE_SALON_FAILURE,
  CREATE_SALON_REQUEST,
  CREATE_SALON_SUCCESS,
  FETCH_SALON_BY_ID_FAILURE,
  FETCH_SALON_BY_ID_REQUEST,
  FETCH_SALON_BY_ID_SUCCESS,
  FETCH_SALON_BY_OWNER_FAILURE,
  FETCH_SALON_BY_OWNER_REQUEST,
  FETCH_SALON_BY_OWNER_SUCCESS,
  FETCH_SALONS_FAILURE,
  FETCH_SALONS_REQUEST,
  FETCH_SALONS_SUCCESS,
  SEARCH_SALONS_FAILURE,
  SEARCH_SALONS_REQUEST,
  SEARCH_SALONS_SUCCESS,
  UPDATE_SALON_FAILURE,
  UPDATE_SALON_REQUEST,
  UPDATE_SALON_SUCCESS,
} from "./actionTypes";
import api from "../../config/api";

const API_BASE_URL = "/api/salons";

// createSalon action
export const createSalon = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_SALON_REQUEST });

  try {
    let jwt;

    // Step 1: Check if user exists, try login first
    try {
      const loginRes = await api.post("/auth/login", {
        email: reqData.ownerDetails.email,
        password: reqData.ownerDetails.password,
      });
      jwt = loginRes.data.access_token;
    } catch (loginError) {
      if (loginError.response?.status === 401) {
        // Step 2: If login fails, register first
        await api.post("/auth/signup", reqData.ownerDetails);

        // Step 3: Then login to get a valid JWT
        const loginAfterSignup = await api.post("/auth/login", {
          username: reqData.ownerDetails.username,
          password: reqData.ownerDetails.password,
        });
        jwt = loginAfterSignup.data.access_token;
      } else {
        throw loginError;
      }
    }

    localStorage.setItem("jwt", jwt);

    // Step 4: Create salon with valid JWT
    const salonRes = await api.post(API_BASE_URL, reqData.salonDetails, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: CREATE_SALON_SUCCESS, payload: salonRes.data });
    reqData.navigate("/salon-dashboard");
  } catch (error) {
    dispatch({
      type: CREATE_SALON_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateSalon =
  ({ salonId, salon, jwt }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_SALON_REQUEST });

    try {
      const response = await api.put(`${API_BASE_URL}/${salonId}`, salon, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: UPDATE_SALON_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: UPDATE_SALON_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const fetchSalons = () => async (dispatch) => {
  dispatch({ type: FETCH_SALONS_REQUEST });

  try {
    const jwt = localStorage.getItem("jwt");

    const response = await api.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    const salons = response.data;

    // ⭐ Fetch rating summary for each salon
    const salonsWithRatings = await Promise.all(
      salons.map(async (salon) => {
        try {
          const ratingRes = await api.get(
          `/api/reviews/salons/${salon.id}/ratings`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

          return {
            ...salon,
            ratingSummary: ratingRes.data, // ⭐ attach ratings
          };
        } catch (error) {
          return {
            ...salon,
            ratingSummary: {
              averageRating: 0,
              totalRatings: 0,
              breakdown: [],
            },
          };
        }
      })
    );

    dispatch({
      type: FETCH_SALONS_SUCCESS,
      payload: salonsWithRatings,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SALONS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const fetchSalonById =
  (id) =>
  async (dispatch) => {
    dispatch({ type: FETCH_SALON_BY_ID_REQUEST });

    try {
      const response = await api.get(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("salon by id ", response.data);
      dispatch({ type: FETCH_SALON_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: FETCH_SALON_BY_ID_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const fetchSalonByOwner = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_SALON_BY_OWNER_REQUEST });

  try {
    const response = await api.get(`${API_BASE_URL}/owner`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("salons by owner ", response.data);
    dispatch({ type: FETCH_SALON_BY_OWNER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_SALON_BY_OWNER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const searchSalons = (jwt, search) => async (dispatch) => {
  dispatch({ type: SEARCH_SALONS_REQUEST });

  try {
    const response = await api.get(`${API_BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        keyword: search,
      },
    });
    dispatch({ type: SEARCH_SALONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: SEARCH_SALONS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
