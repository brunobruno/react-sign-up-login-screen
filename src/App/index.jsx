import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers/history';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components/PrivateRoute';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="container-fluid h-100 d-flex justify-content-center">
            <div className="col-12 col-sm-9 col-md-5 align-self-center p-5 shadow bg-white bg-light">
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
            </div>
        </div>
    );
}

export { App };