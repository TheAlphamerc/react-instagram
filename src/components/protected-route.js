import { Navigate, Redirect, Route, withRouter } from 'react-router-dom';
import { LOGIN_ROUTE } from '../constants/routes';
import  Loader  from './loader';
import React from 'react';
import { lazy, Suspense } from "react";
import { withSession } from '../context/session';

const Signup = lazy(() => import("../pages/signup.page"));
function ProtectedRouteComponent(props) {
    // check if actually auth check is complete and then only send user to redirection
    if (!props.isAuthChecked) {
        return <Route {...props}><div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // backgroundColor: withRouter,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Loader />
        </div></Route>
    }
    return (
        props.user ?
            <Route {...props} /> :
            // <Navigate to={LOGIN_ROUTE} />
            <Route path={LOGIN_ROUTE} element={<Signup />} />
    )
}

export  const ProtectedRoute = withSession(ProtectedRouteComponent)