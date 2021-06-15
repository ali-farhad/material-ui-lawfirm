import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAlert } from "react-alert";


export default function ProtectedRoute({ user, children, ...rest }) {
    const alert = useAlert();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return React.cloneElement(children, { user });
        }

        if (!user) {
        
            alert.error("Unauthorized: Please login to continue!");


          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}