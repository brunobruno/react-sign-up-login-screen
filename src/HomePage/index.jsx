import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HomePage() {
    const user = useSelector(state => state.authentication.user);
    return (
        <>
            <h1>Hello {user.firstName} {user.lastName}!</h1>
            <p>Your email is: {user.username}</p>
            <Link to="/login">Logout</Link>
        </>
    );
}

export { HomePage };