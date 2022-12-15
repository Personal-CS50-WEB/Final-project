import React, { useEffect, useState } from "react";
import axios from 'axios';
import { checkAuthenticated } from "../actions/auth"
import { connect } from "react-redux";
import {  Navigate, useNavigate } from "react-router-dom";
import { edit } from "../actions/survey";
import Modal from 'react-modal';
import Datetime from 'react-datetime';

const UserSurveys = ({ isAuthenticated , edit , checkAuthenticated })  =>{
    //if not authenticated return to login page
    if (!isAuthenticated){
            return <Navigate to='/login' />
    }
    let history = useNavigate ();
    const [ userSurveys, setUserSurvey ] = useState([]);
    
    // check token
    useEffect(()  =>  {
    checkAuthenticated();
    },[]);
    // call api for user surveys
    useEffect(()  => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/survey/user/`, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }})
        .then(res => setUserSurvey(res.data))
    },[checkAuthenticated]);

    const [surveyId, setId] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIndex, setIndex] = useState();

    // when click edit survey button
    const openModal = (e, id, index) =>{
        setIsOpen(true);
        setId(id);
        setIndex(index);
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    const endDate = new Date();
    const [newDate, setNewDate] = useState(new Date());

    // when user click end survey
    const endSurvy = (event, id, i) => {
        event.preventDefault();
        edit(endDate, id);
        userSurveys.splice(i, 1);
        setUserSurvey( [...userSurveys]);
    }

    //when user click save changes
    const editDeadline = (event, modalIndex) => {
        event.preventDefault();
        closeModal();
        edit(newDate, surveyId, modalIndex , history, userSurveys);
    }

    return (<>
        <div className="jumbotron">
            <h2>Your active surveys</h2>
            </div>
        <div className="container">
            {userSurveys.length > 0 ?
            (
                <div className="container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Survey</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Edit</th>
                        <th scope="col"></th>    
                    </tr>
                </thead>
                <tbody>
                    {userSurveys.map((survey, index) =>(  
                    <tr key= {index}>
                        <th scope="row">{survey.name}</th>
                        <td>{survey.deadline}</td>
                        <td>
                        <button className="btn btn-primary"   
                        onClick={e=> openModal(e, survey.id, index)}
                        >Edit survey's deadline</button>
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
            <Modal
            modalIndex={modalIndex}
            style={{
                content: {
                    position: 'absolute',
                    top: '100px',
                    left: '40px',
                    right: '40px',
                    bottom: '100px',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                    border: 'none'
                }}}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit deadline</h5>       
                        <button type="button"
                        className="close"   
                        data-dismiss="modal" aria-label="Close"
                        onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <label>Deadline</label>
                        <Datetime
                        name ='newDate'
                        value={newDate}
                        onChange={ setNewDate }
                        />
                    </div>
                    <div className="modal-footer">
                        <button 
                        onClick={e => editDeadline(e, modalIndex) }
                        className="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
            </Modal>
            </div>
            ):(
            <div className="empty">
            </div>
            )}
        </div>
    </>)
}
export const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {  edit, checkAuthenticated })(UserSurveys); 