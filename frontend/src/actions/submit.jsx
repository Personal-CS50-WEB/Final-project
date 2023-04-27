import axios from 'axios';
import { checkAuthenticated } from "./auth"

export  const submit = (survey, submission_answers, history, setError) => async dispatch => {
    // check token before call api to submit 
    await dispatch(checkAuthenticated());
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT  ${localStorage.getItem('access')}`,
        }
    }
        const body = JSON.stringify({ survey, submission_answers});
    
        try {
            // call api to submit survey
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/submission/`, body, config)
            if (res.data) {
                history("/submissions", {state: res.data});
            }
        }catch(err){
            console.log(err)
            setError('You already submitted this survey before');
        }
};