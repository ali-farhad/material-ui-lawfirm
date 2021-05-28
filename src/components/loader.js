import Loader from 'react-loader-spinner';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",

    

  }
}));

export default function ReactLoader() {
  const classes = useStyles();

  return (
    <Loader
      type="TailSpin"
      color="#00000059"
      height={100}
      width={100}
      // className="flex justify-center mt-12"
      className={classes.loader}
    />
  );
}