import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/",
});

api.defaults.withCredentials = true;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns 401 (Unauthorized) or 403 (Invalid/Expired token)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token");
      // Redirect to login page
      window.location.href = "/user/login";
    }
    return Promise.reject(error);
  }
);

export default api;
