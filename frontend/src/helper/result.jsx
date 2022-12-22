import React from "react";

export const Question = ({question}) => {

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
                            ))):( <li className="list-group-item" >No answers</li>)
                        }
                        </ul>
                    </>)
                } else if (['SCORE', 'INTEGER'].indexOf(question.type)> -1) {
                    return (<div className="form-group" >
                        
                    </div>)
                } else if (question.type ==="RADIO") {
                    return (<>
                        </>                   
                    )
                } else {
                    return (<>
                        </>
                    )
                }
            })()  
            }
                
            </div>
    </div>);
}