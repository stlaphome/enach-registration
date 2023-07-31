import './App.css';
import { Route, Routes } from 'react-router-dom';
import EnachRegistration from './components/Enach/EnachRegistration';

function App() {
  return (
    <div className="App">
     <Routes>
          <Route path ="/login" element={<EnachRegistration/>}/>
          <Route path ="/enach" element={<EnachRegistration/>}/>
          <Route path ="/otp" element={<EnachRegistration/>}/>
      </Routes>
    </div>
  );
}

export default App;
