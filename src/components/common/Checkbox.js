import React,{useState} from 'react'
import {Checkbox as MuiCheckbox} from "@material-ui/core"
import "./styles.css"

const Checkbox = ({name,checked,handleChecked}) => {
  
  return (
    <>
      <MuiCheckbox
        name={name}
        checked={checked}
        onChange={handleChecked}
        color="primary"
        // inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </>
  );
}

export default Checkbox
