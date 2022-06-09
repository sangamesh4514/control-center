import React from 'react'
import { Redirect } from 'react-router-dom';

export default function LogMe({component: Component}) {
    const user = localStorage.getItem("userToken");
    const isAuthenticated = user;

    return isAuthenticated ? (<Redirect to={{ pathname: '/dashboard' }} />) : (<Component />);
}
