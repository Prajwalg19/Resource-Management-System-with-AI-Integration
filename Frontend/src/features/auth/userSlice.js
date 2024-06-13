import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  accesstoken: null,
  status: null,
  refreshtoken: null,
  userInfo: null,
  profileInfo: null,
  admin: false,
};
const authSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setCred: (state, action) => {
      if (action.payload?.name == "refreshedToken") {
        state.accesstoken = action.payload.response.access;
      } else {
        state.accesstoken = action.payload.token?.access;
        state.role = action.payload?.role;
        state.status = true;
        state.userInfo = action.payload.data;
      }
      if (action.payload?.name != "refreshedToken") {
        state.refreshtoken = action.payload.token?.refresh;
      }
    },
    logOut: (state) => {
      state.role = null;
      state.status = false;
      state.refreshtoken = null;
      state.accesstoken = null;
      state.admin = false;
    },
    profileFill: (state, action) => {
      state.profileFill = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setCred, logOut, profileFill, setAdmin } = authSlice.actions;