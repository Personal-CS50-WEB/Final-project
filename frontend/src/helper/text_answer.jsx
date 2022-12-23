import React from "react";

export const TextAnswer = ({question}) => {
    
    return (<>
        <h5 className="card-title">Answers:</h5>
        <ul className="list-group"> 
            {question.answers.length > 0 ? (question.answers.map((answer , i) =>(
                <li className="list-group-item" key={i}>{answer.text_answer.text}</li>
            ))):( <li className="list-group-item" >No answers</li>)}
        </ul>
    </>);
}
