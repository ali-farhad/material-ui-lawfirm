import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ReactLoader from "./components/loader";
import { ThemeProvider } from "@material-ui/core";

import theme from "./theme";

import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

import Main from "./pages/Main";
import Notes from "./pages/Notes";
import ProtectedRoute from "./helpers/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));

// const Login = lazy(() => {
//   return Promise.all([
//     import("./pages/Login"),
//     new Promise(resolve => setTimeout(resolve, 1000))
//   ])
//   .then(([moduleExports]) => moduleExports);
// });

const SignUp = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AllUsers = lazy(() => import("./pages/adminPages/AllUsers"));
const MyProfile = lazy(() => import("./pages/MyProfile"));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<ReactLoader />}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              {/* <Route path="/dashboard">
                <Dashboard user={user}>
                  <Main />
                </Dashboard>
              </Route> */}

<ProtectedRoute user={user} path="/dashboard" exact>
              <Dashboard >
                <Main />
                </Dashboard>
            </ProtectedRoute>

              <Route path="/allusers">
                <Dashboard user={user}>
                  <AllUsers />
                </Dashboard>
              </Route>

              {/* <Route path="/allusers">
                <AllUsers />
              </Route> */}

              <Route path="/myprofile">
                <Dashboard user={user}>
                  <MyProfile />
                </Dashboard>
              </Route>

              <Route path="/notes">
                <Dashboard user={user}>
                  <Notes />
                </Dashboard>
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
