import React from "react";
import { Link} from 'react-router-dom';

export const SurveyCard = ({survey}) => {
    return (
        <div className="card text-center">
            <h5 className="card-header">{survey.name}</h5>
            <div className="card-body">
                <p className="card-text">{survey.description}</p>
                <Link className="btn btn-primary" to={`/survey/${survey.id}`}>Take survey</Link>
            </div>
            <div className="card-footer text-muted">
                Expires in {survey.deadline}
            </div>
        </div>
    );
};
