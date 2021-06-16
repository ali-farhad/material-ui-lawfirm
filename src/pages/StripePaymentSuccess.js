import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Paper, Button } from "@material-ui/core";

import { useAlert } from "react-alert";



const useStyles = makeStyles((theme) => ({
  paperInfo: {
    padding: ".9em",
  },
  drawerHeader: {
    margin: "4rem 0",
  },

  warning: {
    color: theme.palette.getContrastText("#00e676"),
    backgroundColor: "#00e676",
    margin: "1rem 0",
    padding: "5rem"
  },

  buyBtn: {
    margin: "1rem 0",
  },
}));

export default function StripePaymentSuccess() {
  const classes = useStyles();
  const alert = useAlert();




  return (
    <div className={classes.drawerHeader}>
        <Paper
          classes={{ root: classes.paperInfo }}
          className={classes.warning}
        >
          <Typography variant="body1">
           Payment Successfull! Your Account has been upgraded to Standard.
          </Typography>
        </Paper>
    
    </div>
  );
}
