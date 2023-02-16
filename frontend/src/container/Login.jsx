import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };
    // is user authanticated
    if (isAuthenticated){
        return <Navigate to='/' />
    }
    return (<section className="section login" data-testid='login form' data-section="section3">
        <div className="container mt-5">
            <div className="top-content">
                <h1 className='text-light' >Sign In</h1>
                <h6> Sign into your Account</h6>
            </div>
            <form id="contact" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input className="form-control"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                    />
                </div>
                <div className="form-group">
                    <input className="form-control"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    minLength="6"
                    required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            <p className='text-light'>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    </section>)
};    
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);