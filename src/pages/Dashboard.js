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

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";

import logo from "../assets/logo.png";

import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupIcon from "@material-ui/icons/Group";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Button, Grid, Paper } from "@material-ui/core";

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
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  margin: {
    color: "black",
  },
  paperInfo: {
    padding: "3em",
  },
  imageContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function Dashboard(props) {
  const { children } = props;
  const classes = useStyles();
  const alert = useAlert();
  const history = useHistory();

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
  };

  const handleBellClose = () => {
    setBellEl(null);
  };

  const { user: loggedInUser } = useContext(UserContext);

  const { user } = useUser(loggedInUser?.uid);

  console.log(user);
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
            {loggedInUser ? (
              user ? (
                `Dashboard - welcome, ${user.username}!`
              ) : (
                <Skeleton />
              )
            ) : (
              <Skeleton />
            )}
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
                className={classes.imageContainer}
              >
                <img
                  style={{
                    width: "125px",
                    marginLeft: "1em",
                    display: "block",
                  }}
                  src={logo}
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
        <List>
          <ListItem component={Link} to="/allusers" button>
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
        {children}
      </main>
    </div>
  );
}
