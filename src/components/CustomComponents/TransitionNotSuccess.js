import { Box } from "@mui/material"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"


function CircularProgress(cProps) {
    const circleLength = useTransform(cProps.progress, [0, 100], [0, 1])
    const checkmarkPathLength = useTransform(cProps.progress, [0, 95, 100], [0, 0, 1])
    const circleColor = useTransform(
      cProps.progress,
      [0, 95, 100],
      ["#FFCC66", "#FFCC66", "#FF0000"]
    )

    return (
      <Box sx={{margin: "8px"}}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={cProps.width}
        height={cProps.height}
        viewBox="0 0 258 258"
      >
        <motion.g>
            <motion.line
            transform="translate(60 85)"
                x1={.25}
                y1={110} 
                x2={140}
                y2={.25}
                strokeWidth={8}
                fill="transparent"
                stroke="red"
                style={{ pathLength: checkmarkPathLength }}
            />
        <motion.line
            transform="translate(60 85)"
                x1={.25}
                y1={.25} 
                x2={140}
                y2={110}
                strokeWidth={8}
                fill="transparent"
                stroke="red"
                style={{ pathLength: checkmarkPathLength }}
            />
        </motion.g>
        
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

const TransitionNotSuccess = (props) => {
    let progress = useMotionValue(100);
    
    useEffect(() => {
      setTimeout(() => {
       props.isTransitionCompleted(true);
      }, props.duration * 1040);   
     })

    return(
        <div style={{justifyContent: "center", display: "flex"}}>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 100 }}
          style={{ x: progress }}
          transition={{ duration: props.duration }}
        />
        <CircularProgress progress={progress} width={props.width} height={props.height}/>
      </div>
    );
}

export default TransitionNotSuccess;