import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import LoginRegister from './LoginRegister/LoginRegister';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <LoginRegister case="login" />
        </Route>
        <Route path="/register" exact>
          <LoginRegister case="register" />
        </Route>
        <Route path ="/" exact>
          <App />
        </Route>
      </Switch>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
