import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paperInfo: {
    padding: "3em",
  },
  drawerHeader: {
    margin: "4rem 0",
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <div className={classes.drawerHeader}>
      <Paper classes={{ root: classes.paperInfo }}>
        <Typography variant="body1">
          This page is blank for now. will be filled with required content later
          on.
        </Typography>
      </Paper>
    </div>
  );
}
