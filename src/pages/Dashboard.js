import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { Hidden } from "@material-ui/core";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";

import logo from "../assets/logo.png";
import logoDark from "../assets/logo_dark.png";

import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupIcon from "@material-ui/icons/Group";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Button, Grid, Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";

import useUser from "../hooks/use-user";
import { changeFirstLogin } from "../services/firebase";
import LoggedInUserContext from "../context/logged-in-user";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";

import { useAlert } from "react-alert";

import Main from "../pages/Main";

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
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  margin: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
    },
  },

  defaults: {
    color: "black",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
    },
  },
  paperInfo: {
    padding: "3em",
  },
  imageContainer: {
    background: "white",
    padding: "0 1rem",
    // padding: "0 .2rem",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export default function Dashboard(props) {
  const { children, changeTheme, isDark, user } = props;
  const classes = useStyles();
  const alert = useAlert();
  const history = useHistory();

  // console.log("isDark", isDark);

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

  const handleClose = (code) => {
    setAnchorEl(null);
    if (code === "logout") {
      firebase.auth().signOut();
      history.push("/login");
    }

    if (code === "profile") {
      history.push("/myprofile");
    }
  };

  const handleBellClose = () => {
    setBellEl(null);
  };

  const toggleTheme = () => {
    changeTheme();
  };

  // const { user: loggedInUser } = useContext(UserContext);

  // const { user } = useUser(loggedInUser?.uid);

  // console.log(user);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    document.title = "Dashboard - Dextera";

    if (user) {
      if (user.firstLogin) {
        alert.success("Login Successfull -  Welcome Aboard!");
        changeFirstLogin(user.docId);
        // console.log(user.userId);
      }
    }
  }, [alert, user]);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        // className={clsx(classes.appBar, {
        //   [classes.appBarShift]: open,
        // })}
        className={open ? classes.appBarShift : classes.appBar}
        color="inherit"
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

          <Hidden xsDown>
            <Typography
              color="inherit"
              variant="h6"
              noWrap
              style={{ flexGrow: 1 }}
            >
              {user ? (
                user ? (
                  `Dashboard - welcome, ${user.displayName}!`
                ) : (
                  <Skeleton />
                )
              ) : (
                <Skeleton />
              )}
            </Typography>
          </Hidden>

          <IconButton
            onClick={toggleTheme}
            aria-label="delete"
            className={isDark ? classes.margin : classes.defaults}
          >
            <Brightness4Icon />
          </IconButton>

          <Badge badgeContent={2} color="primary">
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
          {/* <AccountCircle
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ margin: "0 1em" }}
          /> */}

          <Avatar
            className={classes.orange}
            style={{ margin: "0 1em" }}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {user && user.displayName.substring(0, 2).toUpperCase()}
          </Avatar>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose("profile")}>
              {" "}
              My Profile
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem onClick={handleClose}>Settings </MenuItem>
            <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
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
                className={!isDark && classes.imageContainer}
              >
                <img
                  style={{
                    width: "141px",
                    // marginLeft: "1em",
                    display: "block",
                  }}
                  src={isDark ? logoDark : logo}
                  alt=""
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
          <ListItem component={Link} to="/myprofile" button>
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
        {/* <List>
          <ListItem component={Link} to="/allusers" button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="All Users" />
          </ListItem>
        </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {React.cloneElement(props.children, { ...props })}
      </main>
    </div>
  );
}
