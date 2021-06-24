import React from "react";
import InputField from "../FormFields/InputField";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function BillingForm(props) {
  const classes = useStyles();
  // const theme = useTheme();

  const {
    formField: {
      bankAcNum,
      routingNum,
      // cCardNum,
      // cSecCode,
      // expMonthYear,
      bCountry,
      bCity,
      bState,
      bZip,
      bAddress,
      bSuit,
    },
  } = props;

  return (
    <div
      className={classes.form}
      style={{ maxWidth: "60em", margin: "1.3em auto" }}
    >
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <Typography variant="h6">Enter Your Billing Details</Typography>
          </Grid>
          {/* bankAcc: "", routingNum: "", creditCardNum: "", securityCode:
                "", expiry: "", bAddress: "", bSuit: "", bCountry: "", bCity:
                "", bState: "", bZip: "", */}
          {/* <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={bankAcNum.name} label={bankAcNum.label} />
          </Grid>

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={routingNum.name} label={routingNum.label} />
          </Grid> */}

          {/* <Grid container spacing={2} style={{ padding: "1em 2em" }}>
            <Grid item xs={12} md={4}>
              <InputField name={cCardNum.name} label={cCardNum.label} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField name={cSecCode.name} label={cSecCode.label} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField name={expMonthYear.name} label={expMonthYear.label} />
            </Grid>
          </Grid> */}

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={bCountry.name} label={bCountry.label} />
          </Grid>

          <Grid container spacing={2} style={{ padding: "1em 2em" }}>
            <Grid item xs={12} md={4}>
              <InputField name={bCity.name} label={bCity.label} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField name={bState.name} label={bState.label} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField name={bZip.name} label={bZip.label} />
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={bAddress.name} label={bAddress.label} />
          </Grid>
          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={bSuit.name} label={bSuit.label} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
