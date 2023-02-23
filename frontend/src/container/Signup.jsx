import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";

const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        re_password: ''
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            signup(name, email, password, re_password);
            setAccountCreated(true);
        }
    };
    // is user authanticated
    if (isAuthenticated){
        return <Navigate to='/' />
    }
    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return (<section className="section login" data-section="section3">
        <div className="container mt-5">
            <h1 className='text-light'>Sign Up</h1>
            <p className='text-light'> Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Name*'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input className="form-control"
                    type="email"
                    placeholder="Email*"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                    />
                </div>
                <div className="form-group">
                    <input className="form-control"
                    type="password"
                    placeholder="Password*"
                    autoComplete="off"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    minLength="6"
                    required
                    />
                </div>
                <div className="form-group">
                    <input className="form-control"
                    type="password"
                    placeholder="Confirm_password*"
                    autoComplete="off"
                    name="re_password"
                    value={re_password}
                    onChange={e => onChange(e)}
                    minLength="6"
                    required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Register</button>
            </form>
            <p className='text-light'>
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    </section>)
};    
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps, { signup })(Signup);