import React, { Fragment } from "react";
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => (
        <Fragment>
            <li><Link to="login">Login</Link></li>
            <li><Link to="signup">Signup</Link></li>
        </Fragment>
    );
    const authLinks = () => (
        <li><Link to="/login" onClick={logout}>Logout</Link></li>
    );
    return (<header className="main-header clearfix">
        <div className="logo">
            <Link className="navbar-brand" to="/"><em>pollpal</em></Link>
        </div>
        <a href="#menu" className="menu-link"><i className="fa fa-bars"></i></a>
        <nav  id="menu" className="main-nav" role="navigation">
            <ul className="main-menu">
                <li><Link to="create_survey">Create survey</Link></li>
                <li><Link to="user/surveys">Your surveys</Link></li>
                <li><Link to="submissions">Your submissions</Link></li>
                <li><Link to="results">See results</Link></li>         
                {isAuthenticated ? authLinks() : guestLinks()}
            </ul>
        </nav>
    </header>);
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);