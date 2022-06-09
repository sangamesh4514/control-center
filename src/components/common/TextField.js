import React from "react";
// import PropTypes from "prop-types";
import { TextField as MuiTextField ,makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textfield: {
    background:
      "linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8",
    boxShadow:
      "inset 2px 2px 3px #BFD3E5, inset -2px -2px 6px rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    borderColor: "white",
    height: "40px",
    color: "#747C8B",
    border: "none",
    padding: "0.5em",
  },
}));
const TextField = ({name,value,error, ...props }) => {
  const classes=useStyles()
  return (
    <>
      <input
      autoComplete="off"
      className={classes.textfield}
        style={{width:550}}
        id={name}
        name={name}
        value={value}
        {...props}
      />
    </>
  )
};

// TextField.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   type: PropTypes.oneOf(["text", "number","file","radio"]),
//   value: PropTypes.any,
//   onChange: PropTypes.func.isRequired,
// };

export default TextField;

