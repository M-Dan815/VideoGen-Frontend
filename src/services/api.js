import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Create axios instance
const api = axios.create({
	baseURL: `${API_URL}/api/v1`,
	timeout: 60000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		// Add auth token if available
		const token = localStorage.getItem("auth_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error.response?.data?.detail || error.message || "An error occurred";

		if (error.response?.status === 401) {
			localStorage.removeItem("auth_token");
			toast.error("Session expired. Please login again.");
			window.location.href = "/login";
		} else if (error.response?.status === 404) {
			toast.error("Resource not found");
		} else if (error.response?.status >= 500) {
			toast.error("Server error. Please try again later.");
		} else if (error.message === "Network Error") {
			toast.error("Network error. Please check your connection.");
		}

		return Promise.reject(error);
	}
);

export default api;
