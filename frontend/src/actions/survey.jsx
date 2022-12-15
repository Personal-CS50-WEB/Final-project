
import axios from 'axios';
import { checkAuthenticated} from "./auth"

export  const create = (name, description, deadline, questions, history, userSurveys, index) => async dispatch => {
    await dispatch(checkAuthenticated());
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }
    }
        const body = JSON.stringify({ name, description, deadline, questions });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/survey/user/`, body, config)
            if (res.data) {

                history("/survey/user", {state: userSurveys[index] = res.data});
            }
        }catch(err){
            alert(err);
        }
};

export  const edit = (deadline, id,  index,history, userSurveys) => async dispatch => {
    await dispatch(checkAuthenticated());
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }
    }
    const body = JSON.stringify({deadline});
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/survey/user/${id}/`, body, config)
        if (res.data && history) {
            history("/survey/user", {state: userSurveys[index].deadline = res.data.deadline});
        }
    }catch(err){
        alert(err);
    }
};
