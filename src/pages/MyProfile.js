import React, { useState, useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";

import logo from "../assets/logo.png";

import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupIcon from "@material-ui/icons/Group";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Button, Grid } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";

import { Link, useHistory } from "react-router-dom";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { CircularProgress } from "@material-ui/core";

import UserContext from "../context/user";
import FirebaseContext from "../context/firebase";
import { useAlert } from "react-alert";

import { Formik, Form } from "formik";

import BasicForm from "../components/Forms/BasicForm";
import BillingForm from "../components/Forms/BillingForm";
import CompanyForm from "../components/Forms/CompanyForm";

import validationSchema from "../components/FormModels/validationSchema";
import profileFormModel from "../components/FormModels/profileFormModel";
import formInitialValues from "../components/FormModels/formInitialValues";
import useFormValues from "../components/FormModels/useFormValues";
// import { current } from "immer";

const steps = ["Basic Details", "Company Details", "Billing Information"];
const { formField } = profileFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm formField={formField} />;
    case 1:
      return <CompanyForm formField={formField} />;

    case 2:
      return <BillingForm formField={formField} />;

    default:
      return <div>Not Found</div>;
  }
}

const useStyles = makeStyles((theme) => ({
  paperInfo: {
    padding: "1em",
  },
  drawerHeader: {
    margin: "4rem 0",
  },
  loading: {
    // margin: "4rem 0",
    height: "5vh",
  },
  wrapper: {
    display: "flex",
    justifyContent: "flex-end",
    maxWidth: "82em",
    marginTop: "2em",
  },
  test: {
    marginTop: "5em",
  },
}));

export default function MyProfile({ user }) {
  const alert = useAlert();
  const history = useHistory();

  // const { user } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);

  // console.log("wow", user.userId);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bellEl, setBellEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBellClick = (event) => {
    setBellEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBellClose = () => {
    setBellEl(null);
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleSwitchChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function _submitForm(values, actions) {
    actions.setSubmitting(false);

    // console.log(values);

    try {
      firebase
        .firestore()
        .collection("profiles")
        .doc(`${user.displayName}`)
        .set({
          userId: user.uid,
          ...values,
        });
    } catch (error) {
      console.log("crate error", error.message);
    }

    try {
      // let query = firebase
      //   .firestore()
      //   .collection("profiles")
      //   .where("userId", "==", user.uid);
      // query.get().then(function (querySnapshot) {
      //   querySnapshot.forEach(function (doc) {
      //     doc.ref.delete();
      //   });
      // });

      // firebase
      //   .firestore()
      //   .collection("profiles")
      //   .add({
      //     userId: user.uid,
      //     ...values,
      //   });

      history.push("/dashboard");
      alert.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      alert.error(error.message);
    }

    // console.log(values);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const { userFormData, isLoading } = useFormValues(user.uid);

  return (
    <>
      <div className={classes.test} />
      {isLoading && <Skeleton className={classes.loading} count={15} />}

      {!isLoading && (
        <div className={classes.drawerHeader}>
          <Paper classes={{ root: classes.paperInfo }}>
            <Typography variant="body1">
              Setup your profile here to get the most out of our wide range of
              services.
            </Typography>
          </Paper>

          <div>
            <Stepper
              style={{ marginTop: "2em" }}
              activeStep={activeStep}
              className={classes.stepper}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          <React.Fragment>
            {activeStep === steps.length ? (
              // <CheckoutSuccess />
              <div>wow</div>
            ) : (
              <Formik
                // initialValues={formInitialValues}
                initialValues={userFormData ? userFormData : formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {_renderStepContent(activeStep)}

                    <div className={classes.wrapper}>
                      {activeStep !== 0 && (
                        <Button
                          variant="contained"
                          onClick={_handleBack}
                          className={classes.button}
                          style={{ marginRight: "1em" }}
                        >
                          Back
                        </Button>
                      )}
                      <div>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          {isLastStep ? "Submit" : "Next"}
                        </Button>
                        {isSubmitting && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </React.Fragment>
        </div>
      )}
    </>
  );
}
