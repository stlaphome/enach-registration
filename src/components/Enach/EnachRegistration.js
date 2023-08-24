import {
  Backdrop,
  Button,
  CircularProgress,
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
import { useParams } from "react-router-dom";
import contactImg from "../images/contact.png";
import EnachConvertForm from "./EnachConvertForm";

const commonStyles = {
  bgcolor: "white",
  borderColor: "#004A92 !important",
  m: 1,
  border: 2,
};

const EnachRegistration = () => {
  const { appnum } = useParams();
  let currentMonth = new Date().getMonth() + 1;
  const [currentDate, setCurrentDate] = useState(
    `${new Date().getFullYear()}-${
      currentMonth > 9 ? currentMonth : "0" + currentMonth
    }-${new Date().getDate()}`
  );
  const [customerName, setCustomerName] = useState("");
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
  const [frequency, setFrequency] = useState("As and when Required");
  const [debitType, setDebitType] = useState("Maximum Amount");
  const [bankBranchName, setBankBranchName] = useState("");
  const [applicantNameList, setApplicantNameList] = useState([]);
  const [customerBank, setCustomerBank] = useState("");
  const [mandateStartDate, setMandateStartDate] = useState("");
  const [nachBankBranch, setNachBankBranch] = useState("");
  const [nachIfscCode, setNachIfscCode] = useState("");
  const [nachBankType, setNachBankType] = useState("");
  const [nachBank, setNachBank] = useState("");
  const [customerMailId, setCustomerMailId] = useState("");
  const [customerMobileNum, setCustomerMobileNum] = useState("");
  const [mandateAmount, setMandateAmount] = useState("");
  const [contactAdmin, setContactAdmin] = useState(false);
  const [open, setOpen] = useState(true);
  const [hiddenForm, setHiddenForm] = useState(false);
  const [channel, setChannel] = useState("");
  const customerAccountNumber = "50200003144866";
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

  const requestMap = {
    utilCode: "NACH00000000000382",
    shortCode: "SUNHFL",
    checkSum: checksum,
    customerAccountNumber: customerAccountNumber,
    customerAccountName: "mandate checking",
    customerMobileNumber: "8754549314",
    customerMailId: "sathyac@sundarambnpphome.in",
  };
  const [requstData, setRequestData] = useState(requestMap);
  useEffect(() => {
    getApplicationListData();
    setOpen(false);
  }, []);

  const enalbeFormAction = async () => {
    await axios.post("/enach/getEncryptedData", requstData).then((response) => {
      let data = response.data;
      localStorage.setItem("msgIdValue", parseInt(msgIdValue));
      let request = {
        ...data,
        msgId: msgId,
        merchantCategoryCode: "L001",
        msgId: msgId,
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
      setRequestData(request);
      setHiddenForm(true);
    });
  };
  const getApplicationListData = async () => {
    try {
      const response = await axios.post("/enach/enachDetails", {
        applicationNum: appnum,
        applicationName: "ltu",
      });
      setApplicantNameList(response.data);
      setMailId(response.data.mailId);
      setMobileNumber(response.data.mobileNum);
      setCustomerBank(response.data.mobileNum);
      setCustomerMailId(response.data.emailId);
      setApplicantName(response.data.userName);
      setNachIfscCode(response.data.custIfscCode);
      setNachBank(response.data.custBankBranch);
      setMandateAmount(response.data.mandateAmount);
      setMandateEndDate(response.data.mantadteEndDate);
      setMandateStartDate(response.data.mantadteStartDate);
      setCustomerMobileNum(response.data.mobileNum);
      setCustomerName(response.data.userName);
      setNachAmount(response.data.nachAmount);
      setNachBank(response.data.custIfscCode);
      setAccountNumber(response.data.custBankAcctNum);
    } catch {
      setContactAdmin(true);
      console.log("Network Error");
    }
  };
  const saveDetails = async () => {
    try {
      // const emandateApi = axios.create({
      //   baseURL: "https://emandateut.hdfcbank.com/",
      // });
      // const response = await emandateApi.get("testingapi.aspx", {
      // CheckSum: "",
      // MsgId: "",
      // Customer_Name: "",
      // Customer_Mobile: "",
      // Customer_EmailId: "",
      // CustomerAccountNo: "",
      // Customer_StartDate: "",
      // Customer_ExpirtyDate: "",
      // Customer_DebitAmount: "",
      // Customer_maxAmount: "",
      // Customer_DebitFrequenty: "",
      // Customer_InstructedMemberId: "",
      // Short_Code: "",
      // Customer_SequenceType: "",
      // Merchant_Category_Code: "",
      // Customer_Reference: "",
      // Customer_Reference: "",
      // Channel: "",
      // UtilCode: "",
      // Filter1: "",
      // Filter2: "",
      // Filter3: "",
      // Filter4: "",
      // Filter5: "",
      // Filter6: "",
      // Filter7: "",
      // Filter8: "",
      // Filter9: "",
      // Filter10: "",
      // applicationNum: window.location.pathname.split("=")[1],
      // applicantName: applicantName,
      // });
      // setBranch(response.data.losData["branch"]);
      // setEmiAmout(response.data.nachAmount["emiAmount"]);
      // setAccountNumber(response.data.bankDetails["bankAccountNum"]);
      // setAccountType(response.data.bankDetails["bankAccountType"]);
      // setBankName(response.data.bankDetails["bankName"]);
      setDebitType("Maxi Amount");
      setFrequency("As and when Required");
      // setIfscCode(response.data.bankDetails["ifscCode"]);
      // setMailId(response.data.losData["emailId"]);
      // setMobileNumber(response.data.losData["mobileNumber"]);
      // setNachAmount(response.data.losData["nachAmount"]);
      // setMandateEndDate("Until Cancelled");
      window.open("https://emandateut.hdfcbank.com/testingapi.aspx");
    } catch {
      setContactAdmin(true);
      console.log("Network Error");
    }
  };
  const getRadioAction = (event, value) => {
    value == "Net Banking" ? setChannel("Net") : setChannel("Debit");
  };

  const getEnachDetails = async (applicantName) => {
    try {
      const response = await axios.post("/enach/enachDetails", {
        applicationNum: appnum,
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
      setContactAdmin(true);
      console.log("Network Error");
    }
  };
  const handleChange = (event) => {
    setPayMentType(event.target.value);
  };
  return contactAdmin ? (
    <Box
      sx={{
        minHeight: "calc(100vh - 110px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{
            height: "350px",
            width: "350px",
            position: "relative",
            top: "30%",
          }}
          src={contactImg}
          alt="Thumb"
        />
      </Box>
    </Box>
  ) : (
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
                  value={applicantName}
                  disabled={true}
                  variant={"standard"}
                ></CustomTextField>
              </Box>
            </Grid>
            <Grid item xs={11.5} sm={5.85} md={4} lg={2.95} xl={3}>
              <Box sx={{ marginLeft: "8px", width: "100%" }}>
                <CustomTextField
                  label={"Branch"}
                  value={customerBank}
                  disabled={true}
                  variant={"standard"}
                ></CustomTextField>
              </Box>
            </Grid>
            <Grid item xs={11.5} sm={5.85} md={4} lg={2.95} xl={3}>
              <Box sx={{ marginLeft: "8px", width: "100%" }}>
                <CustomTextField
                  label={"Mobile Number"}
                  value={customerMobileNum}
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
                  value={customerMailId}
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
                      value={nachBank}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Account Number"}
                      value={accountNumber}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Account Type"}
                      value={nachBankType}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"IFSC Code"}
                      value={nachIfscCode}
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
                      value={nachBankBranch}
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
                      value={mandateAmount}
                      variant={"standard"}
                    ></CustomTextField>
                  </Box>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Nach Amount (₹)"}
                      value={nachAmount}
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
                      value={mandateStartDate}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Grid>
                  <Grid item xs={5.87} sm={5.75} md={4} lg={5.9} xl={3}>
                    <CustomTextField
                      label={"Mandate End Date"}
                      value={mandateEndDate}
                      disabled={true}
                      variant={"standard"}
                    ></CustomTextField>
                  </Grid>
                </Grid>
                <Grid item xs={11.5} sm={5.75} md={4} lg={5.85} xl={3}>
                  <Box sx={{ marginLeft: "8px", width: "100%" }}>
                    <CustomTextField
                      label={"Frequency"}
                      value={frequency}
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
                      value={debitType}
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
                  }}
                >
                  Mode Of payment for Registration
                </FormLabel>
                <RadioGroup row onChange={getRadioAction}>
                  <FormControlLabel
                    sx={{ fontWeight: 400, fontSize: "14px !important" }}
                    disableTypography={true}
                    value="Net Banking"
                    control={<Radio />}
                    label="Net Banking"
                  />
                  <FormControlLabel
                    sx={{ fontWeight: 400, fontSize: "14px !important" }}
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
          onClick={enalbeFormAction}
          sx={{
            marginLeft: "8px",
            height: "2rem",
            fontWeight: "bold",
          }}
        >
          {" "}
          Submit{" "}
        </Button>
      </Box>
      {open && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {hiddenForm && <EnachConvertForm enable={hiddenForm} data={requstData} />}
    </Box>
  );
};
export default EnachRegistration;
