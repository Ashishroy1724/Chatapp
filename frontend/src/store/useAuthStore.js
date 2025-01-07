import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    onlineUsers: [],

    isCheckingAuth: true,


// Check Auth
    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");

        set({ authUser: res.data });
        
      } catch (error) {
        console.log("Error in checkAuth:", error);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },


// Sign up
    signup: async (data) => {
      set({ isSigningUp: true });
      try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({ authUser: res.data });
        toast.success("Account created successfully");
        
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isSigningUp: false });
      }
    },


// Login

login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", data);
    set({ authUser: res.data });
    toast.success("Logged in successfully");
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    set({ isLoggingIn: false });
  }
},

// Logout
logout: async () => {
  set({ isLoggingIng: true });
  try {
    const res = await axiosInstance.post("/auth/logout");
    set({ authUser: null });
    toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      } finally {
        set({ isLoggingIng: false });
        }
},


// Update Profile
updateProfile: async (data) => {
  set ({ isUpdatingProfile: true });
  try {
    const res = await axiosInstance.put("/auth/update-profile", data);
    set({ authUser: res.data });
    toast.success("Profile updated Successfully");
  } catch (error) {
    console.log("error in updating profile", error);
    toast.error(error.response.data.message)
  } finally {
    set ({ isUpdatingProfile: false });
  }
},

}))