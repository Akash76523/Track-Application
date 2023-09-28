import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './App/Store';
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <Provider store = {store}>
        <App />
      </Provider>
    </Router>
    
  //  </React.StrictMode>
);
