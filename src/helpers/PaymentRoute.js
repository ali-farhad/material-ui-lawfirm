import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAlert } from "react-alert";

export default function PaymentRoute({ allowPayment, children, ...rest }) {
  const alert = useAlert();

  const check = JSON.parse(localStorage.getItem("page"));
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (check === "allow") {
          return React.cloneElement(children, { allowPayment });
        }

        if (!check !== "allow") {
          // alert.error("Unauthorized: Something Went Wrong");

          return (
            <Redirect
              to={{
                pathname: "/dashboard",
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
