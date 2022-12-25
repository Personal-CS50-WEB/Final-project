import React from "react";

export const Answer = ({answer}) => {
    return (<div className="card">
        <div className="card-header">
            <span className="font-weight-bold">Q: </span>{answer.question_data.text}
        </div>
        <div className="card-body">
        {(() => {
            if(answer.question_data.type ==="TEXT-ANSWER") {
                return (<>
                    <h5 className="card-title">Answer:</h5>
                    <p className="card-text">{answer.text_answer.text}</p>
                </>)
            } else if (answer.question_data.type ==="INTEGER") {
                return (<>
                    <h5 className="card-title">Answer:</h5>
                    <p className="card-text">{answer.integer_answer.integer}</p>
                </>)
            } else if (answer.question_data.type ==="RADIO") {
                return (<>
                    <h5 className="card-title">Answer:</h5>
                    <p className="card-text">{answer.options_answers[0].option}</p>
                </>)
            } else {
                return (<>
                    <h5 className="card-title">Answers:</h5>
                    <ul className="list-group list-group-flush"> 
                    {answer.options_answers.map((option, i) =>(
                        <li className="list-group-item" key={i}>{option.option}</li>
                    ))}
                    </ul>
                </>)
            }
        })()}    
        </div>
    </div>);
}