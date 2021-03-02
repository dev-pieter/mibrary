import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";

export default function SecureRoute({children, ...rest}) {
    return (
        <Route {...rest} render={() => rest.login.loggedIn 
            ? (children)
            : (<Redirect to={{pathname : '/'}}></Redirect>)
        }></Route>
    )
}
