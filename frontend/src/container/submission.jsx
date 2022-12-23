import React, { useEffect, useState } from "react";
import axios from 'axios';
import { checkAuthenticated } from "../actions/auth"
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { Answer } from "../helper/answers";

const ViewSubmission = ({ isAuthenticated,  checkAuthenticated }) => {
    const { id } = useParams();

    //if not authenticated return to login page
    if (!isAuthenticated){
        return <Navigate to='/login' />
    }
    const [ submission, setSubmission] = useState();

    useEffect(() => {
        fetchData();
        async function fetchData() {
            await checkAuthenticated();
          // call api for submission
            await axios.get(`${process.env.REACT_APP_API_URL}/api/user/submission/${id}/`, {headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT  ${localStorage.getItem('access')}`,
            }})
            .then(res => setSubmission(res.data))
            .catch(console.error)
        }
        fetchData();
        }, []); 
    return (<div className="container mt-5">
        {submission? (<>
        <div className="jumbotron">
            <h2>{submission.survey_data.name}</h2>
        </div>
        <div className="container">
        {submission.submission_answers.length > 0 ?
            (<div className="container">
                {submission.submission_answers.map((answer, i) =>(
                    <div className="container" key={i}>
                        <Answer answer={answer} />
                        <br></br>
                    </div>
                ))}
            </div>):(<div className="empty"></div>)}
        </div>
        </>
        ):(
            null
        )}
    </div>)
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { checkAuthenticated })(ViewSubmission); 