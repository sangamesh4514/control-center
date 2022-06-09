import { Dialog, DialogActions, DialogTitle, Grid, Typography } from '@material-ui/core';
import React,{useState} from 'react'
import Button from '../common/Button';
import SelectField from '../common/SelectField';

const BehaviourCustomOptions = ({
  data,
  setData,
  title,
  open,
  handleClose,
  handleCustomClose,
  handleSave,
}) => {
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Repeat</Typography>
              </Grid>
              <Grid item xs={4}>
                <SelectField
                  style={{ width: "400px" }}
                  name="behaviour"
                  options={{ 1: "1", 2: "2" }}
                  defaultValue={"once"}
                
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DialogActions>
          <div style={{ flex: "1" }} />
          <Button
            name={"Discard"}
            handleClick={() => {
              handleCustomClose();
              handleClose();
            }}
          />
          <Button name={"Save "} handleClick={handleSave} />
          <div style={{ flex: "1" }} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BehaviourCustomOptions
