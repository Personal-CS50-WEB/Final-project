import axios from 'axios';
import { checkAuthenticated } from "./auth"

export  const create = (name, description, deadline, questions, history) => async dispatch => {
    // check token before call api to create new survey
    await dispatch(checkAuthenticated());
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }
    }
        const body = JSON.stringify({ name, description, deadline, questions });
        try {
            // call api to create survey
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/survey/user/`, body, config)
            if (res.data) {

                history("/survey/user", {state: res.data});
            }
        }catch(err){
            alert(err);
        }
};

export  const edit = (deadline, id,  index,history, userSurveys) => async dispatch => {
    // check token before call api to update survey
    await dispatch(checkAuthenticated());
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }
    }
    const body = JSON.stringify({deadline});
    try {
         // call api to update survey
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/survey/user/${id}/`, body, config)
        if (res.data && history) {
            history("/survey/user", {state: userSurveys[index].deadline = res.data.deadline});
        }
    }catch(err){
        alert(err);
    }
};
