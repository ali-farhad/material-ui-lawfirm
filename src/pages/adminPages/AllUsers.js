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

import logo from "../../assets/logo.png";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function AllUsers() {
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
            All Users
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
          <ListItem button component={Link} to="/myprofile">
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
            This page contains all the users currently registered into the
            system. Admins can carry out administrative settings on the user
            from this page.
          </Typography>
        </Paper>

        <Grid container justify="center">
          <Grid item xs={12} lg={8}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr</TableCell>
                    <TableCell align="">Username</TableCell>
                    <TableCell align="">Email</TableCell>
                    <TableCell align="">Status</TableCell>
                    <TableCell align="">Activate/Deactivate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      01
                    </TableCell>
                    <TableCell align="">Jhon Doe</TableCell>
                    <TableCell align="">jhondoe@example.com</TableCell>
                    <TableCell align="">Active</TableCell>
                    <TableCell align="">
                      {" "}
                      <Switch
                        checked={state.checkedB}
                        onChange={handleSwitchChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      02
                    </TableCell>
                    <TableCell align="">Harry Potter</TableCell>
                    <TableCell align="">harrypotter@example.com</TableCell>
                    <TableCell align="">Active</TableCell>
                    <TableCell align="">
                      {" "}
                      <Switch
                        checked={state.checkedB}
                        onChange={handleSwitchChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      03
                    </TableCell>
                    <TableCell align="">Test User</TableCell>
                    <TableCell align="">testuser@example.com</TableCell>
                    <TableCell align="">disabled</TableCell>
                    <TableCell align="">
                      {" "}
                      <Switch
                        checked={state.checkedB}
                        onChange={handleSwitchChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
