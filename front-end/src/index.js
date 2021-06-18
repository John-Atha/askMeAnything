import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import ReactNotifications from 'react-notifications-component';

import LoginRegister from './5_LoginRegister/LoginRegister';
import Home from './0_MainPages/Home';
import AskSkeleton from './1_AskQuestion/AskSkeleton';
import AddSkeleton from './2_AddAnswer/AddSkeleton';
import KeywordsSkeleton from './1_KeywordsQuestions/KeywordsSkeleton';
import PeriodQuestionsGenSkeleton from './1_PeriodQuestionsGen/PeriodQuestionsGenSkeleton';
import StatsPage from './3_Statistics/Pages/StatsPage';
import KeywordPage from './1_KeywordsQuestions/KeywordPage';
import ProfileSkeleton from './4_Profile/ProfileSkeleton';
import Ranking from './Ranking/Ranking';
import NotFound from './0_MainPages/NotFound';
import About from './0_MainPages/About';

const FindAdd = () => {
  const { id } = useParams();
  return <AddSkeleton id={id} />;
}
const FindKeyword = () => {
  const { id } = useParams();
  return <KeywordPage id={id} />;
}
const FindUserQuestions = () => {
  const { id } = useParams();
  return <PeriodQuestionsGenSkeleton case='user' id={id} />
}
const FindUserAnswered = () => {
  const { id } = useParams();
  return <PeriodQuestionsGenSkeleton case='user-answered' id={id} />;
}
const FindUserQuestStats = () => {
  const { id } = useParams();
  return <StatsPage case='questions-user' id={id} />;
}
const FindUserStats = () => {
  const { id } = useParams();
  return <StatsPage case='all-user' id={id} />;
}
const FindKeywordStats = () => {
  const { id } = useParams();
  return <StatsPage case='keyword' id={id} />;
}
const FindProfile = () => {
  const { id } = useParams();
  return <ProfileSkeleton id={id} />;
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
        <Route path="/questions/:id" exact>
          <FindAdd />
        </Route>
        <Route path="/keywords" exact>
          <KeywordsSkeleton case='all' />
        </Route>
        <Route path="/keywords/analytics" exact>
          <KeywordsSkeleton case='analytics' />
        </Route>
        <Route path="/keywords/statistics" exact>
          <KeywordsSkeleton case='statistics' />
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
          <FindProfile />
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
        <Route path="/ranking" exact>
          <Ranking />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="*">
          <NotFound />
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
