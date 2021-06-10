import React from "react";

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

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import { Formik, Form, useFormik, errors } from "formik";
import * as Yup from "yup";

import TextField from "../components/FormsUI/TextField";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.common.white,
    color: "black",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.common.white,
    color: "black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    maxWidth: "100%",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    maxWidth: "100%",
  },
  margin: {
    color: "black",
  },
  table: {
    minWidth: 650,
  },
  tableInfo: {
    padding: "2em",
    margin: "1em 0 2em 0",
    [theme.breakpoints.down("sm")]: {},
  },

  imageContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function MyProfile({ errors }) {
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

  function getSteps() {
    return ["Basic Details", "Company Details", "Billing Information"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return "FORM 1";
      case 1:
        return "FORM 2";
      case 2:
        return "FORM 3";
      default:
        return "Unknown step";
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const BasicForm = () => {
    return (
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, props) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form
            className={classes.form}
            style={{ maxWidth: "60em", margin: "1.3em auto" }}
          >
            <Paper>
              <Grid container spacing={2}>
                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <Typography variant="h6">Enter Your Basic Details</Typography>
                </Grid>
                <Grid container spacing={2} style={{ padding: "1em 2em" }}>
                  <Grid item xs={12} md={4}>
                    <TextField name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="midName" label="Middle Name" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="lastName" label="Last Name" />
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="userName" label="Username" />
                </Grid>

                <Grid container spacing={2} style={{ padding: "1em 2em" }}>
                  <Grid item xs={12} md={6}>
                    <TextField name="phone" label="Phone Number" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField name="mobile" label="Mobile Number" />
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="website" label="Your Website URL" />
                </Grid>
                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="linkadin" label="Your Linkdin Profile URL" />
                </Grid>
                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="facebook" label="Your Facebook URL" />
                </Grid>
                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="twitter" label="Your Twitter URL" />
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    );
  };

  const CompanyForm = () => {
    return (
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form
            className={classes.form}
            style={{ maxWidth: "60em", margin: "1.3em auto" }}
          >
            <Paper>
              <Grid container spacing={2}>
                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <Typography variant="h6">
                    Enter Your Company Details
                  </Typography>
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="cName" label="Company Name" />
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="cMail" label="Company Email" />
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="cPhone" label="Company Phone Number" />
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="cCountry" label="Company Country" />
                </Grid>

                <Grid container spacing={2} style={{ padding: "1em 2em" }}>
                  <Grid item xs={12} md={4}>
                    <TextField name="cCity" label="Company City" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="cState" label="Company State" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="cZip" label="Company Zip" />
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="cAddress" label="Company Address" />
                </Grid>
                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="cSuit" label="Company Suit" />
                </Grid>

                <Grid container spacing={2} style={{ padding: "1em 2em" }}>
                  <Grid item xs={12} md={4}>
                    <TextField name="cAttornies" label="Number of Attornies" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="cEmp" label="Number of Employees" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="cOffices" label="Number of Offices" />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    );
  };

  const BillingForm = () => {
    return (
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form
            className={classes.form}
            style={{ maxWidth: "60em", margin: "1.3em auto" }}
          >
            <Paper>
              <Grid container spacing={2}>
                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <Typography variant="h6">
                    Enter Your Billing Details
                  </Typography>
                </Grid>
                {/* bankAcc: "", routingNum: "", creditCardNum: "", securityCode:
                "", expiry: "", bAddress: "", bSuit: "", bCountry: "", bCity:
                "", bState: "", bZip: "", */}
                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="bankAcc" label="Bank Account Number" />
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="routingNum" label="Routing Number" />
                </Grid>

                <Grid container spacing={2} style={{ padding: "1em 2em" }}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      name="creditCardNum"
                      label="Credit Card Number"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="securityCode" label="Card Secuirty Code" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="expiry" label="Expiry Month & Year" />
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="bCountry" label="Business Country" />
                </Grid>

                <Grid container spacing={2} style={{ padding: "1em 2em" }}>
                  <Grid item xs={12} md={4}>
                    <TextField name="bCity" label="Business City" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="bState" label="Business State" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField name="bZip" label="Business Zip" />
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="bAddress" label="Business Address" />
                </Grid>
                <Grid item xs={12} style={{ padding: "1em 2em" }}>
                  <TextField name="bSuit" label="Business Suit" />
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    );
  };

  const INITIAL_FORM_STATE = {
    //basic details
    firstName: "",
    midName: "",
    lastName: "",
    userName: "",
    phone: "",
    mobile: "",
    website: "",
    linkdin: "",
    facebook: "",
    twitter: "",

    //company details
    cName: "",
    cMail: "",
    cPhone: "",
    cCountry: "",
    cAddress: "",
    cSuit: "",
    cCity: "",
    cState: "",
    cZip: "",
    cAttornies: "",
    cEmp: "",
    cOffices: "",

    //Billing Details
    bankAcc: "",
    routingNum: "",
    creditCardNum: "",
    securityCode: "",
    expiry: "",
    bAddress: "",
    bSuit: "",
    bCountry: "",
    bCity: "",
    bState: "",
    bZip: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required("this field is required"),
    midName: Yup.string().required("this field is required"),
    lastName: Yup.string().required("this field is required"),
    userName: Yup.string().required("this field is required"),

    phone: Yup.number()
      .required("this field is required")
      .integer()
      .typeError("Please provide valid number"),
    mobile: Yup.number()
      .required("this field is required")
      .integer()
      .typeError("Please provide valid number"),
    website: Yup.string(),
    linkadin: Yup.string(),
    facebook: Yup.string(),
    twitter: Yup.string(),

    //Company Info
    cName: Yup.string().required("This filed is required"),
    cMail: Yup.string()
      .email("Invalid Email Address")
      .required("This filed is required"),
    cPhone: Yup.number()
      .required("this field is required")
      .integer()
      .typeError("Please provide valid number"),
    cCountry: Yup.string().required("This filed is required"),
    cAddress: Yup.string().required("This filed is required"),
    cCity: Yup.string().required("This filed is required"),
    cSuit: Yup.string().required("This filed is required"),
    cState: Yup.string().required("This filed is required"),
    cZip: Yup.number()
      .integer()
      .typeError("Enter Valid Number")
      .required("This filed is required"),
    cAttornies: Yup.number()
      .integer()
      .typeError("Enter Valid Number")
      .required("This filed is required"),
    cEmp: Yup.number()
      .integer()
      .typeError("Enter Valid Number")
      .required("This filed is required"),
    cOffices: Yup.number()
      .integer()
      .typeError("Enter Valid Number")
      .required("This filed is required"),
  });

  console.log(errors);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // className={clsx(classes.appBar, {
        //   [classes.appBarShift]: open,
        // })}
        className={open ? classes.appBarShift : classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            My Profile
          </Typography>
          <IconButton aria-label="delete" className={classes.margin}>
            <Brightness4Icon />
          </IconButton>

          <Badge badgeContent={4} color="primary">
            <NotificationsIcon
              aria-controls="noti-menu"
              aria-haspopup="true"
              onClick={handleBellClick}
            />
          </Badge>
          <Menu
            id="noti-menu"
            anchorEl={bellEl}
            keepMounted
            open={Boolean(bellEl)}
            onClose={handleBellClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MenuItem onClick={handleBellClose}>
              <ListItemText primary="first alert" />
              <Divider />
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleBellClose}>
              <ListItemText primary="This is second alert" />
            </MenuItem>
          </Menu>
          <AccountCircle
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ margin: "0 1em" }}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Grid container style={{ alignItems: "center" }}>
            <Grid item style={{ flexGrow: 1 }}>
              <Button
                component={Link}
                to="/dashboard"
                disableRipple
                className={classes.imageContainer}
              >
                <img
                  style={{
                    width: "125px",
                    marginLeft: "1em",
                    display: "block",
                  }}
                  src={logo}
                  alt="website logo"
                />
              </Button>
            </Grid>
            <Grid item>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="All Users" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <Paper classes={{ root: classes.tableInfo }}>
          <Typography variant="body1">
            Setup your profile here to get the most out of our wide range of
            services.
          </Typography>
        </Paper>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 ? (
          <div>
            <BasicForm />
          </div>
        ) : null}

        {activeStep === 1 ? (
          <div>
            <CompanyForm />
          </div>
        ) : null}

        {activeStep === 2 ? (
          <div>
            <BillingForm />
          </div>
        ) : null}
        <Button
          disabled={errors}
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>

        {/* <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div> */}
      </main>
    </div>
  );
}
