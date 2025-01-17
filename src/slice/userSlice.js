import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// State Awal
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = action.payload.data.user;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user)); // Menyimpan user ke localStorage
    },
    registerUser: (state, action) => {
      const user = action.payload.data.user;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user)); // Menyimpan user ke localStorage
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logout Success | Good Bye");
    },
  },
});

export const { loginUser, logoutUser, registerUser } = userSlice.actions;
export default userSlice.reducer;
