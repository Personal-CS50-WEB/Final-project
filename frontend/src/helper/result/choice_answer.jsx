import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

export const ChoiceAnswer = ({ question }) => {
    const options = question.answers.map((answer) => answer.options_answers).flat();
    var optionOccurence = {};
    
    options.forEach((option) => {
        if (optionOccurence[option.option]) {
            optionOccurence[option.option] += 1;
        } else {
            optionOccurence[option.option] = 1;
        }
    });
    const sum = Object.keys(optionOccurence).reduce((sum, key) =>
        sum + optionOccurence[key], 0);
        
    return (<div data-testid='choice-result'>
        <h5  className="card-title">Answers:</h5>
            <div className="list-group list-group-flush"> 
                {question.answers.length > 0 ? (question.options.map((option,i) =>(< div key={i}>
                    { options.some(el => parseInt(el.option) === parseInt(option.id)) ? (
                        <div className="list-group-item" key={option.id}>
                            <div className="row gy-2 gx-3 align-items-center" >
                                <div className="col" data-testid={option.option}>
                                    {option.option}:
                                </div>
                                <div className="col-sm-9">
                                    <ProgressBar  data-testid={Math.round(100 * optionOccurence[option.id] / sum)}
                                    label={`${Math.round(100 * optionOccurence[option.id] / sum)}%`} 
                                    variant="info"
                                    now={Math.round(100 * optionOccurence[option.id] / sum)}
                                    />
                                </div>
                                <div className="col" data-testid={optionOccurence[option.id]}>
                                    ({optionOccurence[option.id]}) votes
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className="list-group-item" key={option.id}>
                            <div className="row gy-2 gx-3 align-items-center" >
                                <div className="col" data-testid={option.option}>
                                    {option.option}:
                                </div>
                                <div className="col-sm-9">
                                    <ProgressBar now={0} 
                                    variant="info"/>
                                </div>
                                <div className="col" data-testid={0}>
                                    (0) votes
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                ))):( <div className="list-group-item" >No answers</div>)}
            </div>
        </div>);
}
