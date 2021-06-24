import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Paper, Button, CircularProgress } from "@material-ui/core";

import { getUserByUserId } from "../services/firebase";
import { useAlert } from "react-alert";

import { firebase, FieldValue } from "../libs/firebase";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51J2ip8G0xa05mnESEsclJgXRqACcGlXWqQmJQeUCech38cpFz0kU494tacbGuN2sa9ycqDqP5IggipVsUGg1eWBi00phoUS8WD"
);
const useStyles = makeStyles((theme) => ({
  paperInfo: {
    padding: ".9em",
    margin: "1rem",
    [theme.breakpoints.down("sm")]: {
      margin: "2em .7em",
    },
  },
  drawerHeader: {
    margin: "4rem 0",
  },

  warning: {
    color: theme.palette.getContrastText("#f50057"),
    backgroundColor: "#f50057",
    // margin: "1rem 0",
    dark: "yellow",
    [theme.breakpoints.down("sm")]: {
      margin: "2em .7em",
      marginTop: "6em",
    },
  },

  buyBtn: {
    margin: "1rem 0",
  },
}));

export default function Main({ user, isDark }) {
  // let test = JSON.parse(localStorage.getItem("page"));

  localStorage.removeItem("page");
  localStorage.setItem("page", JSON.stringify("xyz"));

  // localStorage.setItem("page", JSON.stringify("notallowed"));

  const classes = useStyles();
  const alert = useAlert();

  const [userData, setUserData] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [product] = useState({
    name: "dextera standard",
    price: 500,
    description: "dextera standard memebsship fee",
  });

  useEffect(() => {
    const getUser = async () => {
      const result = await getUserByUserId(user.uid);
      // console.log("T", result[0]);
      setUserData(result[0]);
    };

    if (user) {
      getUser();
    }
  }, []);

  async function handleMembership() {
    localStorage.removeItem("page");
    localStorage.setItem("page", JSON.stringify("allow"));

    const stripe = await stripePromise;

    const response = await fetch(
      "https://frozen-badlands-01381.herokuapp.com/create-checkout-session?name=Dextera%20Standard%20Membership&price=500",
      {
        method: "POST",
      }
    );

    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }

  return (
    <div className={classes.drawerHeader}>
      {userData && userData.accountType === "limited" ? (
        <Paper
          classes={{ root: classes.paperInfo }}
          className={!isDark ? classes.warning : null}
        >
          <Typography variant="body1">
            Warning: Your account is limited due to registering with social
            email. in order to get full access, please buy membership!
          </Typography>
          <Button
            onClick={handleMembership}
            className={classes.buyBtn}
            variant="contained"
          >
            Buy Membership
            {paymentLoading && (
              <CircularProgress style={{ margin: "0 1rem" }} size={24} />
            )}
          </Button>
        </Paper>
      ) : null}

      <Paper classes={{ root: classes.paperInfo }}>
        <Typography variant="body1">
          This page is blank for now. will be filled with required content later
          on.
        </Typography>
      </Paper>
    </div>
  );
}
