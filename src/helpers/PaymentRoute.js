import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAlert } from "react-alert";

export default function PaymentRoute({ allowPayment, children, ...rest }) {
  useEffect(() => {
    console.log("mounted");

    console.log("unmounted");
  }, []);

  const alert = useAlert();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (allowPayment) {
          return React.cloneElement(children, { allowPayment });
        }

        if (!allowPayment) {
          alert.error("Unauthorized: Something Went Wrong");

          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
