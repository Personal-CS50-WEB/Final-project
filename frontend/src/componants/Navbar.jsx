import React, { Fragment, useRef } from "react";
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const myRef = useRef(null);

    const showNamItems = () => {
        myRef.current.classList.toggle('show');
    };

    const guestLinks = () => (
        <Fragment>
            <li><Link onClick={showNamItems} to="/login">Login</Link></li>
            <li><Link onClick={showNamItems} to="/signup">Signup</Link></li>
        </Fragment>
    );
    const authLinks = () => (
        <li><Link to="/" onClick={logout}>Logout</Link></li>
    );
    
    return (<header className="main-header clearfix">
        <div className="logo">
            <Link className="navbar-brand" to="/"><em>pollpal</em></Link>
        </div>
        <a onClick={showNamItems} className="menu-link"><i className="fa fa-bars"></i></a>
        <nav ref={myRef}  id="menu" className="main-nav" role="navigation">
            <ul className="main-menu">
                <li><Link onClick={showNamItems} to="create_survey">Create survey</Link></li>
                <li><Link onClick={showNamItems} to="user/surveys">Your surveys</Link></li>
                <li><Link onClick={showNamItems} to="submissions">Your submissions</Link></li>
                <li><Link onClick={showNamItems} to="results">See results</Link></li>         
                {isAuthenticated ? authLinks() : guestLinks()}
            </ul>
        </nav>
    </header>);
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);