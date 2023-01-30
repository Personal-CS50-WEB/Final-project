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

    return (<>
        {result? (<>
            <section id="section5" className="section video" data-section="section5">
                <div className="container">
                    <h2 className='text-light'>{result.name}</h2>
                    <p className=" text-light font-weight-normal">{result.description}</p>
                    <h3 className="text-light font-weight-normal">Total submissions: {result.submissions.length}</h3>
                    <p className="text-light font-weight-light">closed at: {result.deadline}</p>
                </div>
                <br></br>
                <div className="container">
                {result.questions.map((question, i) =>(
                    <div className="container" key={i}>
                        <Question question={question} />
                        <br></br>
                    </div>
                ))}
                </div>
            </section>
        </>):(null)}
    </>)
}