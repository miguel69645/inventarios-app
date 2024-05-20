import React from 'react'
import ReactDOM from 'react-dom/client'
import AppAllModules from './AppAllModules.jsx'
import { Provider } from "react-redux";
import store from '../src/security/redux/store/store';
// import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppAllModules />
      {/*  <AppDemo />  */}
    </Provider>
  </React.StrictMode>,
)
