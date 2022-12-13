import React from "react";
import './App.css';
import UserSurveys from "./container/user_surveys";
import { Router , Route, Routes} from "react-router-dom"
import ListSurveys from "./container/home";
import UserSubmissions from "./container/user_submissions";
import CreateSurvey from "./container/create_survey";
import Login from "./container/Login";
import Signup from "./container/Signup";
import Layout from "./hocs/layout";
import CreateSubmission from "./container/create_submission";
import Activate from "./container/Activate";
import { Provider } from "react-redux";
import store from "./store";
import TakeSurvey from "./container/take_survey";
import EditSurvey from "./container/edit";

const App = () => (
  <Provider store={store}>
    <Layout>
        <Routes>
          <Route  path="/" element={<ListSurveys />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/signup" element={<Signup />} />
          <Route  path="/survey/user" element={<UserSurveys />} />
          <Route  path="/submission/user" element={<UserSubmissions />} />
          <Route  path="/create_survey" element={<CreateSurvey />} />
          <Route  path="/survey/:id" element={<TakeSurvey />} />
          <Route  path="/submission" element={<CreateSubmission />} />
          <Route  path="/survey/user/:id" element={<EditSurvey />} />
          <Route exact path='/activate/:uid/:token' compoelementnent={<Activate />} />
        </Routes>
    </Layout>
  </Provider>

  );


export default App;
