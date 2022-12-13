import React, { useEffect, useState } from "react";
import axios from 'axios';
import {SurveyCard} from "../helper/surveys";

export default function ListSurveys(){
    const [ surveys, setSurvey ] = useState([]);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/survey/`, config)
        .then(res => setSurvey(res.data))
    },[]);

    return (<>
        <div className="jumbotron">
            <h2>Active surveys</h2>
            </div>
        <div className="container">
            {surveys.length > 0 ?
            (
                <div className="container">
                    {surveys.map((survey) =>(
                    
                        <SurveyCard  survey={survey}/>
                       
                    ))}
                </div> 
            ):(
            <div className="empty">
                <h2> No Surveys found</h2>
            </div>
            )}
        </div>
    </>)
}