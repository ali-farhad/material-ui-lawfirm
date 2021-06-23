import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Paper, Button } from "@material-ui/core";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import { deepOrange } from "@material-ui/core/colors";

import { getUserByUserId } from "../services/firebase";

import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

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
    color: theme.palette.getContrastText("#f50057"),
    backgroundColor: "#f50057",
    padding: "3rem",
    // margin: "1rem 0",
    [theme.breakpoints.down("sm")]: {
      margin: "2em .7em",
      marginTop: "6em",
    },
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

export default function StripePaymentSuccess({
  user: n,
  allowPayment,
  setAllowPayment,
}) {
  const classes = useStyles();
  const alert = useAlert();

  const { user: userData, isLoading } = useUser(n.uid);

  // console.log("WWW", userData);

  useEffect(() => {
    const UpdateUser = async () => {
      try {
        return firebase
          .firestore()
          .collection("users")
          .doc(userData.docId)
          .update({
            accountType: "standard",
          })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } catch (error) {
        console.log("fail silently");
      }
    };

    console.log("Loading", isLoading);

    if (isLoading) {
      UpdateUser();
    }
  }, [isLoading, userData]);

  // setAllowPayment(false);

  return (
    <div className={classes.drawerHeader}>
      <Paper classes={{ root: classes.paperInfo }} className={classes.warning}>
        <div className={classes.msgWrapper}>
          <DoneAllOutlinedIcon
            fontSize="large"
            style={{ fontSize: "5rem", margin: "0 1rem" }}
          />

          <Typography variant="h6">
            Payment Successfull! Your Account has been upgraded to Standard
            Plan.
          </Typography>
        </div>
        <Typography variant="subtitle2" className={classes.goBack}>
          Go back to{" "}
          <Link style={{ color: "white", fontWeight: "bold" }} to="/dashboard">
            dashboard
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}
