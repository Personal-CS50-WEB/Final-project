import axios from 'axios';
import { checkAuthenticated } from "./auth"

export  const submit = (survey, submission_answers, history) => async dispatch => {
    // check token before call api to submit 
    await dispatch(checkAuthenticated());
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }
    }
        const body = JSON.stringify({ survey, submission_answers});
        console.log(body)
        try {
            // call api to submit survey
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/submission/`, body, config)
            if (res.data) {
                console.log(res.data)
                history("/submission/user", {state: res.data});
            }
        }catch(err){
            console.log(err)
            alert(err);
        }
};