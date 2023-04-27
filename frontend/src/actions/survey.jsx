import axios from 'axios';
import { checkAuthenticated } from "./auth"

export  const create = (name, description, deadline, questions, history, setError) => async dispatch => {
    // check token before call api to create new survey
    await dispatch(checkAuthenticated());
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }
    }
        const body = JSON.stringify({ name, description, deadline, questions });
        console.log(body)
        try {
            // call api to create survey
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/survey/user/`, body, config)
            if (res.data) {
                history("/user/surveys", {state: res.data});
            }
        }catch(err){
            setError('invalid data.');
        }
};

export  const edit = (deadline, id,  index, history, userSurveys, setError, closeModal) => async dispatch => {
    // check token before call api to update survey
    await dispatch(checkAuthenticated());
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }
    }
    const body = JSON.stringify({deadline});
    console.log(body)
    try {
         // call api to update survey
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/survey/user/${id}/`, body, config)
        if (res.data && history) {
            await history("/user/surveys", {state: userSurveys[index].deadline = res.data.deadline});
            closeModal();
        }
    }catch(err){
    
        setError('Invalid date.');
    }
};
