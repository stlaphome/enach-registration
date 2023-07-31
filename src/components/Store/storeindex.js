import { configureStore } from "@reduxjs/toolkit";
import LoginAuth from "../login/LoginAuth";
import MobileLogin from "../login/MobileLogin";

const store = configureStore({
  reducer: {
    
    login: LoginAuth,
    mob: MobileLogin,
    
  },
 
});
export default store;
