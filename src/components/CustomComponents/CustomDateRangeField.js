import { ButtonGroup, Divider, InputLabel, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import "./Custom.css";

const CustomDateRangeField = (props) => {
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
      <ButtonGroup>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled={props.disabled}
            disableFuture
            openTo="day"
            views={["year", "month", "day"]}
            value={props.fromValue}
            onChange={props.onChange[0]}
            renderInput={(params) => (
              <TextField
                fullWidth
                id={props.id}
                variant={props.variant}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                {...params}
              />
            )}
          />{" "}
        </LocalizationProvider>
        <Divider
          sx={{
            width: "5%",
            backgroundColor: "auto",
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled={props.disabled}
            disableFuture
            openTo="day"
            views={["year", "month", "day"]}
            value={props.toValue}
            onChange={props.onChange[1]}
            renderInput={(params) => (
              <TextField
                fullWidth
                id={props.id}
                variant={props.variant}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                {...params}
              />
            )}
          />{" "}
        </LocalizationProvider>{" "}
      </ButtonGroup>
    </>
  );
};

export default CustomDateRangeField;
