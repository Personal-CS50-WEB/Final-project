import React from "react";
import axios from 'axios';
import { checkAuthenticated} from "./auth"

export  const create = (name, description, deadline, questions) => async dispatch => {

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
                console.log(res.data)
            }
        
        }catch(err){
            console.log(err)
            alert(err);
        }
};

