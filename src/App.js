import './App.css';
import { Route, Routes } from 'react-router-dom';
import EnachRegistration from './components/Enach/EnachRegistration';
import Idlogin from './components/login/Idlogin';
import OTPSection from './components/otp/OTPSection';
import { Provider } from 'react-redux';
import store from './components/Store/storeindex';
import EnachNewForm from './components/Enach/EnachNewForm';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
     <Routes>
          {/* <Route path ="/login" element={<Idlogin/>}/> */}
          <Route path ="/enach/:appnum" element={<EnachRegistration/>}/>
          <Route path="/enachForm" element={<EnachNewForm />} />
          {/* <Route path ="/otp" element={<OTPSection/>}/> */}
      </Routes>
      </Provider>
    </div>
  );
}

export default App;
