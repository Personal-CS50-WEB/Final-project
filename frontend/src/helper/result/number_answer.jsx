import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

export const NumberAnswer = ({question}) => {
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
    const intSum =  Object.keys(numberOccurence).reduce((intSum, key) => 
        intSum + numberOccurence[key], 0);
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
        </>);
}
