import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import ReactNotifications from 'react-notifications-component';

import LoginRegister from './LoginRegister/LoginRegister';
import Home from './MainPages/Home';
import AskSkeleton from './1_AskQuestion/AskSkeleton';
import AddSkeleton from './2_AddAnswer/AddSkeleton';
import KeywordSkeleton from './1_KeywordsQuestions/OneKeywordQuestions/KeywordSkeleton';
import KeywordsSkeleton from './1_KeywordsQuestions/FindKeyword/KeywordsSkeleton';
import PeriodsSkeleton from './1_PeriodQuestions/PeriodsSkeleton';
import UserQuestionsSkeleton from './UserQuestions/UserQuestionsSkeleton';

const FindAdd = () => {
  const {id} = useParams();
  return <AddSkeleton id={id} />
}
const FindKeyword = () => {
  const {id} = useParams();
  return <KeywordSkeleton id={id} />
}

const FindUserQuestions = () => {
  const {id} = useParams();
  return <UserQuestionsSkeleton id={id} />
}

ReactDOM.render(
  <React.StrictMode>
    <ReactNotifications />
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
        <Route path="/keywords" exact>
          <KeywordsSkeleton />
        </Route>
        <Route path="/keywords/:id" exact>
          <FindKeyword />
        </Route>
        <Route path="/questions" exact>
          <PeriodsSkeleton />
        </Route>
        <Route path="/users/:id" exact>

        </Route>
        <Route path="/users/:id/questions" exact>
          <FindUserQuestions />
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
