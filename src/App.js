import "./App.css";
import { Route, Routes } from "react-router-dom";
import EnachRegistration from "./components/Enach/EnachRegistration";
import Idlogin from "./components/login/Idlogin";
import OTPSection from "./components/otp/OTPSection";
import { Provider } from "react-redux";
import store from "./components/Store/storeindex";
import EnachNewForm from "./components/Enach/EnachNewForm";
import EnachStatusPage from "./components/Enach/EnachStatusPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/enach/:appnum" element={<EnachRegistration />} />
          <Route path="/enachForm" element={<EnachNewForm />} />
          <Route path ="/enachResponse" element={<EnachStatusPage/>}/>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
