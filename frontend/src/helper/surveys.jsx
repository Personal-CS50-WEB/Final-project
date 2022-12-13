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

export const UserSurveyCard = ({survey}) => {
    return (
        <div className="card text-center">
            <div className="card-header">
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item">
                        <button className="nav-link active">Close survey</button>
                    </li>
                </ul>
            </div>
            <div className="card-body">
                <h5 className="card-title">{survey.name}</h5>
                <p className="card-text">Expires in {survey.deadline}</p>
                <Link className="btn btn-primary" to={`/survey/edit/${survey.id}`}>Edit survey's deadline</Link>

            </div>    
        </div>
    );
};