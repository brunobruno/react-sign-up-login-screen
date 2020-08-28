import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        passwordCheck: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if( user.password === user.passwordCheck){
            if (user.firstName && user.lastName && user.username && user.password && user.passwordCheck) {
                dispatch(userActions.register(user));
            }
        }else{
            user.passwordCheck = '';
            console.log('password diferente');
        }

    }

    return (
        <>
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        placeholder="firstname"
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')}
                    />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        placeholder="lastname"
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')}
                    />
                    {submitted && !user.lastName &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="username"
                        value={user.username}
                        placeholder="email@domain.com"
                        onChange={handleChange}
                        className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')}
                    />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        placeholder="8 caracters, at least one uppercase letter and one number"
                        onChange={handleChange}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least 8 or more characters, one number and one uppercase"
                        className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')}
                    />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Confirm password</label>
                    <input
                        type="password"
                        name="passwordCheck"
                        value={user.passwordCheck}
                        placeholder="The same from before"
                        onChange={handleChange}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="The same from before"
                        className={'form-control' + (submitted && !user.passwordCheck || (user.passwordCheck && user.password !== user.passwordCheck) ? ' is-invalid' : '')}
                    />
                    {submitted && !user.passwordCheck &&
                        <div className="invalid-feedback">Password Check is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link text-danger">Cancel</Link>
                </div>
            </form>
        </>
    );
}

export { RegisterPage };