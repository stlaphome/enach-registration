import { InfoOutlined } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useState } from "react";

const CustomDropDown = (props) => {
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
       {(props.toolTip && props.info === "true" ) ? <Tooltip title={props.toolTip} placement="top" enterTouchDelay={0}>
              <InfoOutlined fontSize="small" sx={{marginLeft: "2px", position: "relative", top:"5px"}}/>
        </Tooltip> : <></> }
      </InputLabel>
      <FormControl fullWidth variant={props.variant}>
        <Select
          sx={{
            
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
          MenuProps={props.MenuProps}
          onChange={props.onChange}
          onBlur={props.onBlur}
          error={props.error}
          defaultValue={props.defaultValue}
          displayEmpty={props.displayEmpty}
          value={props.value}
          id={props.id}
          disabled={props.disabled}
        >
          {props.placeholder ? (
            <MenuItem value="-1" key="placeholder">
              <p className="placeHolder_text">{props.placeholder}</p>
            </MenuItem>
          ) : null}

          {props.dropDownValue.map((item) => {
            return (
              <MenuItem value={item.value} key={item.key}>
                {item.text}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default CustomDropDown;
