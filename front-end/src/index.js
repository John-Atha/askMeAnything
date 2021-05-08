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
import KeywordsSkeleton from './1_KeywordsQuestions/KeywordsSkeleton';
import PeriodQuestionsGenSkeleton from './PeriodQuestionsGen/PeriodQuestionsGenSkeleton';
import StatsPage from './3_Statistics/Pages/StatsPage';

const FindAdd = () => {
  const {id} = useParams();
  return <AddSkeleton id={id} />
}
const FindKeyword = () => {
  const {id} = useParams();
  return <PeriodQuestionsGenSkeleton case='keyword' id={id} />
}
const FindUserQuestions = () => {
  const {id} = useParams();
  return <PeriodQuestionsGenSkeleton case='user' id={id} />
}
const FindUserAnswered = () => {
  const {id} = useParams();
  return <PeriodQuestionsGenSkeleton case='user-answered' id={id} />;
}
const FindUserQuestStats = () => {
  const {id} = useParams();
  return <StatsPage case='questions-user' id={id} />;
}
const FindUserStats = () => {
  const {id} = useParams();
  return <StatsPage case='all-user' id={id} />;
}
const FindKeywordStats = () => {
  const {id} = useParams();
  return <StatsPage case='keyword' id={id} />
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
        <Route path="/keywords/:id/stats" exact>
          <FindKeywordStats />
        </Route>
        <Route path="/questions" exact>
          <PeriodQuestionsGenSkeleton case='general' />
        </Route>
        <Route path="/questions/stats" exact>
          <StatsPage case='questions-gen' />
        </Route>
        <Route path="/users/:id" exact>

        </Route>
        <Route path="/users/:id/questions" exact>
          <FindUserQuestions />
        </Route>
        <Route path="/users/:id/answers" exact>
          <FindUserAnswered />
        </Route>
        <Route path="/users/:id/questions/stats" exact>
          <FindUserQuestStats />
        </Route>
        <Route path="/users/:id/stats" exact>
          <FindUserStats />
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
