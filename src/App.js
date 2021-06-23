import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import ReactLoader from "./components/loader";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import btnBg from "./assets/btnBg.png";

// import theme from "./theme";

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
  const [darkTheme, setDarkTheme] = useState(false);

  let isDark = null;
  if (darkTheme) {
    isDark = true;
  } else {
    isDark = false;
  }
  // const palletType = darkState ? "dark" : "light";

  const theme = createMuiTheme({
    palette: {
      primary: deepOrange,
      type: darkTheme ? "dark" : "light",
    },
    typography: {
      fontFamily: "Poppins",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
    customBtn: {
      background: `url(${btnBg}) no-repeat`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  });

  const [payAllowed, setPayAllowed] = usePersistedState("page", "allow");

  useEffect(() => {
    const themeType = localStorage.getItem("light") || "light";
    if (themeType != "light") {
      setDarkTheme(true);
    }
  }, []);

  const changeTheme = () => {
    localStorage.setItem("light", darkTheme ? "light" : "dark");
    setDarkTheme(!darkTheme);
  };

  return (
    <UserContext.Provider value={{ user }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<ReactLoader />}>
            <Switch>
              <Route path="/login">
                <Login isDark={isDark} />
              </Route>
              <Route path="/signup">
                <SignUp isDark={isDark} />
              </Route>
              <Route path="/forget-password" component={ForgetPassword} />
              <Route path="/email-verification" component={EmailVerification} />

              {/* <Route path="/dashboard">
                <Dashboard user={user}>
                  <Main />
                </Dashboard>
              </Route> */}

              <ProtectedRoute user={user} path="/dashboard" exact>
                <Dashboard isDark={isDark} changeTheme={changeTheme}>
                  <Main />
                </Dashboard>
              </ProtectedRoute>

              <ProtectedRoute user={user} path="/myprofile" exact>
                <Dashboard
                  isDark={isDark}
                  changeTheme={changeTheme}
                  user={user}
                >
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
