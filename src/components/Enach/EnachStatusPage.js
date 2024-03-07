import {Box, InputLabel } from "@mui/material";
import logo from "../images/SF_Logo.png";
import contactImg from "../images/contact.png";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TransitionNotSuccess from "../CustomComponents/TransitionNotSuccess";
import TransitionSuccess from "../CustomComponents/TransitionSuccess";
import StlapFooter from "../CustomComponents/StlapFooter";

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: '#004A92 !important',
    m: 1,
    border: 2,
  };

const EnachStatusPage = () => {
    const [isSuccessTransitionCompleted, setIsSuccessTransitionCompleted] = useState(false);
    const [isNotSuccessTransitionCompleted, setIsNotSuccessTransitionCompleted] = useState(false);
    

    const successTransitionCompleted = (v) => {
        setIsSuccessTransitionCompleted(v);
    }

    const notSuccessTransitionCompleted = (v) => {
        setIsNotSuccessTransitionCompleted(v);
    }

    return(
        <>
        <Box sx={{backgroundColor: "#004A92 !important", margin: "0px 8px 0px 8px", display:"flex", height: "50px", 
            alignItems: "center", justifyContent: "center", position: "sticky", top: "0", zIndex: "10"}}> 
        <img
          style={{height: "75%"}}
          src={logo}
          alt="Thumb"/>
        </Box>
        <Box sx={{...commonStyles}}>
        <Box sx={{minHeight: "calc(100vh - 110px)", display: "flex", justifyContent:"center", flexDirection: "column"}}>
        { false ?
        <Box sx={{minHeight: "calc(100vh - 110px)", display: "flex", justifyContent:"center"}}>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <img
                style={{height: "250px", width: "250px", position: "relative", top: "30%"}}
                src={contactImg}
                alt="Thumb"
                />
            </Box>
        </Box>
        : ( "true" === "true" ?
            <Box sx={{justifyContent: "center"}}>
                <TransitionSuccess isTransitionCompleted={successTransitionCompleted} duration={5} width={100} height={100}/> 
                { isSuccessTransitionCompleted ? 
                <>
                        <InputLabel sx={{display: "flex", justifyContent: "center", marginBottom: "16px"}}>Enach Registred Successfully</InputLabel>
                        <Box sx={{justifyContent: "center", display: "flex", position: "relative", top: "100px", flexDirection: "column"}}>
                        <InputLabel sx={{display: "flex", justifyContent: "center", textAlign: "center", marginBottom: "8px"}}>
                         </InputLabel> 
                         
                    </Box>
                </>    
                    :   <InputLabel sx={{display: "flex", justifyContent: "center", marginBottom: "16px"}}>Your Payment is Processing... please wait.</InputLabel> }
            </Box>
            : "true" === "false" && (<Box sx={{justifyContent: "center"}}>
                <TransitionNotSuccess isTransitionCompleted={notSuccessTransitionCompleted} duration={2} width={100} height={100}/> 
                { isNotSuccessTransitionCompleted ? 
                        <InputLabel sx={{display: "flex", justifyContent: "center", marginBottom: "16px"}}>Sorry !! Payment Failed.</InputLabel>
                    :   <InputLabel sx={{display: "flex", justifyContent: "center", marginBottom: "16px"}}>Your Payment is Processing... please wait.</InputLabel> }
                    </Box>)
           )}
        </Box>
        <StlapFooter />
        </Box>
        </>
    );

}

export default EnachStatusPage;