import React from "react";
import InputField from "../FormFields/InputField";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function CompanyForm(props) {
  const classes = useStyles();
  // const theme = useTheme();

  const {
    formField: {
      cName,
      cEmail,
      cPhNumber,
      cCountry,
      cCity,
      cState,
      cZip,
      cAddress,
      cSuit,
      cNumOfAttornies,
      cNumOfEmp,
      cNumOfOffices,
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
            <Typography variant="h6">Enter Your Company Details</Typography>
          </Grid>

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={cName.name} label={cName.label} />
          </Grid>

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={cEmail.name} label={cEmail.label} />
          </Grid>

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={cPhNumber.name} label={cPhNumber.label} />
          </Grid>

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={cCountry.name} label={cCountry.label} />
          </Grid>

          <Grid container spacing={2} style={{ padding: "1em 2em" }}>
            <Grid item xs={12} md={4}>
              <InputField name={cCity.name} label={cCity.label} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField name={cState.name} label={cState.label} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField name={cZip.name} label={cZip.label} />
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={cAddress.name} label={cAddress.label} />
          </Grid>
          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={cSuit.name} label={cSuit.label} />
          </Grid>

          <Grid container spacing={2} style={{ padding: "1em 2em" }}>
            <Grid item xs={12} md={4}>
              <InputField
                name={cNumOfAttornies.name}
                label={cNumOfAttornies.label}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField name={cNumOfEmp.name} label={cNumOfEmp.label} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField
                name={cNumOfOffices.name}
                label={cNumOfOffices.label}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
