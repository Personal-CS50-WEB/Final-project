import React, { Fragment } from "react";
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => (
        <Fragment>
            <Link className="nav-item nav-link mr-sm-2" to="/login">Login</Link>
            <Link className="nav-item nav-link mr-sm-2" to="/signup">Signup</Link>
        </Fragment>
    );
    const authLinks = () => (
        <Link className="nav-item nav-link mr-sm-2" to="/login" onClick={logout}>Logout</Link>
    );
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Survey</Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-item nav-link" to="create_survey">Create survey</Link>
                <Link className="nav-item nav-link" to="/survey/user">Your surveys</Link>
                <Link className="nav-item nav-link" to="/submission/user">Your submissions</Link>
                <Link className="nav-item nav-link" to="/results/">See results</Link>               
            </div>
        </div>
        {isAuthenticated ? authLinks() : guestLinks()}
    </nav>
    );
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);