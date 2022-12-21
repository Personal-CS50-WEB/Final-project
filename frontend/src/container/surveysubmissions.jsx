import React from "react";
import { useLocation } from 'react-router-dom'

export default function SurveySubmissions(){
    const location = useLocation()
    const { survey } = location.state
    console.log(survey)
    return <h1>Your submissions</h1>
}