import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    name: "",
    email: "",
    role: "",
  },

  reducers: {
    login: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload.userName,
        email: action.payload.userEmail,
        role: action.payload.userRole,
      };
    },
    logout: (state) => {
      return {
        ...state,
        isLoggedIn: false,
        name: "",
        email: "",
        role: "",
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
