import React from "react";

export const NumQuestion = ({question, onChange, i}) => {
    return (<div className="form-group" key={i}>
    <p className="font-weight-bold" value= {question.id}>{question.text}</p>
    <input className='form-control'
    type="number"
    min={question.type ==="SCORE" ? (1): (null)}
    max={question.type ==="SCORE" ? (10): (null)}
    name='integer_answers'
    onChange ={onChange} 
    required
    />
</div>);
}