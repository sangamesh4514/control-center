import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

export const Encrypt = ({ children, ...rest }) => {
    return (
      <>
        <Route
          {...rest}
          render={({ location }) => localStorage.getItem("userToken") ?
            (children) : (
              <Redirect to={{
                pathname: '/login',
                state: { from: location }
              }}
              />)
          }
        />
      </>
    )
  }
  
  export default Encrypt;