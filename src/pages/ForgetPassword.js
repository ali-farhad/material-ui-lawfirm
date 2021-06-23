import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

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

import singupImg from "../assets/signup.png";
import logo from "../assets/logo.png";

import { useFormik } from "formik";
import * as yup from "yup";

import FirebaseContext from "../context/firebase";
import { useAlert } from "react-alert";

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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${singupImg})`,
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
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    ...theme.customBtn,
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: "#1464a3",
    color: "white",
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
    margin: "1rem 0",
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email address")
    .email("Enter a valid email address")
    .required("Email is required"),
});

export default function ForgetPassword() {
  const classes = useStyles();
  const history = useHistory();
  const alert = useAlert();

  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email } = values;

      try {
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            // Password reset email sent!
            alert.success("Reset Email sent! Check your Email Address");
          })
          .catch((error) => {
            if (error.code === "auth/user-not-found") {
              alert.error("This User does not exist!");
              return;
            }
            alert.error(error.message);
          });
      } catch (error) {
        alert.error(error.message);
        values.email = "";
      }
    },
  });

  useEffect(() => {
    document.title = "Forgot Password - Dextra";
  }, []);

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
            src={logo}
            alt=""
            style={{
              padding: ".5rem",
              margin: "1rem",
              width: "12rem",
              backgroundColor: "white",
            }}
          />
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="off"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Submit
            </Button>
            <Grid container className={classes.linksWrapper}>
              <Grid item xs>
                <Link className={classes.links} to="/login" variant="body2">
                  {"Already a User? Login Here"}
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
