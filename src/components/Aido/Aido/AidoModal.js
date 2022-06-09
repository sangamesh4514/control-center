import { Dialog, DialogTitle, DialogActions,DialogContent, Button,Grid,Typography,makeStyles } from "@material-ui/core";
import React from 'react'
import DataCard from "./DataCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    background:
      "linear-gradient(182.87deg, rgba(255, 255, 255, 0.05) 0.69%, rgba(213, 232, 248, 0.05) 95.8%), #EBF2F8",
    boxSizing: " border-box",
    padding: "1em",
    boxShadow: "inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
  },
  
}));
const AidoModal = ({ open, handleClose,data }) => {
const classes=useStyles()
 console.log(data)
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.paper}>
          <Grid container>
            <Grid item xs={10} style={{ paddingLeft: "10px" }}>
              <Typography variant="h6">
                Sensor and AI Data
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={handleClose}>X</Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.paper}>
          <Grid container spacing={3}>
            {data.map((item) => (
              <Grid item xs={12}>
                <DataCard
                  title={item.module_name}
                  body={item.submodule_name}
                  value={item.value}
                  time={item.last_edited}
                  unit={item.unit}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AidoModal
