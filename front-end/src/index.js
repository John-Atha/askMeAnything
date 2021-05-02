import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import LoginRegister from './LoginRegister/LoginRegister';
import Home from './MainPages/Home';
import AskSkeleton from './1_AskQuestion/AskSkeleton';
import AddSkeleton from './2_AddAnswer/AddSkeleton';

const FindAdd = () => {
  let {id} = useParams();
  return <AddSkeleton id={id} />
}

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
          <Home case="general" />
        </Route>
        <Route path="/my" exact>
          <Home case="my" />
        </Route>
        <Route path="/ask" exact>
          <AskSkeleton />
        </Route>
        <Route path="/answer/:id" exact>
          <FindAdd />
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
