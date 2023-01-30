import React, { useEffect, useState } from "react";
import axios from 'axios';
import { submit } from "../actions/submit";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Question } from "../helper/take_survey/questions";

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
    
    // function to get radio question  data from child
    const handleCallback = (childData) =>{
        radio = childData
    }

    let checkbox;
     // function to get checkbox question  data from child
    const  handleCallbackCheckbox = (childData) =>{
        checkbox = childData;
    }
    let score;
    const  handleCallbackScore = (childData) =>{
        score = childData;
    }

    const handleFormChange = (i, event, question) => {
        let index;
        // if not first record or question id exist in submission answers 
        // : add new answer to submissionAnswers, set data index
        if (submissionAnswers.findIndex(answer => answer.question === question.id) === -1 
        && submissionAnswers[0]['question'] !== ''){
            addAnswer();
            index = submissionAnswers.length -1;

        // if answer exist get the index
        } else {
            index = submissionAnswers.findIndex(answer => answer.question === question.id)
            if(index === -1){ index = 0;}
        }
        submissionAnswers[index].question = question.id

        // handle text answer
        if (question.type === 'TEXT-ANSWER'){
            let text_answer = {
                "text": ''
            }
            submissionAnswers[index].text_answer = text_answer ;
            submissionAnswers[index].text_answer.text = event.target.value;

        // handle number answer
        } else if (question.type === 'INTEGER' || question.type === 'SCORE'){
            let integer_answer = {
                integer: null
            };
            submissionAnswers[index].integer_answer = integer_answer;
            if( question.type === 'SCORE') {
                submissionAnswers[index].integer_answer.integer = parseInt(score);
            }
            else{
                submissionAnswers[index].integer_answer.integer = parseInt(event.target.value);

            }
        // handle radio answer
        } else if (question.type === 'RADIO'){
            submissionAnswers[index].options_answers = [radio];

        // handle checkbox answer
        } else {
            submissionAnswers[index].options_answers = checkbox; 
        }
        SetSubmissionAnswers([...submissionAnswers]);
    }

    const onSubmit = e => {
        e.preventDefault();
        submit(id, submissionAnswers, history);
    }
    return (<>
    <section id="section5" className="section video" data-section="section5">
            <div className="container">
                <h2 className='text-light'>Take Survey</h2>
            </div>
        </section>
        <div className="container">
            <br></br>
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
                                handleCallbackScore= {handleCallbackScore}
                                onChange={event =>(handleFormChange(i, event, question))}
                                question={question}
                                i={i} />
                            </div>)
                        })
                    ):(<p>No questions found.</p>)}
                <button 
                disabled={submissionAnswers.length !== Survey.questions.length
                || !submissionAnswers[0]['question']}
                className="btn btn-warning" 
                type="submit">
                Submit
                </button>
                </form>
                <p className="font-weight-light">Expires at: {Survey.deadline}</p>
            </div>
            ):(<div className="empty"></div>)}
        </div>
    </>)
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { submit })(TakeSurvey); 