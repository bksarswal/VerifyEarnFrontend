import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if available
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: storedUser ? true : false,
  user: storedUser || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; //store user data from redux store
      localStorage.setItem('user', JSON.stringify(action.payload)); // Store in localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null; //cleared user data from redux store
      localStorage.removeItem('user'); // Remove from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
