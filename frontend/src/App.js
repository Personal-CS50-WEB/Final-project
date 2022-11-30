
import axios from "axios";
import Navbar from "./navbar";
import './App.css';
import UserSurveys from "./pages/user_surveys";
import {Route, Routes} from "react-router-dom"
import ListSurveys from "./pages/home";
import UserSubmissions from "./pages/user_submissions";
import CreateSurvey from "./pages/create_survey";

function App() {
  

  return (
    <>
    
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element= {<ListSurveys />}></Route>
        <Route path="/user_surveys" element= {<UserSurveys />}></Route>
        <Route path="/user_submissions" element= {<UserSubmissions />}></Route>
        <Route path="/create_survey" element= {<CreateSurvey />}></Route>
      </Routes>
    </div>
    
    </>
  
  );
}

export default App;
