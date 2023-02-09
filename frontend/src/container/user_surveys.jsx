import React, { useEffect, useState } from "react";
import axios from 'axios';
import { checkAuthenticated } from "../actions/auth"
import { connect } from "react-redux";
import {  Navigate, useNavigate } from "react-router-dom";
import { edit } from "../actions/survey";
import Modal from 'react-modal';
import { style } from "../helper/user_surveys/style";
import { Table } from "../helper/user_surveys/user_surveys";
import { ModalForm } from "../helper/user_surveys/modal_form";

const UserSurveys = ({ isAuthenticated, edit, checkAuthenticated })  =>{
    //if not authenticated return to login page
    if (!isAuthenticated){
            return <Navigate to='/login' />
    }
    let history = useNavigate ();
    const [ userSurveys, setUserSurvey ] = useState([]);
        
    useEffect(() => {
        async function fetchData() {
            // check token
            await checkAuthenticated();
            // call api for user surveys
            await axios.get(`${process.env.REACT_APP_API_URL}/api/survey/user/`, {headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT  ${localStorage.getItem('access')}`,
            }})
            .then(res => setUserSurvey(res.data))
            .catch(console.error)
        }
        fetchData();
    }, []);    

    const [surveyId, setId] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIndex, setIndex] = useState();

    // when click edit survey button
    const openModal = (e, id, index) =>{
        setIsOpen(true);
        setId(id);
        setIndex(index);
        setNewDate(userSurveys[index].deadline)
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    const [newDate, setNewDate] = useState(new Date());

    // when user click end survey
    const endSurvy = (event, id, i) => {
        event.preventDefault();
        edit(new Date(), id);
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
        <section  className="section page" data-section="section5">
            <div className="container">
                <h2 className='text-light'>Your active surveys</h2>
            </div>
        </section>
        <div className="container">
            {userSurveys.length > 0 ?
            (
            <div className="table-responsive">
            <Table userSurveys= {userSurveys}
            openModal={openModal}
            endSurvy={endSurvy} />
            <Modal
            modalIndex={modalIndex}
            style={style}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            >
                <ModalForm closeModal={closeModal}
                newDate={newDate}
                setNewDate={setNewDate}
                editDeadline={editDeadline}
                modalIndex={modalIndex}/>
            </Modal>
            </div>
            ):(
            <div className="empty">
            </div>
            )}
        </div>
    </>)
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {  edit, checkAuthenticated })(UserSurveys); 