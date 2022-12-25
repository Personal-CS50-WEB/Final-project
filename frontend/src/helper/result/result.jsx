import React from "react";
import {TextAnswer } from "./text_answer";
import { NumberAnswer } from "./number_answer";
import { ChoiceAnswer } from "./choice_answer";

export const Question = ({question}) => {
        
    return (<div className="card">
            <div className="card-header">
                <span className="font-weight-bold">Q: </span>{question.text}
            </div>
            <div className="card-body">
            {(() => {
                if(question.type ==="TEXT-ANSWER") {
                    return (<TextAnswer question={question}/>)

                } else if (['SCORE', 'INTEGER'].indexOf(question.type)> -1) {
                    return (
                        <NumberAnswer question={question} key={question.id} />
                    )
                } else {
                    return (<div key={question.id}>
                    <ChoiceAnswer question={question}/>
                    </div>)
                }
            })()}
        </div>
    </div>);
}