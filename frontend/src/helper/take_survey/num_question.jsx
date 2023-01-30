import React from "react";
import ReactStars from "react-rating-stars-component";

export const NumQuestion = ({question, onChange, i}) => {
    return (<div className="form-group" key={i}>
    <p className="font-weight-bold" value= {question.id}>{question.text}</p>
    {question.type ==="SCORE" ? (<ReactStars
        count={5}
        name='integer_answer'
        value={0}
        onChange={onChange}
        size={24}
        activeColor="#ffd700"
        />
    ): (
        <input className='form-control'
        type="number"
        name='integer_answers'
        onChange ={onChange} 
        required
        />)}

</div>);
}