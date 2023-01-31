import React from "react";

export const QuestionFields = ({input, index, handleFormChange, 
    questionsType, removeQuestion,
    handleOptionChange, removeOption,addOption}) => {
    return (<div className="form">
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
                    </option>
                    )})) : ( <option>Data Loading...</option>)}
                </select>
            </div>
            <div className="col-7">
                <input
                className='form-control'
                value={input.text}
                name='text'
                placeholder='Question'
                onChange={(event) => handleFormChange(index, event)}
                />
            </div>
                <button 
                className="btn btn-outline-warning col-2 mb-3"
                type="button"
                onClick={(e) => removeQuestion(e, index)}>Remove question
                </button>
            </div>
            { ['CHECKBOX', 'RADIO'].indexOf(input.type)> -1 ? (<>
            <div className="form-group">
                {input['options'].map((option, i) => {
                    return (
                        <div className="form-row  align-items-center " key={i}>
                            <div className="col">
                                <input
                                className="form-control"
                                type='text'
                                name='option'
                                value={input['options'][i].option}
                                placeholder='Question option'
                                onChange={event =>(handleOptionChange(index,i, event))}
                                required />
                                <br></br>
                            </div>
                            <button 
                            className="btn btn-outline-warning col-2 mb-4"
                            type="button"
                            onClick={(event) => removeOption(event, index, i )}
                            >Remove option</button>
                        </div>)
                    })
                }
            </div>
                <button 
                className="btn btn-outline-warning col-2 mb-3" 
                type="button"
                onClick={(event) => addOption(event, index )}
                >Add option..</button>
            </>
        ) : (null)}
    </div>);
}