import React, { useState, useEffect } from "react";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
import { connect } from "react-redux";
import  { create } from "../actions/survey";
import { Navigate, useNavigate  } from "react-router-dom";

const CreateSurvey = ({ create, isAuthenticated  }) => {
    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    let history = useNavigate();
    // set the questio;n types
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

    // set questions
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
        questions[index]['options'].text =  event.target.value;
        let questionOptions = questions[index]['options'];
        questionOptions[i][event.target.name] = event.target.value ;
        setQuestions([...questions]);
    }

    const addQuestion = () => {
        let newfield = { 
            text: '', 
            type: '' , 
        };
        setQuestions([...questions, newfield]);
    }

    const removeQuestion = (index) => {
        let data = [...questions];
        data.splice(index, 1);
        setQuestions(data);
    }

    const addOption = (event, index) => {
        event.stopPropagation();
        let newO = {option:''};
        questions[index]['options'] = questions[index]['options'].concat(newO);
        setQuestions([...questions ]);
    }
    
    const removeOption = (event, index, i) => {
        event.preventDefault();
        let data = [...questions[index].options];
        data.splice(i, 1);
        setQuestions([...questions])
    }
     // survey deadline
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
    return (
        <div className="container mt-5">
        <h1>Create survey</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <label>Survey name</label>
                    <input className="form-control"
                    type='text'
                    name='name'
                    placeholder='Survey name'
                    value={name}
                    onChange={e => onChange(e)}
                    required
                />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className='form-control'
                    name='description'
                    placeholder='Description' 
                    value={description} 
                    onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                <label>Deadline</label>
                <Datetime
                name ='deadline'
                onChange={setDeadline}
                />
                </div>
                {questions.map((input, index) => {
                    return (
                        <div className="form" key={index}>
                            <div className="form-row">
                            <div className="col">
                            <select
                            className="custom-select mr-sm-2" 
                            id="inlineFormCustomSelect"
                            name='type'
                            defaultValue="Select"
                            onChange={event =>(handleFormChange(index, event))}>
                                <option
                                value="Select" 
                                disabled
                                >Select type</option>
                                {questionsType.length !== 0 ? (questionsType.map((option) => {
                                    return(<option key={option.key}
                                        name='type' value={option.key}>
                                        {option.value}
                                        </option>)
                                }))
                                :
                                ( <option>Data Loading...</option>)}
                            </select>
                        </div>
                        <div className="col-7">
                            <input
                            className='form-control'
                            
                            name='text'
                            placeholder='Question'
                            onChange={event => handleFormChange(index, event)}
                            />
                        </div>
                        <button 
                        className="btn btn-outline-primary mb-2"
                        type="button"
                        onClick={() => removeQuestion(index)}>Remove
                        </button>
                        </div>
                        { ['CHECKBOX', 'RADIO'].indexOf(input.type)> -1 ? (<>
                        <div className="form-group">
                            {input['options'].map((option, i) => {
                                return (
                                    <div className="form-row" key={i}>
                                    
                                        <div className=" col">
                                            <input
                                            className="form-control"
                                            type='text'
                                            name='option'
                                            placeholder='Question option'
                                            onChange={event =>(handleOptionChange(index,i, event))}
                                            required />
                                            <br></br>
                                        </div>
                                        <button 
                                        className="btn btn-outline-primary mb-2"
                                        type="button"
                                        onClick={(event) => removeOption(event, index, i )}
                                        >Remove option</button>
                                    </div>)
                                })
                            }
                        </div>
                            <button 
                            className="btn btn-outline-primary mb-2" 
                            type="button"
                            onClick={(event) => addOption(event, index )}
                            >Add option..</button>
                        </>
                        )
                        : 
                        (console.log(input)) }
                        </div> 
                    )
                    })}
                    <button 
                    className="btn btn-outline-primary" 
                    type="button"
                    onClick={addQuestion}>Add question..
                    </button>
                <button 
                className="btn btn-primary" 
                disabled={questions[0].text === ''||
                questions[0].type ===''
                ||
                inputFields.name === ''}
                type="submit">
                Submit
                </button>
            </form>
        </div>
    )   
}
export const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { create })(CreateSurvey); 
