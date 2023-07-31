import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { React, useEffect, useRef } from "react";

export default function CustomConfirmationDialog(props) {
  const closeButtonRef = useRef(null);
  const okRef = useRef(null);
  const yesRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    window.addEventListener("keyup", onKeyPressEventHandler);
    return () => {
      window.removeEventListener("keyup", onKeyPressEventHandler);
    };
  }, [closeButtonRef, okRef, yesRef, closeRef]);
  const onKeyPressEventHandler = (event) => {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if (event.ctrlKey) {
      switch (charCode) {
        case "z":
          closeButtonRef && closeButtonRef.current.click();
          break;
        case "y":
          yesRef && yesRef.current.click();
          break;
        case "k":
          okRef && okRef.current.click();
          break;
        case "q":
          closeRef && closeRef.current.click();
          break;
      }
    }
  };
  const refValue =
    props.okButtonName === "OK"
      ? okRef
      : props.okButtonName === "Yes"
      ? yesRef
      : closeRef;
  const tooltipContent =
    props.okButtonName === "OK"
      ? "Ctrl+K"
      : props.okButtonName === "Yes"
      ? "Ctrl+X"
      : "Ctrl+J";
  return (
    <div>
      <Dialog
        open={props.dialogOpen}
        onClose={props.onDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ wordBreak: "break-word", wordWrap: "break-word" }}
          >
            {props.dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.hideCancelButton ? null : (
            <Tooltip title="Ctrl+Y" placement="top">
              <Button onClick={props.onDialogClose} ref={closeButtonRef}>
                {props.cancelButtonName}
              </Button>
            </Tooltip>
          )}
          <Tooltip title={tooltipContent} placement="top">
            <Button
              disabled={props.disabled}
              onClick={props.onOkClick}
              autoFocus
              ref={refValue}
            >
              {props.okButtonName}
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  );
}
