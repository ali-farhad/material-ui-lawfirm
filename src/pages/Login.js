import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Hidden } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import logo from "../assets/logo.png";
import logoDark from "../assets/logo_dark.png";

import { useFormik } from "formik";
import * as yup from "yup";

import FirebaseContext from "../context/firebase";
import { useAlert } from "react-alert";
import { StayPrimaryLandscape } from "@material-ui/icons";

import signUpImg from "../assets/signup.png";
import signUpImgLight from "../assets/signup_light.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link style={{ color: "#ff5722" }} to="https://dextera.com/">
        Dextera
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const validationSchema = yup.object({
  email: yup
    .string("Enter your email address")
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function SignInSide({ isDark, user }) {
  const [bgImg, setBgImg] = useState("");

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: `url(${bgImg})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      // backgroundColor: "#1464a3",
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      ...theme.customBtn,
      margin: theme.spacing(3, 0, 2),
      color: "white",
    },
    icons: {
      maxWidth: "48px",
    },

    links: {
      color: "#ff5722",
      margin: ".3em 0",
      display: "inline-block",
    },

    linksWrapper: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },

    bgWhite: {
      backgroundColor: `white`,
    },
  }));

  const classes = useStyles();
  const history = useHistory();
  const alert = useAlert();

  const { firebase, googleProvider } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        history.push("/dashboard");
      } catch (error) {
        console.log(error);
        switch (error.code) {
          case "auth/wrong-password":
            alert.error("username and/or Password is incorrect!");
            break;
          case "auth/user-not-found":
            alert.error("This User does not exist. Please Sign Up!");
            break;
          default:
            alert.error("Something went wrong!");
        }
        values.email = "";
        values.password = "";
      }

      // console.log(values);
    },
  });

  useEffect(() => {
    document.title = "Login - Dextra";

    if (isDark) {
      setBgImg(signUpImg);
    } else {
      setBgImg(signUpImgLight);
    }
  }, [isDark]);

  const auth = firebase.auth();

  async function signInWithGoogle() {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        const newUser = res.user;

        const checkDomains = ["gmail.com", "yahoo.com", "outlook.com"];
        const domain = newUser.email.substring(
          newUser.email.lastIndexOf("@") + 1
        );
        let accountType = "";
        if (checkDomains.includes(domain)) {
          accountType = "limited";
        } else {
          accountType = "Standard";
        }

        firebase
          .firestore()
          .collection("users")
          .add({
            userId: newUser.uid,
            username: newUser.displayName.toLowerCase(),
            // fullName,
            emailAddress: newUser.email.toLowerCase(),
            following: ["2"],
            followers: [],
            dateCreated: Date.now(),
            firstLogin: true,
            accountType: accountType,
          });

        history.push("/dashboard");
      })
      .catch((error) => {
        alert.error(error.message);
      });
  }

  if (user) {
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          // state: { from: location },
        }}
      />
    );
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image}>
        <Hidden xsDown>
          {/* <Typography
            variant="h4"
            style={{ color: "white", padding: "12px 15px" }}
          >
            Dexter
          </Typography> */}

          <img
            src={isDark ? logoDark : logo}
            alt=""
            style={{
              padding: ".5rem",
              margin: "1rem",
              width: "12rem",
            }}
            className={!isDark ? classes.bgWhite : "null"}
          />
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Paper
              elevation={0}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1em",
              }}
            >
              <Button onClick={signInWithGoogle}>
                <img
                  className={classes.icons}
                  src="https://img.icons8.com/fluent/100/000000/google-logo.png"
                  alt="google logo for signin"
                />
              </Button>
            </Paper>
            <Grid container className={classes.linksWrapper}>
              <Grid item xs>
                <Link
                  className={classes.links}
                  to="/forget-password"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link className={classes.links} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
