import React from "react";
import { Link} from 'react-router-dom';

export const Table = ({submissions}) => {
    
    return (
        <table className="table table-hover">
            <thead className='text-light' >
                <tr>
                    <th scope="col">Number</th>
                        {submissions[0].user_data? (
                        <th scope="col">Survey taker</th>
                        ):(
                        <th scope="col">Survey name</th>)
                    }
                    
                    <th scope="col">Time created</th>
                </tr>
            </thead>
            <tbody>
                {submissions.map((submission, index) =>(  
                <tr key= {index}>
                    <th className='text-light' scope="row">{parseInt(index) + 1}</th>
                    {submission.user_data? (<td>
                        <Link className="btn btn-link"
                        to={`/submissions/${submission.id}`}
                        >{submission.user_data.username}
                        </Link>
                    </td>):(<td>
                        <Link className="btn btn-link"
                        to={`/submissions/${submission.id}`}
                        >{submission.survey_data.name}
                        </Link>
                    </td>)}
                    <td className='text-light'>
                        {new Date(submission.timecreated).toLocaleDateString()} {new Date(submission.timecreated).toLocaleTimeString()}
                    </td>
                    
                </tr> 
                ))}    
            </tbody>
        </table>
    );
};