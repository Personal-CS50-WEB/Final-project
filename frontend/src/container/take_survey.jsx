import React, { useEffect, useState } from "react";
import axios from 'axios';
import { submit } from "../actions/submit";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Question } from "../helper/questions";

const  TakeSurvey = ({ isAuthenticated, submit }) => {
    const { id } = useParams();
    let history = useNavigate();
    //if not authenticated return to login page
    if (!isAuthenticated){
        return <Navigate to='/login' />
    }
    const [ Survey, setSurvey ] = useState();
    const [submissionAnswers, SetSubmissionAnswers] = useState([{
        question: ''
    }]); 
    
    useEffect(() => {
    async function fetchData() {
      // call api for user surveys
        await axios.get(`${process.env.REACT_APP_API_URL}/api/survey/${id}/`, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }})
        .then(res => setSurvey(res.data))
        .catch(console.error)
    }
    fetchData();
    }, []); 
    
    const addAnswer = () => {
        let newfield = { 
            question: ''
        };
        SetSubmissionAnswers(submissionAnswers.push(newfield));
    }
    let radio;
    const handleCallback = (childData) =>{
        console.log(childData);
        radio = childData
    
    }
    let checkbox;
    const  handleCallbackCheckbox = (childData) =>{
        console.log(childData);
        checkbox = childData;
    }

    const handleFormChange = (i, event, question) => {
        let index;
        if (submissionAnswers.findIndex(answer => answer.question === question.id) === -1 && submissionAnswers[0]['question'] !== ''){
            addAnswer();
            index = submissionAnswers.length -1;
        } else {
            index = submissionAnswers.findIndex(answer => answer.question === question.id)
            if(index === -1){ index = 0;}
        }
        submissionAnswers[index].question = question.id
        if (question.type === 'TEXT-ANSWER'){
            let text_answer = {
                "text": ''
            }
            submissionAnswers[index].text_answer = text_answer ;
            submissionAnswers[index].text_answer.text = event.target.value;
        } else if (question.type === 'INTEGER' || question.type === 'SCORE'){
            let integer_answer = {
                integer: null
            };
            submissionAnswers[index].integer_answer = integer_answer;
            submissionAnswers[index].integer_answer.integer = parseInt(event.target.value)
        } else if (question.type === 'RADIO'){
            let options_answers = [radio]
            console.log(options_answers)
            submissionAnswers[index].options_answers = options_answers;
        } else {
            let options_answers = checkbox
            submissionAnswers[index].options_answers = options_answers; 
        }
        SetSubmissionAnswers([...submissionAnswers])
        console.log(submissionAnswers)
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(submissionAnswers)
        submit(id, submissionAnswers, history);
        console.log(Survey)
    }
    return (
    <div className="container mt-5">
        <h1>Take Survey</h1>
        <div className="container">
            {Survey?
            (<div className="container">
                <h3>{Survey.name}</h3>
                <br></br>
                <p className="font-weight-normal">{Survey.description}</p>
                <br></br>
                <form onSubmit={e => onSubmit(e)}>
                    {Survey.questions.length > 0 ?(
                        Survey['questions'].map((question, i) => {
                            return(
                            <div className="form-group" key={i}>
                                <Question  
                                parentCallback = {handleCallback}
                                handleCallbackCheckbox = {handleCallbackCheckbox}
                                onChange={event =>(handleFormChange(i, event, question))}
                                question={question}
                                i={i} />
                            </div>)
                        })
                    ):(
                        <p>No questions found.</p>
                    )}
                <button 
                className="btn btn-primary" 
                type="submit">
                Submit
                </button>
                </form>
                <p className="font-weight-light">Expires at: {Survey.deadline}</p>
            </div>
            ):(
            <div className="empty">
            </div>
            )}
        </div>
    </div>)
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { submit })(TakeSurvey); 