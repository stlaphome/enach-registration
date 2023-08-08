import {
  Autocomplete,
  FormControl,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import "./Custom.css";

const CustomAutoComplete = (props) => {
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
      <FormControl fullWidth>
        <Tooltip title={props.tooltip ? props.tooltip : ""}>
          <Autocomplete
          
            id={props.id}
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onInputChange={props.onInputChange}
            clearText={props.clearText}
            clearicon={props.clearIcon}
            options={props.autoCompleteValues}
            isOptionEqualToValue={(option, value) =>
              option.label === value
            }
            renderInput={(params) => (
              <TextField
                required={props.required}
                {...params}
                variant={props.variant}
                placeholder={props.placeholder}
              />
            )}
          />
        </Tooltip>
      </FormControl>
    </>
  );
};

export default CustomAutoComplete;
