import React from "react";
import InputField from "../FormFields/InputField";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function BasicForm(props) {
  const classes = useStyles();
  // const theme = useTheme();

  const {
    formField: {
      firstName,
      middleName,
      lastName,
      username,
      ph_number,
      mob_number,
      web_url,
      linkadin_url,
      fb_url,
      twitter_url,
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
            <Typography variant="h6">Enter Your Basic Details</Typography>
          </Grid>
          <Grid container spacing={2} style={{ padding: "1em 2em" }}>
            <Grid item xs={12} md={4}>
              <InputField name={firstName.name} label={firstName.label} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField name={middleName.name} label={middleName.label} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField name={lastName.name} label={lastName.label} />
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={username.name} label={username.label} />
          </Grid>

          <Grid container spacing={2} style={{ padding: "1em 2em" }}>
            <Grid item xs={12} md={6}>
              <InputField name={ph_number.name} label={ph_number.label} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField name={mob_number.name} label={mob_number.label} />
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={web_url.name} label={web_url.label} />
          </Grid>
          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={linkadin_url.name} label={linkadin_url.label} />
          </Grid>
          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={fb_url.name} label={fb_url.label} />
          </Grid>
          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <InputField name={twitter_url.name} label={twitter_url.label} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
