import { configureStore } from "@reduxjs/toolkit";
import LoginAuth from "../login/LoginAuth";
import MobileLogin from "../login/MobileLogin";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    
    login: LoginAuth,
    mob: MobileLogin,
  },
  middleware: [thunk]
 
});
export const persistor = persistStore(store);
export default store;
