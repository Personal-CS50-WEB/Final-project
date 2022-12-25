import React, { useState } from "react";
import { TextQuestion } from "./text_question";
import { RadioQuestion, CheckboxQuestion } from "./choice_question";
import { NumQuestion } from "./num_question";

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
                    return (
                    <TextQuestion question={question}
                    onChange={onChange} i={i}/>
                    )
                } else if (['SCORE', 'INTEGER'].indexOf(question.type)> -1) {
                    return (
                        <NumQuestion question={question}
                        onChange={onChange} i={i} />
                    )
                } else if (question.type ==="RADIO") {
                    return (
                        <RadioQuestion question={question}
                        handleRadio={handleRadio}
                        options={options}/>                  
                    )
                } else {
                    return (
                        <CheckboxQuestion question={question}
                        handleChecked={handleChecked}
                        checkedState={checkedState}/>
                    )
                }
            })()  
            }
        </div>
    );
};
