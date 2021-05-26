import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import singupImg from "../assets/login.png";
import logo from "../assets/logo.png";

import { FormHelperText, Hidden } from "@material-ui/core";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { SignalCellularNullOutlined } from "@material-ui/icons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
    backgroundColor: "#1464a3",
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
}));

export default function SignUpSide() {
  const classes = useStyles();

  const initialValues = {
    email: "",
    password: "",
    acceptTerms: false,
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email address")
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),

    acceptTerms: yup.bool().oneOf([true], "Please accept Terms & Conditions"),
  });

  const onSubmit = (values, props) => {
    console.log(values);
    props.resetForm();
    // setTimeout(() => {
    //     props.resetForm()
    //     props.setSubmitting(false)
    // }, 2000)
  };

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
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className={classes.form}>
                {console.log(errors)}
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  // helperText={<ErrorMessage name="email" />}
                  helperText={errors.email}
                  error={Boolean(errors.email && touched.email)}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  // helperText={<ErrorMessage name="password" />}
                  helperText={errors.password}
                  error={Boolean(errors.password)}
                />

                <Field
                  as={FormControlLabel}
                  name="acceptTerms"
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      name="acceptTerms"
                    />
                  }
                  label="I Agree to all Terms & Conditions"
                />

                <FormHelperText
                  error={Boolean(errors.acceptTerms)}
                  name="acceptTerms"
                >
                  {errors.acceptTerms}
                </FormHelperText>

                <Button
                  disabled={
                    errors.acceptTerms || errors.email || errors.password
                  }
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      {"Already a User? Login Here"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
