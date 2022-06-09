import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import React from "react";
// import PropTypes from "prop-types";
const useStyles = makeStyles((theme) => ({
  select: {
        margin: '0 0 2em 0',
        background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F9',
        boxShadow: 'inset 2px 2px 3px #BFD3E5, inset -2px -2px 6px rgb(255 255 255 / 80%)',
        borderRadius: '10px',
        border: 'none',
        padding: '0.5em',
        width: '-webkit-fill-available',
        color: '#747C8B',
         
    },
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "15px",
    color: "#747C8B",
    
  },
}));

const SelectField = ({ name, selectValue, label,innerLabel, options, handleChange, ...props }) => {
  const classes=useStyles()
  return (
    <>
      {/* <FormControl> */}
        <InputLabel htmlFor={name} style={{ marginBottom: "5px" }}>
          {label}
        </InputLabel>
        {/* <br></br> */}
        <select
          className={classes.select}
          name={name}
          value={selectValue}
          id={name}
          onChange={handleChange}
          style={{ width: 550 }}
          {...props}
        >
          <option hidden disabled selected value>
            {" "}
            {innerLabel}{" "}
          </option>
          {Object.keys(options).map((key) => {
            return (
              <option key={key} value={key} className={classes.title}>
                {options[key]}
              </option>
            );
          })}
        </select>
      {/* </FormControl> */}
    </>
  );
};

export default SelectField;





