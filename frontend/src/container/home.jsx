import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import {SurveyCard} from "../helper/list_surveys/surveys";

export default function ListSurveys(){
    const myRef = useRef(null);

    const [ surveys, setSurvey ] = useState([]);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    // call api for active surveys
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/survey/`, config)
        .then(res => setSurvey(res.data))
        .catch(console.error)
    },[]);
    const scrollToDiv = () => {
        myRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (<>
        <section className="section main-banner" id="section1" data-section="section1">
            <video autoPlay  muted loop id="bg-video">
                <source src="/assets/images/course-video.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay header-text">
                <div className="caption">
                    <h2><em>Active</em> surveys</h2>
                    <h6>A list of the active surveys to participate in </h6>
                    <br></br>
                    <div className="main-button">
                        <div className="scroll-to-section">
                            <button onClick={scrollToDiv}
                            className="btn btn-warning">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="section5" ref={myRef} className="section page" data-section="section5">
            <div  className="container">
                {surveys.length > 0 ?
                (<div className="container">
                    {surveys.map((survey, i) =>(
                        <div className="container" key={i}>
                            <SurveyCard survey={survey}/>
                            <br></br>
                        </div>
                    ))}
                </div> ):(<div className="empty"></div>
                )}
            </div>
        </section>
    </>)
}