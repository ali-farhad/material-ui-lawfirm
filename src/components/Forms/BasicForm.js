import React from "react";
import InputField from "../FormFields/InputField";

import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import Switch from "@material-ui/core/Switch";
import { useN01SwitchStyles } from "./styles/n01";

const useStyles = makeStyles((theme) => ({}));

export default function BasicForm(props) {
  const [toggled, setToggled] = React.useState(false);

  const switchStyles = useN01SwitchStyles();

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

  function handleToggle(e) {
    setToggled(e.target.checked);
  }

  const [values, setValues] = React.useState({
    textmask: "(1  )    -    ",
    numberformat: "1",
  });

  function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
      className={classes.form}
      style={{ maxWidth: "60em", margin: "1.3em auto" }}
    >
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ padding: "1em 2em" }}>
            <Typography variant="h6">Enter your contact information</Typography>
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
            <Grid item xs={12} md={2}>
              <Switch
                classes={switchStyles}
                checked={toggled}
                // onChange={(e) => setToggled(e.target.checked)}
                onChange={(e) => handleToggle(e)}
              />
            </Grid>

            {toggled && (
              <Grid item xs={12} md={10}>
                <InputField
                  disabled={!toggled}
                  name={ph_number.name}
                  label={ph_number.label}
                />

                {/* <TextField
                  disabled={!toggled}
                  name={ph_number.name}
                  label={ph_number.label}
                  // value={values.numberformat}
                  variant="outlined"
                  // onBlur={handleChange}
                  InputProps={{
                    inputComponent: TextMaskCustom,
                  }}
                /> */}

                {/* <InputField
                  disabled={!toggled}
                  name={ph_number.name}
                  label={ph_number.label}
                  autoComplete="off"
                  variant="outlined"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                  }}
                /> */}
              </Grid>
            )}

            {!toggled && (
              <Grid item xs={12} md={10}>
                <InputField
                  disabled={toggled}
                  name={mob_number.name}
                  label={mob_number.label}
                />

                {/* <TextField
                  // disabled={toggled}
                  label={mob_number.label}
                  // value={values.numberformat}
                  variant="outlined"
                  // onBlur={handleChange}
                  name={mob_number.name}
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                  }} */}
                {/* <InputField
                  disabled={toggled}
                  name={mob_number.name}
                  label={mob_number.label}
                  // onChange={handleChange}
                  // onKeyDown={handleChange}
                  InputProps={{
                    inputComponent: TextMaskCustom,
                  }}
                /> */}
              </Grid>
            )}
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
