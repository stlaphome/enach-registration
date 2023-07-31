import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { useState,useEffect } from "react";
import "../login/MobileLogin.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MobileLoginAction } from "../login/MobileLogin";
import { loginAction } from "../login/LoginAuth";
const OTPSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Alert Content

  const [state, setState] = useState({
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

  // --------------------------------------
  const mobileNumber = useSelector((state) => state.mob.MobileNumber);
  const [otpValue, setOtpValue] = useState("");
  const [otpValueIsTouched, setOtpValueIsTouched] = useState(false);
  const otpValueIsValid = otpValue.trim().length === 6;
  const otpValueHasError = otpValueIsTouched && !otpValueIsValid;

  const [resendState, setResendState] = useState(false);
  const [verifyState, setVerifyState] = useState(true);
  const [seconds, setSeconds] = useState(120);
  var timer;

  useEffect(() => {
    timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setOtpValueIsTouched(false);
        setResendState(true);
        setVerifyState(false);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  const OtpChangeHandler = (event) => {
    setOtpValue(event.target.value);
  };
  const OtpTouchHandler = () => {
    setOtpValueIsTouched(true);
  };
  const resendOTPHadler = () => {
    regenerateOTP();
  };
  const VerifyHandler = () => {
    setOtpValueIsTouched(true);
    if (otpValueIsValid) {
      verifyData();
    }
  };
  const regenerateOTP = async () => {
    try {
      const response = await axios.post("/generateOtp", {
        employeeId: mobileNumber,
        password: "",
      });
      console.log(response);
      // setSMessage(response.data);
      // openSAlertHandler();
      setOtpValueIsTouched(false);
      setSeconds(60);
      setVerifyState(true);
      setResendState(false);
    } catch (e) {
      console.log(e);
      if (e.code === "ERR_NETWORK" || e.code === "ERR_BAD_RESPONSE") {
        setErrorMessage(e.message);
      } else {
        setErrorMessage(e.response.data);
      }
      openAlertHandler();
    }
  };
  const verifyData = async () => {
    try {
      const response = await axios.post("/authenticate", {
        employeeId: mobileNumber,
        password: otpValue,
      });
      console.log(response);
      Cookies.set("islogin", true);
      Cookies.set("Token", response["data"]["jwToken"]);
      Cookies.set("userName", response["data"]["userId"]);
      Cookies.set("lastLogin", response["data"]["lastLoginTime"]);
      navigate("/stlap/home/dashboard", { replace: true });
      dispatch(MobileLoginAction.updateOTPSection(false));
      dispatch(loginAction.updateLogin(true));
    } catch (e) {
      setErrorMessage("Please Enter Valid OTP");
      openAlertHandler();
      console.log(e);
    }
  };
  return (
    <Box>
      <Grid container spacing={1} sx={{ marginTop: "1.5rem" }}>
        <Grid item xs={12}>
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid item xs={12}>
              <InputLabel
                sx={{ color: "#004a92", fontWeight: 550, fontSize: "14px" }}
              >
                Enter OTP
              </InputLabel>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={otpValueHasError ? true : false}
                onChange={OtpChangeHandler}
                onBlur={OtpTouchHandler}
                autoFocus
                placeholder="Enter 6 digit OTP"
                sx={{
                  boxShadow: "0 2px 5px 0 rgb(113 113 113 / 24%)",
                  border: "none",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
              />
              {otpValueHasError && (
                <p className="error">Please Enter 6 digit OTP </p>
              )}
              <p className="otp">
                Resend OTP in <span className="timer">00:{seconds}s</span>
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          disabled={!resendState}
          variant="contained"
          sx={{ backgroundColor: "#004a92" }}
          onClick={resendOTPHadler}
        >
          Resend OTP
        </Button>
        <Button
          onClick={VerifyHandler}
          disabled={!verifyState}
          variant="contained"
          sx={{ backgroundColor: "#004a92" }}
        >
          Verify
        </Button>
      </Box>
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

export default OTPSection;
