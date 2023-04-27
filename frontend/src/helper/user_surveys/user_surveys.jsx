import React from "react";
import { Link} from 'react-router-dom';

export const Table = ({userSurveys, openModal, endSurvy}) => {
    return (
        <table className="table table-hover">
            <thead className='text-light'>
                <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Survey</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Submissions</th>
                    <th scope="col">Edit</th>
                    <th scope="col"></th>    
                </tr>
            </thead>
            <tbody>
                {userSurveys.map((survey, index) =>(  
                <tr key= {index}>
                    <th className='text-light' scope="row">{parseInt(index) + 1}</th>
                    <td className='text-light' >{survey.name}</td>
                    <td className='text-light'>{new Date(survey.deadline).toLocaleDateString()} {new Date(survey.deadline).toLocaleTimeString()}</td>
                    <td>
                        <Link className="btn btn-warning"
                        to='/survey/submissions' 
                        state={{ survey: survey.id }}
                        >{survey.total_submissions}
                        </Link>
                    </td>
                    <td>
                        <button className="btn btn-warning"  
                        onClick={e=> openModal(e, survey.id, index)}
                        >Extend deadline</button>
                    </td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={(event) => endSurvy(event, survey.id, index)} 
                        >Close survey</button>
                    </td>
                </tr> 
                ))}    
            </tbody>
        </table>
    );
};
