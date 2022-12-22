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
export const Table = ({userSurveys, openModal, endSurvy}) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Survey</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Sumissions</th>
                    <th scope="col">Edit</th>
                    <th scope="col"></th>    
                </tr>
            </thead>
            <tbody>
                {userSurveys.map((survey, index) =>(  
                <tr key= {index}>
                    <th scope="row">{index}</th>
                    <td >{survey.name}</td>
                    <td>{survey.deadline}</td>
                    <td>
                        <Link className="btn btn-primary"
                        to='/survey/submission/' 
                        state={{ survey: survey.id }}
                        >{survey.total_submissions}
                        </Link>
                    </td>
                    <td>
                        <button className="btn btn-primary"   
                        onClick={e=> openModal(e, survey.id, index)}
                        >Extend deadline</button>
                    </td>
                    <td>
                        <button className="btn btn-primary"
                        onClick={(event) => endSurvy(event, survey.id, index)} 
                        >Close survey</button>
                    </td>
                </tr> 
                ))}    
            </tbody>
        </table>
    );
};
