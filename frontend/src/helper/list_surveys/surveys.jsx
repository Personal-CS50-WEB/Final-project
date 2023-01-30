import React from "react";
import { Link} from 'react-router-dom';

export const SurveyCard = ({survey}) => {
    let total_submissions = 'total_submissions' in survey;
    return (<div className="row">
        <div className="col-md-6 align-self-center">
            <div className="left-content">
                <span></span>
                <h4>{survey.name}</h4>
                <p className="card-text">{survey.description}</p>
                {total_submissions? (<>
                    <p>{survey.total_submissions}</p><div className="main-button">
                        <Link to={`/survey/result/${survey.id}`}>See {survey.name} result</Link></div>
                        </>
                    ):(<div className="main-button">
                        <Link to={`/survey/${survey.id}`}>Take survey</Link></div>
                    )}
                <br></br>
                <p>Expires in {survey.deadline}</p>
            </div>
        </div>
    </div>);
}
