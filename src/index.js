import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from './components/store/Store';
import { GoogleOAuthProvider } from "@react-oauth/google"
import {PayPalScriptProvider} from "@paypal/react-paypal-js"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='538208484298-mg9kcv97relvncsrjaf3dfjr0jnbojsu.apps.googleusercontent.com'>
      <PayPalScriptProvider options={{ "client-id": "AddNYh4aiveLUTl1Eqm7Juz_mgDaW__cIYGPsHlcQXRlETzKxx30nvMJ60pmt9UTQ0jg10XCXa8Lk_-w" }}>
        <App />
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
