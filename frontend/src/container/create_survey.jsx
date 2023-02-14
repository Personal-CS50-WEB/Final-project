import React, { useState, useEffect } from "react";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
import { connect } from "react-redux";
import  { create } from "../actions/survey";
import { Navigate, useNavigate  } from "react-router-dom";
import { QuestionFields } from "../helper/create_survey/question_fields";
import { SurveyInfoFields } from "../helper/create_survey/survey_info";

const CreateSurvey = ({ create, isAuthenticated  }) => {
    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    let history = useNavigate();
    // set the question types
    const [questionsType, setData] = useState([]);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    //call api to get questions types 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/types/`, config)
        .then(res => setData(res.data))
        .catch(console.error)
    },[]);

    // set questions type and text
    const [questions, setQuestions] = useState([
        { text: '',
        type: '',
        }
    ]);

    // handle question fields change
    const handleFormChange = (index, event) => {
        let data = [...questions];
        data[index][event.target.name] = event.target.value;
        if (event.target.value ==='CHECKBOX' || event.target.value ==='RADIO' ){
            let options = [{option:''}];
        questions[index].options = options ;
        }
        else if (['TEXT-ANSWER', 'INTEGER', 'SCORE'].indexOf(event.target.value)> -1){
            delete questions[index].options;
        }
        setQuestions([...questions]);
    }
    // handle options 
    const handleOptionChange = (index,i, event) => {
        questions[index].options[i].option =  event.target.value;
        setQuestions([...questions]);
    }
    // add question to questions
    const addQuestion = () => {
        let newfield = { 
            text: '', 
            type: '' , 
        };
        setQuestions([...questions, newfield]);
    }

    // remove question from questions
    const removeQuestion = (e, index) => {
        let data = [...questions];
        data.splice(index, 1);
        setQuestions([...data]);
    }
    // add option from question options
    const addOption = (event, index) => {
        event.stopPropagation();
        let newO = {option:''};
        questions[index]['options'] = questions[index]['options'].concat(newO);
        setQuestions([...questions ]);
    }

    // remove option from question options
    const removeOption = (event, index, i) => {
        event.preventDefault();
        questions[index].options.splice(i, 1);
        setQuestions([...questions])
    }

    const isValidDate = (date) =>{
        return date > new Date();
    }

    // handle survey deadline
    const [deadline, setDeadline] = useState(new Date());
    const [inputFields, setInputFields] = useState({
        name: '',
        description: ''
    });
    //survey name and description
    const { name, description } = inputFields;
    const onChange = e => setInputFields({ ...inputFields, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        create(name, description, deadline, questions, history);
    };
    return (<section id="section5" 
    className="section page"
    data-section="section5"
    data-testid='create-survey'>
        <div className="container">
        <h1 className='text-light'>Create survey</h1>
            <form onSubmit={e => onSubmit(e)}>
                <SurveyInfoFields name={name}
                description={description}
                onChange={onChange} />
                <div className="form-group">
                <label>Deadline</label>
                <Datetime
                data-testid='Deadline'
                value={deadline}
                isValidDate={isValidDate}
                utc={true}
                name ='deadline'
                onChange={setDeadline}
                />
                </div>
                {questions.map((input, index) => {
                    return (<div key={index}>
                        <QuestionFields input={input}
                        index={index}
                        handleFormChange={handleFormChange}
                        questionsType={questionsType}
                        removeQuestion={removeQuestion}
                        handleOptionChange={handleOptionChange}
                        removeOption={removeOption}
                        addOption={addOption}/> 
                    </div>)
                    })}
                    <button 
                    data-testid='Add question..'
                    className="btn btn-outline-warning col-2" 
                    type="button"
                    onClick={addQuestion}>Add question..
                    </button>
                <button 
                data-testid='submit'
                className="btn btn-warning" 
                disabled={questions[0].text === ''||
                questions[0].type ===''
                ||
                inputFields.name === ''}
                type="submit">
                Submit
                </button>
            </form>
        </div>
    </section>)   
}
export const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { create })(CreateSurvey); 