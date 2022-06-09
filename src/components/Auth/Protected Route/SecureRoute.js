import React from 'react';
import { Redirect } from 'react-router-dom';

export default function SecureRoute(props) {
    console.log(props);
    const Component = props.component;
    const user = localStorage.getItem("userToken");
    // const userLogged = useSelector(loggedInStatus);
    // console.log(user);
    const isAuthenticated = user;

    return isAuthenticated === null ? (<Redirect to={{ pathname: '/' }} />) : (<Component />);
}
