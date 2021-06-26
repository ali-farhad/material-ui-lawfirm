import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Paper, Button } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { deepOrange } from "@material-ui/core/colors";

import { getUserByUserId } from "../services/firebase";

import { useAlert } from "react-alert";
import { Link, Redirect } from "react-router-dom";

import useUser from "../hooks/use-user";
import { firebase, FieldValue } from "../libs/firebase";

const useStyles = makeStyles((theme) => ({
  paperInfo: {},
  drawerHeader: {
    margin: "4rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  warning: {
    color: theme.palette.getContrastText("#72e6ad"),
    backgroundColor: "#72e6ad",
    margin: "1rem 0",
    padding: "3rem",
  },

  buyBtn: {
    margin: "1rem 0",
  },

  msgWrapper: {
    display: "flex",
    alignItems: "center",
  },

  goBack: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "white",
  },
}));

export default function Notverified({ user }) {
  const classes = useStyles();

  if (user.emailVerified) {
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
    <div className={classes.drawerHeader}>
      <Paper classes={{ root: classes.paperInfo }} className={classes.warning}>
        <div className={classes.msgWrapper}>
          <CloseOutlinedIcon
            fontSize="large"
            style={{ fontSize: "5rem", margin: "0 1rem" }}
          />

          <Typography variant="h6">
            Please check your email address for verification
          </Typography>
        </div>
        <Typography variant="subtitle2" className={classes.goBack}>
          Go back to{" "}
          <Link style={{ color: "#ff5722" }} to="/dashboard">
            dashboard
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}
