import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------
let isRefreshing = false;
let pendingRequests = [];
// ------------------------

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Ignore login request
    if (originalRequest.url.includes("/auth/login")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // If refresh already happening
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {

        const res = await axios.post(
          `${API_BASE_URL}/auth/access-token/refresh-token`,
          { refreshToken }
        );

        const newAccessToken = res.data.jwt;
        const newRefreshToken = res.data.refreshToken;

        // Save tokens
        localStorage.setItem("jwt", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Update header for future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry pending requests
        pendingRequests.forEach((cb) => cb(newAccessToken));
        pendingRequests = [];

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {

        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;