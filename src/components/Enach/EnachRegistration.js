import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import CryptoJS from "crypto-js";

import { React, useEffect, useState } from "react";
import AccordianContainer from "../CustomComponents/AccordianContainer";
import CustomDropDown from "../CustomComponents/CustomDropDown";
import CustomTextField from "../CustomComponents/CustomTextField";
import { Refresh } from "@mui/icons-material";
import EnachConvertForm from "./EnachConvertForm";

const commonStyles = {
  bgcolor: "white",
  borderColor: "#004A92 !important",
  m: 1,
  border: 2,
};

const EnachRegistration = () => {
  const [currentDate, setCurrentDate] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  const [branch, setBranch] = useState("");
  const [emiAmount, setEmiAmout] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mailId, setMailId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [paymentType, setPayMentType] = useState("netbank");
  const [applicantName, setApplicantName] = useState("");
  const [nachAmount, setNachAmount] = useState("");
  const [mandateEndDate, setMandateEndDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [debitType, setDebitType] = useState("");
  const [bankBranchName, setBankBranchName] = useState("");
  const [applicantNameList, setApplicantNameList] = useState([]);
  const [hiddenForm, setHiddenForm] = useState(false);
  const [channel, setChannel] = useState("");

  const customerAccountNumber = "00020350000114";
  const maxAmount = "5000.00";
  const expiryDate = "";
  const debitAmount = "";
  const checksum =
    customerAccountNumber +
    "|" +
    currentDate +
    "|" +
    expiryDate +
    "|" +
    debitAmount +
    "|" +
    maxAmount;
  const [msgIdValue, setMsgIdValue] = useState(1);
  const [msgId, setMsgId] = useState("");

  useEffect(() => {
    let storedmsgIdValue = parseInt(localStorage.getItem("msgIdValue") || "1");
    storedmsgIdValue = storedmsgIdValue + 1;
    setMsgIdValue(storedmsgIdValue);
    let str = "" + storedmsgIdValue;
    let pad = "000100";
    let ans = pad.substring(0, pad.length - str.length) + str;
    let value = "L1" + ans;
    setMsgId(value);
  }, []);
  const encryptText = (text) => {
    let secretKey = "k2hLr4X0ozNyZByj5DT66edtCEee1x+6";
    // const encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), secretKey);
    /*  const CryptoJS = require("crypto-js");
    const value = CryptoJS.enc.Hex.parse(text);
    const key = CryptoJS.enc.Hex.parse(secretKey);
    const ivvar = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
    const encryptedStringHex = CryptoJS.AES.encrypt(value, key, {
      mode: CryptoJS.mode.ECB,
    });

    console.log(encryptedStringHex);
    console.log(encryptedStringHex.ciphertext.toString()); */
    var hash = CryptoJS.SHA256(text);
    const key = CryptoJS.enc.Hex.parse(secretKey);
    var encrypted = CryptoJS.AES.encrypt(hash, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    console.log(encrypted.toString());
    let output = "\\x" + encrypted;
    return output.toString();
  };
  const requestMap = {
    utilCode: "NACH00000000000382",
    utilCodeEncrypted: encryptText("NACH00000000000382"),
    //  "\x179ea78edac3d16dbad4e77ea34277bc229f22e6765184bdcd0f529d17f748de",
    shortCode: "SUNHFL",
    shortCodeEncrypted: "\xf65d964c998d3740d5b5f30d80e1d04e",
    checksum: { checksum },
    checksumeEncrypted:
      "19fd6140b5f043d346406a3c297f7e04d27a83bced6890b2061cf55c81fc82aa",
    merchantCategoryCode: "L001",
    msgId: msgId,
    customerAccountNumber: customerAccountNumber,
    customerAccountNumberEncrypted: "\x4b72beb9bc6be48bd24b6d4f068bbc73",
    customerAccountName: "mandate checking",
    customerAccountNameEncrypted:
      "\xcefe13b748d71c51b177c673d725fa6688f78213697ba2d4407403b3d2481889",
    customerMobileNumber: "8754549314",
    customerMobileNumberEncrypted: "\x5b47db3c73fe1554087f5194a54c4a39",
    customerMailId: "sathyac@sundarambnpphome.in",
    customerMaildIdEncrypted:
      "\x1da5b361bf67bf9f766a5b57d7acc5fcb5730951816f3c3ca565ba1d17952ad2",
    customerTelephoneNumber: "",
    customerStartDate: currentDate,
    customerExpiryDate: expiryDate,
    customerDebitAmount: debitAmount,
    customerMaximumAmount: maxAmount,
    customerDebitFrequency: "MNTH",
    customerSeqenceType: "RCUR",
    customerInstructedMemberId: "HDFC0000017",
    channel: channel,
    filler5: "S",
  };
  const [requstData, setRequestData] = useState(requestMap);
  useEffect(() => {
    getApplicationListData();
    getEncryptedData();
  }, []);
  const getEncryptedData = async () => {
    try {
      const response = await axios.post("/enach/getEncryptedData", requstData);
      console.log(response);
    } catch {
      console.log("Network Error");
    }
  };
  const getApplicationListData = async () => {
    try {
      const response = await axios.post("/enach/getApplicants", {
        applicationNum: window.location.pathname.split("=")[1],
      });
      setApplicantNameList(response.data);
    } catch {
      console.log("Network Error");
    }
  };
  const getRadioAction = (event, value) => {
    value == "Net Banking" ? setChannel("Net") : setChannel("Debit");
  };

  const getEnachDetails = async (applicantName) => {
    try {
      const response = await axios.post("/enach/enachDetails", {
        applicationNum: window.location.pathname.split("=")[1],
        applicantName: applicantName,
      });
      setBranch(
        response.data.losData["branch"] ? response.data.losData["branch"] : ""
      );
      setBankBranchName(
        response.data.bankDetails["bankBranchName"]
          ? response.data.bankDetails["bankBranchName"]
          : ""
      );
      setEmiAmout(
        response.data.nachAmount["emiAmount"]
          ? response.data.nachAmount["emiAmount"]
          : ""
      );
      setAccountNumber(
        response.data.bankDetails["bankAccountNum"]
          ? response.data.bankDetails["bankAccountNum"]
          : ""
      );
      setAccountType(
        response.data.bankDetails["bankAccountType"]
          ? response.data.bankDetails["bankAccountType"]
          : ""
      );
      setBankName(
        response.data.bankDetails["bankName"]
          ? response.data.bankDetails["bankName"]
          : ""
      );
      setDebitType("Maxi Amount");
      setFrequency("As and when Required");
      setIfscCode(
        response.data.bankDetails["ifscCode"]
          ? response.data.bankDetails["ifscCode"]
          : ""
      );
      setMailId(
        response.data.losData["emailId"] ? response.data.losData["emailId"] : ""
      );
      setMobileNumber(
        response.data.losData["mobileNumber"]
          ? response.data.losData["mobileNumber"]
          : ""
      );
      setNachAmount(
        response.data.losData["nachAmount"]
          ? response.data.losData["nachAmount"]
          : ""
      );
      setMandateEndDate("Until Cancelled");
    } catch {
      console.log("Network Error");
    }
  };
  const handleChange = (event) => {
    setPayMentType(event.target.value);
  };
  const enalbeFormAction = () => {
    localStorage.setItem("msgIdValue", parseInt(msgIdValue));
    let request = { ...requestMap, msgId: "L1000189" };
    console.log(request);
    setRequestData(request);
    setHiddenForm(true);
  };
  return (
    <Box>
      <Box sx={{ ...commonStyles, borderRadius: "16px" }}>
        <Box
          sx={{
            backgroundColor: "#004A92 !important",
            margin: "8px !important",
            borderRadius: 1,
            display: "flex",
            height: "50px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InputLabel
            sx={{ marginLeft: "2%", justifyContent: "center", color: "white" }}
          >
            {" "}
            E-Nach Mandate
          </InputLabel>
        </Box>
        <Box
          sx={{
            border: 1,
            borderColor: "#004A92 !important",
            margin: "8px !important",
            borderRadius: 1,
          }}
        >
          <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid item xs={11.5} sm={5.85} md={4} lg={2.95} xl={3}>
              <Box sx={{ marginLeft: "8px", width: "100%" }}>
                <CustomTextField
                  label={"Applicant Name"}
                  value={""}
                  disabled={true}
                  variant={"standard"}
                ></CustomTextField>
              </Box>
            </Grid>
            <Grid item xs={11.5} sm={5.85} md={4} lg={2.95} xl={3}>
              <Box sx={{ marginLeft: "8px", width: "100%" }}>
                <CustomTextField
                  label={"Branch"}
                  value={""}
                  disabled={true}
                  variant={"standard"}
                ></CustomTextField>
              </Box>
            </Grid>
            <Grid item xs={11.5} sm={5.85} md={4} lg={2.95} xl={3}>
              <Box sx={{ marginLeft: "8px", width: "100%" }}>
                <CustomTextField
                  label={"Mobile Number"}
                  value={""}
                  disabled={true}
                  variant={"standard"}
                ></CustomTextField>
              </Box>
            </Grid>
            <Grid item xs={11.5} sm={5.85} md={4} lg={2.95} xl={3}>
              <Box
                sx={{ marginLeft: "8px", marginBottom: "8px", width: "100%" }}
              >
                <CustomTextField
                  label={"Mail Id"}
                  value={""}
                  disabled={true}
                  variant={"standard"}
                ></CustomTextField>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container rowSpacing={0} columnSpacing={2}>
          <Grid id item xs={12} sm={6} md={12} lg={6} xl={5.25}>
            <Box
              sx={{
                border: 1,
                borderColor: "#004A92 !important",
                margin: "8px !important",
                borderRadius: 1,
              }}
            >
              <InputLabel style={{ marginLeft: "8px" }}>
                <h4>Customer Bank Details</h4>
              </InputLabel>
              <Grid container rowSpacing={0} columnSpacing={2}>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Bank Name"}
                      disabled={true}
                      value={""}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Account Number"}
                      value={""}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Account Type"}
                      value={""}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"IFSC Code"}
                      value={""}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box
                    sx={{
                      marginLeft: "8px",
                      marginBottom: "8px",
                      width: "100%",
                    }}
                  >
                    <CustomTextField
                      label={"Branch"}
                      value={""}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid id item xs={12} sm={6} md={12} lg={6} xl={5.25}>
            <Box
              sx={{
                border: 1,
                borderColor: "#004A92 !important",
                margin: "8px !important",
                borderRadius: 1,
              }}
            >
              <Grid container rowSpacing={0} columnSpacing={2}>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Mandate Amount (₹)"}
                      disabled={true}
                      value={""}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Nach Amount (₹)"}
                      value={""}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid
                  container
                  rowSpacing={0}
                  columnSpacing={2}
                  sx={{ marginLeft: "8px" }}
                >
                  <Grid item xs={5.87} sm={5.75} md={4} lg={5.9} xl={3}>
                    <CustomTextField
                      label={"Mandate Start Date"}
                      value={""}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Grid>
                  <Grid item xs={5.87} sm={5.75} md={4} lg={5.9} xl={3}>
                    <CustomTextField
                      label={"Mandate End Date"}
                      value={""}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Grid>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Frequency"}
                      value={""}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box
                    sx={{
                      marginLeft: "8px",
                      marginBottom: "8px",
                      width: "100%",
                    }}
                  >
                    <CustomTextField
                      label={"Debit Type"}
                      value={""}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                justifyContent: "left",
                marginLeft: "8px",
                display: "flex",
              }}
            >
              <FormControl>
                <FormLabel
                  sx={{
                    color: "#004A92 !important",
                    fontWeight: 400,
                    fontSize: "14px !important",
                    fontFamily: "Roboto",
                  }}
                >
                  Mode Of payment for Registration
                </FormLabel>
                <RadioGroup row onChange={getRadioAction}>
                  <FormControlLabel
                    sx={{
                      fontWeight: 400,
                      fontSize: "14px !important",
                      fontFamily: "Roboto",
                    }}
                    disableTypography={true}
                    value="Net Banking"
                    control={<Radio />}
                    label="Net Banking"
                  />
                  <FormControlLabel
                    sx={{
                      fontWeight: 400,
                      fontSize: "14px !important",
                      fontFamily: "Roboto",
                    }}
                    disableTypography={true}
                    value="Debit Card"
                    control={<Radio />}
                    label="Debit card"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ justifyContent: "center", display: "flex", margin: "8px" }}>
        <Button
          variant="contained"
          sx={{
            marginLeft: "8px",
            height: "2rem",
            fontWeight: "bold",
          }}
          onClick={enalbeFormAction}
        >
          {" "}
          Submit{" "}
        </Button>
      </Box>
      {hiddenForm && <EnachConvertForm enable={hiddenForm} data={requstData} />}
    </Box>
  );
};
export default EnachRegistration;
