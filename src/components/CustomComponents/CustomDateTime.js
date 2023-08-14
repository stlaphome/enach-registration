import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputLabel, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
const CustomDateTime = (props) => {
  return (
    <>
      <InputLabel
        required={props.required}
        size="small"
        sx={{
          color: "#004A92",
          mb: 2,
          fontWeight: 400,
          fontSize: "14px",
        
        }}
      >
        {props.label}
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          inputFormat="DD/MM/YYYY hh:mm A"
          renderInput={(params) => (
            <TextField
              variant={props.variant}
              {...params}
              sx={{
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: 0,
                },
              }}
            />
          )}
          value={props.value}
          onChange={props.onChange}
        />
      </LocalizationProvider>
    </>
  );
};
export default CustomDateTime;
