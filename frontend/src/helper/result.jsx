import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

export const Question = ({question}) => {
    const options = question.answers.map((answer) => answer.options_answers).flat();
    var optionOccurence = {};
    
    options.forEach((option) => {
        if (optionOccurence[option.option]) {
            optionOccurence[option.option] += 1;
        } else {
            optionOccurence[option.option] = 1;
        }
    });

    const numbers = question.answers.map((answer) => answer.integer_answer);

    var numberOccurence = {};
    numbers.forEach((number) => {
        if (number){
            if (numberOccurence[number.integer]) {
                numberOccurence[number.integer] += 1;
            } else {
                numberOccurence[number.integer] = 1;
            }
        }
    });

    const sum = Object.keys(optionOccurence).reduce((sum, key) =>
        sum + optionOccurence[key], 0);
    const intSum =  Object.keys(numberOccurence).reduce((intSum, key) => 
        intSum + numberOccurence[key], 0);
    
    return (<div className="card">
            <div className="card-header">
                <span className="font-weight-bold">Q: </span>{question.text}
            </div>
            <div className="card-body">
            {(() => {
                if(question.type ==="TEXT-ANSWER") {
                    return (<>
                        <h5 className="card-title">Answers:</h5>
                        <ul className="list-group"> 
                            {question.answers.length > 0 ? (question.answers.map((answer , i) =>(
                                <li className="list-group-item" key={i}>{answer.text_answer.text}</li>
                            ))):( <li className="list-group-item" >No answers</li>)}
                        </ul>
                    </>)
                } else if (['SCORE', 'INTEGER'].indexOf(question.type)> -1) {
                    return (<>
                        <h5 className="card-title">Answers:</h5>
                            <div className="list-group list-group-flush"> 
                                {question.answers.length > 0 ? (
                                    Object.entries(numberOccurence).map(([key, value]) =>
                                    <div className="list-group-item" k={key}>
                                        <div className="row gy-2 gx-3 align-items-center" >
                                            <div className="col">{key}:</div>
                                            <div className="col-sm-9">
                                                <ProgressBar variant="info" 
                                                now={Math.round(100 * value / intSum)} 
                                                label={`${Math.round(100 * value / intSum)}%`} />
                                            </div>
                                            <div className="col">
                                                ({value}) votes
                                            </div>
                                        </div>
                                    </div>
                                )): ( <div className="list-group-item" >No answers</div>)}
                            </div>
                        </>)
                } else {//Math.round(100 * value / intSum)  
                    return (<>
                    <h5 className="card-title">Answers:</h5>
                        <div className="list-group list-group-flush"> 
                            {question.answers.length > 0 ? (question.options.map((option,i) =>(<>
                                { options.some(el => el.option == option.id) ? (
                                    <div className="list-group-item" key={option.id}>
                                        <div className="row gy-2 gx-3 align-items-center" >
                                            <div className="col">
                                                {option.option}:
                                            </div>
                                            <div className="col-sm-9">
                                                <ProgressBar 
                                                
                                                label={`${Math.round(100 * optionOccurence[option.id] / sum)}%`} 
                                                variant="info"
                                                now={Math.round(100 * optionOccurence[option.id] / sum)}
                                                />
                                            </div>
                                            <div className="col">
                                                ({optionOccurence[option.id]}) votes
                                            </div>
                                        </div>
                                    </div>
                                ):(
                                    <div className="list-group-item" 
                                
                                    key={option.id}>
                                        <ProgressBar now={0} 
                                        variant="info"/>
                                        {option.option} : 0
                                    </div>
                                )}
                                </>
                            ))):( <div className="list-group-item" >No answers</div>)}
                        </div>
                    </>)
                }
            })()}
        </div>
    </div>);
}