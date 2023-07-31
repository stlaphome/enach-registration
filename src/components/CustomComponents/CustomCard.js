import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CustomCard = (props) => {
  return (
    <Card sx={{ background: "#E0F2F7", borderRadius: "12px" }} className="listCards">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          padding: "8px",
        }}
      >
        <img src={props.imgSrc} className="listIcons" />
        <Typography sx={{ fontWeight: 700 }}>{props.label}</Typography>
        <Typography sx={{ fontWeight: 600 }} color="#090979">
          {props.value}
        </Typography>
      </Box>
    </Card>
  );
};
export default CustomCard;
