import React, { useState } from "react";
import Box from "@mui/material/Box";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import { loginAction } from "./LoginAuth";
import { MobileLoginAction } from "./MobileLogin";
import Button from "@mui/material/Button";
import "./Idlogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import CryptoJS from "crypto-js";
import Snackbar from "@mui/material/Snackbar";

const Idlogin = () => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const openAlertHandler = () => {
    setAlert(true);
  };
  const closeAlertHandler = () => {
    setAlert(false);
  };
  const employeeOnClickHandler = () => {
    closeAlertHandler();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToMobileNumberLogin = () => {
    dispatch(loginAction.updateLogin(false));
    dispatch(loginAction.updateEmployeeIDScreen(false));
    dispatch(loginAction.updateMobileScreen(true));
    dispatch(MobileLoginAction.updateNumberSection(true));
    dispatch(MobileLoginAction.updateOTPSection(false));
  };
  const [employeeID, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [employeeIdIsTouched, setEmployeeIdIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const nameValid = employeeID.trim() !== "";
  const passwordValid = password.trim() !== "";
  const nameHasError = employeeIdIsTouched && !nameValid;
  const passwordHasError = passwordIsTouched && !passwordValid;
  const onChangeEmployeeID = (event) => {
    setEmployeeId(event.target.value.toUpperCase());
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const SendData = async () => {
    try {
      const loginResponse = await axios.post(
        "https://bmapp.sundaramhome.in/stlap/ostlap/logindtls",
        {
          user_id: btoa(employeeID),
          password: btoa(password),
        }
      );
      console.log(loginResponse);


      if (loginResponse.data.message === "Failure") {
        setErrorMessage(loginResponse.data.error_msg);
        openAlertHandler();
      }
    } catch (e) {
      console.log(e);
      if (e.code === "ERR_NETWORK") {
        setErrorMessage(e.message);
      }
      openAlertHandler();
    }
  };
  const loginHandler = () => {
    setEmployeeIdIsTouched(true);
    setPasswordIsTouched(true);
    if (nameValid && passwordValid) {
      SendData();
      console.log(employeeID, password);
    }
  };
  const employeeBlurHandler = () => {
    setEmployeeIdIsTouched(true);
  };
  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  };
  // Enter key Handler
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      loginHandler();
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "1rem",
        boxShadow: "0 2px 5px 0 rgb(113 113 113 / 24%)",
        borderRadius: "1.4rem",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "stretch",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" ,justifyContent:"center"}}>
        {/* <LockIcon sx={{ color: "#004a92" }} /> */}
        <Typography variant="body" sx={{ color: "#004a92", fontWeight: 700 }}>
         Loan Top Up 
        </Typography>
      </Box>
 
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item xs={12}>
              <InputLabel
                sx={{ color: "#004a92", fontWeight: 550, fontSize: "14px" }}
              >
                User ID
              </InputLabel>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                onClick={employeeOnClickHandler}
                onKeyDown={handleKeypress}
                placeholder="Enter Employee ID"
                error={nameHasError ? true : false}
                value={employeeID}
                autoFocus
                onBlur={employeeBlurHandler}
                onChange={onChangeEmployeeID}
                sx={{
                  boxShadow: "0 2px 5px 0 rgb(113 113 113 / 24%)",
                  border: "none",
                }}
                size="small"
              />
              {nameHasError && (
                <p marginTop="8px" className="error">Please Enter Employee ID</p>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "1.4rem" }}>
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid item xs={12}>
              <InputLabel
                sx={{ color: "#004a92", fontWeight: 550, fontSize: "14px" }}
              >
                Password
              </InputLabel>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                type="password"
                placeholder="Enter Password"
                error={passwordHasError ? true : false}
                value={password}
                onKeyDown={handleKeypress}
                onBlur={passwordBlurHandler}
                onChange={onChangePassword}
                sx={{
                  boxShadow: "0 2px 5px 0 rgb(113 113 113 / 24%)",
                  border: "none",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
              />
              {passwordHasError && (
                <p className="error">Please Enter Password </p>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={loginHandler}
          variant="contained"
          sx={{ backgroundColor: "#004a92" }}
        >
          Login
        </Button>
      </Box>
      {/* <Box className="login-info" sx={{ marginTop: "2rem" }}>
        <Link
          onClick={navigateToMobileNumberLogin}
          underline="none"
          sx={{
            cursor: "pointer",
            fontSize: "0.9rem",
            color: "#004a92",
            paddingTop: "0.2rem",
            fontWeight: 540,
          }}
        >
          Login with Mobile Number
        </Link>
      </Box> */}
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={closeAlertHandler}
      >
        <Alert
          onClose={closeAlertHandler}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Idlogin;
