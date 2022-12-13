import React, { useEffect, useState } from "react";
import axios from 'axios';
import {UserSurveyCard} from "../helper/surveys";
import { checkAuthenticated } from "../actions/auth"
import { connect } from "react-redux";
import {  Navigate } from "react-router-dom";

const UserSurveys = ({ isAuthenticated  })  =>{
    if (!isAuthenticated){
            return <Navigate to='/login' />
    }
    checkAuthenticated()
    const [ userSurveys, setUserSurvey ] = useState([]);

    useEffect(()  => {
        const fetchData = () => async dispatch => {
            await dispatch(checkAuthenticated);
        }
        return function cleanup(){fetchData()}
        
    },[]);
    useEffect(()  => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/survey/user/`, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }})
        .then(res => setUserSurvey(res.data))
    },[]);
    return (<>
        <div className="jumbotron">
            <h2>Your active surveys</h2>
            </div>
        <div className="container">
            {userSurveys.length > 0 ?
            (
                <div className="container">
                    {userSurveys.map((survey) =>(
                        <div className="container">
                        <UserSurveyCard  survey={survey}/>
                        <br></br>
                        </div>
                    ))}
                </div> 
            ):(
            <div className="empty">
                <h2> No Surveys found</h2>
            </div>
            )}
        </div>
    </>)
}
export const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {  })(UserSurveys); 