import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import ReactLoader from "./components/loader";
import { ThemeProvider } from "@material-ui/core";

import theme from "./theme";

import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import usePersistedState from "./helpers/usePersistedState";

import Main from "./pages/Main";
import Notes from "./pages/Notes";
import ProtectedRoute from "./helpers/ProtectedRoute";
import PaymentRoute from "./helpers/PaymentRoute";
import StripePaymentSuccess from "./pages/StripePaymentSuccess";
import StripePaymentError from "./pages/StripePaymentError";

// const Login = lazy(() => {
//   return Promise.all([
//     import("./pages/Login"),
//     new Promise(resolve => setTimeout(resolve, 1000))
//   ])
//   .then(([moduleExports]) => moduleExports);
// });

const SignUp = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AllUsers = lazy(() => import("./pages/adminPages/AllUsers"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const EmailVerification = lazy(() => import("./pages/NotVerified"));

function App() {
  const { user } = useAuthListener();

  const [payAllowed, setPayAllowed] = usePersistedState("page", "allow");
  return (
    <UserContext.Provider value={{ user }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<ReactLoader />}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/forget-password" component={ForgetPassword} />
              <Route path="/email-verification" component={EmailVerification} />

              {/* <Route path="/dashboard">
                <Dashboard user={user}>
                  <Main />
                </Dashboard>
              </Route> */}

              <ProtectedRoute user={user} path="/dashboard" exact>
                <Dashboard>
                  <Main />
                </Dashboard>
              </ProtectedRoute>

              <ProtectedRoute user={user} path="/myprofile" exact>
                <Dashboard user={user}>
                  <MyProfile />
                </Dashboard>
              </ProtectedRoute>

              <Route path="/notes">
                <Dashboard user={user}>
                  <Notes />
                </Dashboard>
              </Route>

              <PaymentRoute path="/payment-success" exact>
                <Dashboard user={user}>
                  <StripePaymentSuccess />
                </Dashboard>
              </PaymentRoute>

              <PaymentRoute path="/payment-error" exact>
                <Dashboard user={user}>
                  <StripePaymentError />
                </Dashboard>
              </PaymentRoute>
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
