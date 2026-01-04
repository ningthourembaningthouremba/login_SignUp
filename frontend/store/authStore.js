import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../src/utils/axios";



export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
	success: null,

signup: async (email, password, name) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
      name
    });

    set({
      user: response.data.user,
      isAuthenticated: false, // ⛔ not verified yet
      isLoading: false
    });

    toast.success(response.data.message);
  } catch (error) {
    set({
      error: error.response.data.message || "Error signing up",
      isLoading: false
    });
    throw error;
  }
},



  verifyOtp: async (email, otp) => {
    set({ isLoading: true, error: null, success: null });

    try {
      const res = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp
      });

      set({
        isLoading: false,
        success: res.data.message
      });

      toast.success(res.data.message);
    } catch (err) {
      set({
        isLoading: false,
        error: err.response?.data?.message || "OTP verification failed"
      });

      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  },

	// login: async (email, password) => {
	// 	set({ isLoading: true, error: null });
	// 	try {
	// 		const response = await axiosInstance.post(`${API_URL}/login`, { email, password });
	// 		set({
	// 			isAuthenticated: true,
	// 			user: response.data.user,
	// 			error: null,
	// 			isLoading: false,
	// 		});
	// 	} catch (error) {
	// 		set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
	// 		throw error;
	// 	}
	// },

	// logout: async () => {
	// 	set({ isLoading: true, error: null });
	// 	try {
	// 		await axiosInstance.post(`${API_URL}/logout`);
	// 		set({ user: null, isAuthenticated: false, error: null, isLoading: false });
	// 	} catch (error) {
	// 		set({ error: "Error logging out", isLoading: false });
	// 		throw error;
	// 	}
	// },
	// verifyEmail: async (code) => {
	// 	set({ isLoading: true, error: null });
	// 	try {
	// 		const response = await axiosInstance.post(`${API_URL}/verify-email`, { code });
	// 		set({ user: response.data.user, isAuthenticated: true, isLoading: false });
	// 		return response.data;
	// 	} catch (error) {
	// 		set({ error: error.response.data.message || "Error verifying email", isLoading: false });
	// 		throw error;
	// 	}
	// },
	// checkAuth: async () => {
	// 	set({ isCheckingAuth: true, error: null });
	// 	try {
	// 		const response = await axiosInstance.get(`${API_URL}/check-auth`);
	// 		set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
	// 	} catch (error) {
	// 		set({ error: null, isCheckingAuth: false, isAuthenticated: false });
	// 	}
	// },
	// forgotPassword: async (email) => {
	// 	set({ isLoading: true, error: null });
	// 	try {
	// 		const response = await axiosInstance.post(`${API_URL}/forgot-password`, { email });
	// 		set({ message: response.data.message, isLoading: false });
	// 	} catch (error) {
	// 		set({
	// 			isLoading: false,
	// 			error: error.response.data.message || "Error sending reset password email",
	// 		});
	// 		throw error;
	// 	}
	// },
	// resetPassword: async (token, password) => {
	// 	set({ isLoading: true, error: null });
	// 	try {
	// 		const response = await axiosInstance.post(`${API_URL}/reset-password/${token}`, { password });
	// 		set({ message: response.data.message, isLoading: false });
	// 	} catch (error) {
	// 		set({
	// 			isLoading: false,
	// 			error: error.response.data.message || "Error resetting password",
	// 		});
	// 		throw error;
	// 	}
	// },
}));