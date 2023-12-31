import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios  from 'axios';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './components/Store/storeindex';



axios.defaults.baseURL = process.env.REACT_APP_STLAP_LMS_BACKEND;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 
      <BrowserRouter>
        <App />
      </BrowserRouter>
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
