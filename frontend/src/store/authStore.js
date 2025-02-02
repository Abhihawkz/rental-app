import { create } from "zustand";
import axios from "axios";

const API_AUTH_URL = "http://localhost:3000/api/v1/user";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isChechkingAuth: true,
  register: async (username, email, password, phNumber) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_AUTH_URL}/register`, {
        username,
        email,
        password,
        phNumber,
      });
      console.log(response.data)
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.response || "Error while registering user",
        isLoading: false,
      });
      throw error;
    }
  },
}));
