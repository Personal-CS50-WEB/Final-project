import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Question } from "../helper/result/result";

export default function Result(){
    const { id } = useParams();
    
    const [ result, setResult ] = useState();
    
    useEffect(() => {
    async function fetchData() {
      // call api for closed survey
        await axios.get(`${process.env.REACT_APP_API_URL}/api/expiredSurvey/${id}/`, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }})
        .then(res => setResult(res.data) )
        .catch(console.error)
    }
    fetchData();
    }, []); 

    return (<div className="container mt-5">
        {result? (<>
            <div className="container">
                <h1>{result.name}</h1>
                <p className="font-weight-normal">{result.description}</p>
                <h3 className="font-weight-normal">Total submissions: {result.submissions.length}</h3>
                <p className="font-weight-light">closed at: {result.deadline}</p>
            </div >
            <div className="container">
            {result.questions.map((question, i) =>(
                <div className="container" key={i}>
                    <Question question={question} />
                    <br></br>
                </div>
            ))}
            </div>
        </>):(null)}
    </div>)
}