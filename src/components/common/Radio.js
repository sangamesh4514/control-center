import React from 'react';
import {Radio as MuiRadio} from "@material-ui/core";

const Radio = ({name,value,checked,handleChecked,...props}) => {
  return (
    <>
      <MuiRadio
        checked={checked}
        onChange={handleChecked}
        value={value}
        name={name}
        color={"primary"}
        {...props}
        // inputProps={{ "aria-label": "A" }}
      />
    </>
  );
}

export default Radio
