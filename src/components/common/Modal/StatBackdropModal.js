import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  button: {
    background:
      "linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.6)",
    boxSizing: "border-box",
    boxShadow:
      "-3px - 3px 6px rgb(255 255 255 / 21 %), 1px 1px 2px rgb(0 0 0 / 20 %), inset 1px 1px 1px rgb(255 255 255 / 24 %)",
    borderRadius: "50px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "18px",
    textAlign: "center",
    letterSpacing: "0.00310565px",
    textTransform: "uppercase",
    color: "rgba(116, 124, 139, 0.72)",
    marginRight: "25px"
  },
  modal: {
    background:
      "linear-gradient(108.16deg, #FFFFFF -11.47%, #E9F1F8 33.17%, #D5E4F1 100.86%)",
    borderRadius: " 25px",
  },
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "15px",
    color: "#747C8B",
  },
  maintitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "20px",
    color: "#747C8B",
  },
}));

const StatBackdropModal = ({ open, handleSuccess, handleFailure, modal }) => {
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Grid container className={classes.modal}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px",
            }}
          >
            <p className={classes.maintitle}>{modal.title}</p>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <p className={classes.title}>{modal.body}</p>
              <p className={classes.title} style={{ textAlign: 'center' }}>{modal.number}</p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px",
            }}
          >
            <Button onClick={handleFailure} className={classes.button}>
              {modal.failure}
            </Button>
            <Button onClick={handleSuccess} className={classes.button}>
              {modal.success}
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default StatBackdropModal;
