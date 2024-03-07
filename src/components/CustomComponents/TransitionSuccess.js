import React, { useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Box, InputLabel } from "@mui/material"
import { useState } from "react"




function CircularProgress({ progress }) {
    const circleLength = useTransform(progress, [0, 100], [0, 1])
    const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1])
    const circleColor = useTransform(
      progress,
      [0, 95, 100],
      ["#FFCC66", "#FFCC66", "#66BB66"]
    )

    return (
      <Box sx={{margin: "8px"}}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 258 258"
      >
        {/* Check mark  */}
        <motion.path
          transform="translate(60 85)"
          d="M3 50L45 92L134 3"
          fill="transparent"
          stroke="#7BB86F"
          strokeWidth={8}
          style={{ pathLength: checkmarkPathLength }}
        />
        {/* Circle */}
        <motion.path
          d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
          fill="transparent"
          strokeWidth="8"
          stroke={circleColor}
          style={{
            pathLength: circleLength
          }}
        />
      </motion.svg>
      </Box>
    )
  }
  
  const TransitionSuccess = () => {

    let progress = useMotionValue(100);

    // const top = (window.innerHeight / 2) - "100vh";

    const[isTransitionCompleted, setIsTransitionCompleted] = useState(false);

    useEffect(() => {
     setTimeout(() => {
        setIsTransitionCompleted(true);
     }, 1100);   
    })

    return (
    <Box sx={{position: "relative", minHeight: "calc(100vh - 50px)", display: "flex", flexDirection: "column", justifyContent:"center"}}>
      <div style={{justifyContent: "center", display: "flex"}}>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 100 }}
          style={{ x: progress }}
          transition={{ duration: 1 }}
        />
        <CircularProgress progress={progress} />
      </div>
      {isTransitionCompleted === true ? 
            <InputLabel sx={{display: "flex", justifyContent: "center"}}>Enach has been processed Successfully</InputLabel>
       : <></> }
      </Box>
    )
  }

  export default TransitionSuccess;