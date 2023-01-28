import React from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 *Use to show a snack bar
 * @param {Object} props containe 2 values :
 *  - ok : boolean
 *  - text : String
 *  - open : Boolean
 * @returns Return the Snackbar
 */
export default function Feedback(props) {
  return (
    <>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        message="Note archived"
      >
        <Alert severity={props.ok ? "success" : "error"} sx={{ width: "100%" }}>
          {props.text}
        </Alert>
      </Snackbar>
    </>
  );
}
