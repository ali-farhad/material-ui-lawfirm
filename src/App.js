import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AllUsers from "./pages/adminPages/AllUsers";
import MyProfile from "./pages/MyProfile";
import { ThemeProvider } from "@material-ui/core";

import theme from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          {/* <Dashboard /> */}
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
