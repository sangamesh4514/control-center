import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  button: {
    background:
      "linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.4)",
    boxSizing: "border-box",
    boxShadow: "inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    borderRadius: "50px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "15px",
    textAlign: "center",
    letterSpacing: "0.00310565px",
    color: "#747C8B",
    width: "100%",
    padding: "1em",
  },
  buttonui: {
    background:
      "linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.6)",
    boxSizing: "border-box",
    boxShadow: "inset 1px 1px 1px rgb(255 255 255 / 24%);",
    borderRadius: "50px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "18px",
    textAlign: "center",
    letterSpacing: "0.00310565px",
    textTransform: "capitalize",
    color: "rgba(116, 124, 139, 0.72)",
    margin: "0 0.5em 0.5em 0.5em",
    // padding: "1em",
  },
}));

const Button = ({name,handleClick,...props}) => {
  const classes=useStyles()
  return (
    <>
      <MuiButton className={classes.buttonui} onClick={handleClick} {...props}>
        {name}
      </MuiButton>
    </>
  );
}

export default Button
