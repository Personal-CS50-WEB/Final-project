import React, { useState } from "react";

export const Question = ({question , i, onChange, parentCallback, handleCallbackCheckbox  }) => {

    const [checkedState, setCheckedState] = useState(
        new Array(question.options.length).fill(false)
    );

    const [options_answers, setOptions_answers] = useState([]);
    
    const handleChecked = (e, optionIndex) => {
        checkedState[optionIndex] = !checkedState[optionIndex];
        setCheckedState([...checkedState]);
        let prev = options_answers;
        let itemIndex = prev.findIndex(o => o.option === e.target.value)
        
        if (!checkedState[optionIndex]) {
            prev.splice(itemIndex, 1);
            console.log(itemIndex, optionIndex,e.target.value);
        } else if(checkedState[optionIndex]) {
        prev.push({option: e.target.value});
        }
        setOptions_answers([...prev]);
        console.log(options_answers);
        handleCallbackCheckbox(options_answers);
        onChange();
    };

    const [options, setOption] = useState({});

    function handleRadio (event, optionIndex) {
        checkedState[optionIndex] = !checkedState[optionIndex];
        setCheckedState([...checkedState])
        let prev = options;
        prev.option = event.target.value;
        setOption(prev);
        parentCallback(options);
        onChange();
    }
    return (
        <div className="form-group">
            {(() => {
                if(question.type ==="TEXT-ANSWER") {
                    return (<div className="form-group" key={i}>
                        <p className="font-weight-bold" value= {question.id}>{question.text}</p>
                        <textarea className='form-control'
                        name='text'
                        required
                        placeholder='Write your answer' 
                        onChange ={onChange}
                        />
                        </div>
                    )
                } else if (['SCORE', 'INTEGER'].indexOf(question.type)> -1) {
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
                        </div>
                    )
                } else if (question.type ==="RADIO") {
                    return (<>
                        <p className="font-weight-bold" value= {question.id}>{question.text}</p>
                        {question.options.length > 0 ?(
                            question['options'].map((option, index) => {
                                return(
                                <div className="radio"key={option.id} >
                                <label>
                                    <input
                                    checked={option.id == options.option}
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
                        )}
                        </>                   
                    )
                } else {
                    return (<>
                        <p className="font-weight-bold" value= {question.id}>{question.text}</p>
                        {question.options.length > 0 ?(
                            question['options'].map((option, optionIndex) => {
                                return(
                                <div className="radio"key={optionIndex}>
                                <label>
                                    <input
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
                        )}
                        </>
                    )
                }
            })()  
            }
        </div>
    );
};
