import React from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = ({open,handleClose,time,type,message}) => {
  return (
    <>
      <Snackbar open={open} autoHideDuration={time} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={type}>
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Alert

// there are 4 types --error,warning,info,success
{/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}