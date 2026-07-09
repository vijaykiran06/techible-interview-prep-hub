import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("techible_token");
let initialUser = null;
if (token) {
  try {
    const { jwtDecode } = await import("jwt-decode");
    initialUser = jwtDecode(token);
  } catch { }
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("techible_token") || null,
    isLoggedIn: !!localStorage.getItem("techible_token"),
  },
  reducers: {
    setAuth: (state, action) => {
      state.token     = action.payload.token;
      state.user      = action.payload.user;
      state.isLoggedIn = true;
      localStorage.setItem("techible_token", action.payload.token);
    },
    clearAuth: (state) => {
      state.token      = null;
      state.user       = null;
      state.isLoggedIn = false;
      localStorage.removeItem("techible_token");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;