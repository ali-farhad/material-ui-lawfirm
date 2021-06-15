import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Paper, Button } from "@material-ui/core";

import { getUserByUserId } from "../services/firebase";
import { useAlert } from "react-alert";

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paperInfo: {
    padding: ".9em",
  },
  drawerHeader: {
    margin: "4rem 0",
  },

  warning: {
    color: theme.palette.getContrastText("#f50057"),
    backgroundColor: "#f50057",
    margin: "1rem 0",
  },

  buyBtn: {
    margin: "1rem 0",
  },
}));

export default function Main({ user }) {
  const classes = useStyles();
  const alert = useAlert();

  const [userData, setUserData] = useState(null);

  const [product] = useState({
    name: "dextera standard",
    price: 500,
    description: "dextera standard memebsship fee",
  });

  useEffect(() => {
    const getUser = async () => {
      const result = await getUserByUserId(user.uid);
      console.log("T", result[0]);
      setUserData(result[0]);
    };

    if (user) {
      getUser();
    }
  }, []);

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://fpcut.sse.codesandbox.io/checkout",
      {
        token,
        product,
      }
    );

    const { status } = response.data;
    if (status === "success") {
      alert.success("Payment successfull!");
    } else {
      alert.error("Something Went Wrong");
      console.log(status);
    }
  }

  return (
    <div className={classes.drawerHeader}>
      {userData && userData.accountType === "limited" ? (
        <Paper
          classes={{ root: classes.paperInfo }}
          className={classes.warning}
        >
          <Typography variant="body1">
            Warning: Your account is limited due to registering with social
            email. in order to get full access, please buy membership!
          </Typography>
          <Button className={classes.buyBtn} variant="contained">
            Buy Membership
          </Button>

          <StripeCheckout
            stripeKey="pk_test_51J2ip8G0xa05mnESEsclJgXRqACcGlXWqQmJQeUCech38cpFz0kU494tacbGuN2sa9ycqDqP5IggipVsUGg1eWBi00phoUS8WD"
            token={handleToken}
            amount={product.price * 100}
            name={product.name}
          ></StripeCheckout>
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
