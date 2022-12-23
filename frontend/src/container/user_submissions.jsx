import React, { useEffect, useState } from "react";
import axios from 'axios';
import { checkAuthenticated } from "../actions/auth"
import { connect } from "react-redux";
import {  Navigate  } from "react-router-dom";
import { Table } from "../helper/submissions";

const  SurveySubmissions = ({ isAuthenticated, checkAuthenticated })  => {

    // redirect user tto login page if not authenticated
    if (!isAuthenticated){
        return <Navigate to='/login' />
    }
    const [ submissions, setSubmission ] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            // check token
            await checkAuthenticated();
            // call api for  survey submissions
            await axios.get(`${process.env.REACT_APP_API_URL}/api/user/submission/`, { headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT  ${localStorage.getItem('access')}`,
            }})
            .then(res => setSubmission(res.data))
            .catch(console.error)
        }
        fetchData();
    }, []);    
    return (<>
        <div className="jumbotron">
            <h2>Survey submissions</h2>
            </div>
        <div className="container">
            {submissions.length > 0 ?
            (
            <div className="table-responsive">
                <Table submissions = {submissions} />
            </div>
            ):(
            <div className="container">
                No submissions found
            </div>
            )}
        </div>
    </>)
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { checkAuthenticated })(SurveySubmissions); 