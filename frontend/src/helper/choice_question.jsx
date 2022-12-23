import React from "react";

export const RadioQuestion = ({question, handleRadio, options}) => {
    return (<>
        <p className="font-weight-bold" value= {question.id}>{question.text}</p>
        {question.options.length > 0 ?(
            question['options'].map((option, index) => {
                return(
                <div className="form-check" key={option.id} >
                <label className="form-check-label">
                    <input
                    className="form-check-input"
                    checked={option.id === parseInt(options.option)}
                    type="radio"
                    value={option.id}
                    onChange={(e=> handleRadio(e))}
                    />
                {option.option}
                </label>
                </div>)
            })
        ):(
            <p></p>
        )} </>   
    );
}

export const CheckboxQuestion = ({question, handleChecked, checkedState}) => {
    return (<>
        <p className="font-weight-bold" value= {question.id}>{question.text}</p>
        {question.options.length > 0 ?(
            question['options'].map((option, optionIndex) => {
                return(
                <div className="form-check" key={optionIndex}>
                <label className="form-check-label">
                    <input
                    className="form-check-input" 
                    type="checkbox"
                    value={option.id}
                    checked={checkedState[optionIndex]}
                    onChange={((e) => handleChecked(e, optionIndex))}
                    />
                {option.option}
                </label>
                </div>)
            })
        ):(
            <p></p>
        )}</> 
    );
}