import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import ReactLoader from './components/loader';
import { ThemeProvider } from "@material-ui/core";

import theme from "./theme";


const Login = lazy(() => import('./pages/Login'));

// const Login = lazy(() => {
//   return Promise.all([
//     import("./pages/Login"),
//     new Promise(resolve => setTimeout(resolve, 1000))
//   ])
//   .then(([moduleExports]) => moduleExports);
// });


const SignUp = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AllUsers = lazy(() => import('./pages/adminPages/AllUsers'));
const MyProfile = lazy(() => import('./pages/MyProfile'));


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Suspense fallback={<ReactLoader />}>
        <Switch>

          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/allusers">
            <AllUsers />
          </Route>
          <Route path="/myprofile">
            <MyProfile />
          </Route>
        </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
