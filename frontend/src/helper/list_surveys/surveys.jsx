import React from "react";
import { Link} from 'react-router-dom';

export const SurveyCard = ({survey}) => {
    let total_submissions = 'total_submissions' in survey;
    return (
        <div className="card text-center">
            <h5 className="card-header">{survey.name}</h5>
            <div className="card-body">
                <p className="card-text">{survey.description}</p>
                {total_submissions? (<>
                    <p className="card-text">{survey.total_submissions}</p>
                    <Link className="btn btn-primary" to={`/survey/result/${survey.id}`}>See {survey.name} result</Link>
                    </>
                ):(
                    <Link className="btn btn-primary" to={`/survey/${survey.id}`}>Take survey</Link>
                )}
            </div>
            <div className="card-footer text-muted">
                Expires in {survey.deadline}
            </div>
        </div>
    );
}
