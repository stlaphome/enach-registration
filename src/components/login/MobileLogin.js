import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  NumberSection: true,
  OTPSection: false,
  MobileNumber: "",
  Name: "",
  lastLogin: "",
};
const MobileLogin = createSlice({
  name: "login",
  initialState: initialAuthState,
  reducers: {
    updateNumberSection(state, action) {
      state.NumberSection = action.payload;
    },
    updateOTPSection(state, action) {
      state.OTPSection = action.payload;
    },
    updateMobileNumber(state, action) {
      state.MobileNumber = action.payload;
    },
    updateName(state, action) {
      state.Name = action.payload;
    },
    updateLastLogin(state, action) {
      state.lastLogin = action.payload;
    },
  },
});
export const MobileLoginAction = MobileLogin.actions;
export default MobileLogin.reducer;
