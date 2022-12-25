import React from "react";

export const TextQuestion = ({question, onChange, i}) => {
    return (<div className="form-group" key={i}>
    <p className="font-weight-bold" value= {question.id}>{question.text}</p>
    <textarea className='form-control'
    name='text'
    required
    placeholder='Write your answer' 
    onChange ={onChange}
    />
</div>);
}