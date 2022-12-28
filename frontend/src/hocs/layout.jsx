import React, { useEffect } from "react";
import Navbar from "../componants/Navbar";
import { connect } from "react-redux";
import { loud_user, checkAuthenticated } from "../actions/auth";

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.loud_user();
    }, []);
    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    );  
}   
export default connect(null, { checkAuthenticated, loud_user })(Layout);