import React from "react";
import {
    BrowserRouter as Router,
    generatePath,
    Routes,
    Route,
    useNavigate,
    useParams,
  } from "react-router-dom";

export default function TakeSurvey(){
    const { id } = useParams();

    console.log(id);
    return <h1>Take Survey</h1>
}