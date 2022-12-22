import React, { useEffect, useState } from "react";
import axios from 'axios';
import {SurveyCard} from "../helper/surveys";

export default function Results(){
    const [ results, setResults ] = useState([]);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/expiredSurvey/`, config)
        .then(res => setResults(res.data))
        .catch(console.error)
    },[]);

    return (<>
        <div className="jumbotron">
            <h2>Closed surveys</h2>
            </div>
        <div className="container">
            {results.length > 0 ?
            (
                <div className="container">
                    {results.map((survey, i) =>(
                        <div className="container" key={i}>
                        <SurveyCard  survey={survey}/>
                        <br></br>
                        </div>
                    ))}
                </div> 
            ):(
            <div className="empty">
            
            </div>
            )}
        </div>
    </>)
}