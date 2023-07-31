import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  loginScreen: false,
  EmployeeIDScreen: true,
  MobileScreen: false,
};
const LoginAuth = createSlice({
  name: "login",
  initialState: initialAuthState,
  reducers: {
    updateLogin(state, action) {
      state.loginScreen = action.payload;
    },
    updateEmployeeIDScreen(state, action) {
      state.EmployeeIDScreen = action.payload;
    },
    updateMobileScreen(state, action) {
      state.MobileScreen = action.payload;
    },
  },
});
export const loginAction = LoginAuth.actions;
export default LoginAuth.reducer;
