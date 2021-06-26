import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import FirebaseContext from "../context/firebase";

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
import { makeStyles } from "@material-ui/core/styles";

import signUpImg from "../assets/login.png";
import signUpImgLight from "../assets/login_light.png";

import logo from "../assets/logo.png";
import logoDark from "../assets/logo_dark.png";

import { FormHelperText, Hidden } from "@material-ui/core";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import { doesUserEmailExist } from "../services/firebase";
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

export default function SignUpSide({ isDark, user }) {
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
  const alert = useAlert();

  const history = useHistory();
  const { firebase, googleProvider } = useContext(FirebaseContext);

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

  useEffect(() => {
    document.title = "Sign Up - Dextra";

    if (isDark) {
      setBgImg(signUpImg);
    } else {
      setBgImg(signUpImgLight);
    }
  }, [isDark]);

  const handleSignUp = async (values, props) => {
    // setTimeout(() => {
    //   props.resetForm();
    //   props.setSubmitting(false);
    //   const { email } = values;
    //   console.log(email);
    // }, 2000);
    const checkDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    const { email, password } = values;
    const username = email.split("@")[0];
    const domain = email.substring(email.lastIndexOf("@") + 1);
    let accountType = "";
    if (checkDomains.includes(domain)) {
      accountType = "limited";
    } else {
      accountType = "Standard";
    }

    const userEmailExists = await doesUserEmailExist(email);
    if (!userEmailExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        const newUser = createdUserResult.user.sendEmailVerification();
        console.log(newUser);

        // firebase user collection (create a document)
        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            // fullName,
            emailAddress: email.toLowerCase(),
            following: ["2"],
            followers: [],
            dateCreated: Date.now(),
            firstLogin: true,
            accountType: accountType,
          });

        history.push("/dashboard");
      } catch (error) {
        alert.error(error.message);
      }
    } else {
      alert.error("You already have an account with us. Please Login!");
    }
  };

  const auth = firebase.auth();

  const [isload, setIsload] = useState("");
  async function signInWithGoogle() {
    setIsload(true);
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

        setIsload(false);

        if (!isload) {
          history.push("/dashboard");
        }
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
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  // helperText={<ErrorMessage name="email" />}
                  helperText={touched.email && errors.email}
                  error={Boolean(touched.email && errors.email)}
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
                  // helperText={<ErrorMessage name="password" />}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
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
                  error={Boolean(touched.acceptTerms && errors.acceptTerms)}
                  name="acceptTerms"
                >
                  {errors.acceptTerms}
                </FormHelperText>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  {isSubmitting ? "Signing up..." : "Sign up"}
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
                      alt="google logo"
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
                    <Link className={classes.links} to="/login" variant="body2">
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
