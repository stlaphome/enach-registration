import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

export default function CustomSnackBar(props) {
  return (
    <div>
      <Snackbar
        open={props.showSnackbar}
        autoHideDuration={props.autoHideDuration}
        onClose={props.onClose}
        color={props.color}
      >
        <Alert
          severity={props.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
