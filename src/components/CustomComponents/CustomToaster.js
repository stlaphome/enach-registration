import { Alert, Slide, Snackbar } from "@mui/material";
import { useState } from "react";

const CustomeToaster = (props) => {
  const [transition, setTransition] = useState(undefined);
  function TransitionUp(prop) {
    return <Slide {...prop} direction="up" />;
  }
  return (
    <>
      <Snackbar
        open={props.open}
        TransitionComponent={transition}
        autoHideDuration={6000}
        onClose={props.close}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          {props.content}
        </Alert>
      </Snackbar>
    </>
  );
};
export default CustomeToaster;
