import React from "react";
import { Link} from 'react-router-dom';

export const SurveyCard = ({survey}) => {
    let total_submissions = 'total_submissions' in survey;
    const date = new Date(survey.deadline);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return (<div className="row">
        <div className="col-md-6 align-self-center">
            <div className="left-content">
                <span></span>
                <h4>{survey.name}</h4>
                <p className="card-text">{survey.description}</p>
                {total_submissions? (<><p><strong>Number of submissions: </strong>
                    {survey.total_submissions}</p><div className="main-button">
                        <Link to={`/results/${survey.id}`}>See {survey.name} result</Link></div>
                        </>
                    ):(<div className="main-button">
                        <Link to={`${survey.id}`}>Take survey</Link></div>
                    )}
                <br></br>
                <p>Expiry date {formattedDate}</p>
            </div>
        </div>
    </div>);
}
