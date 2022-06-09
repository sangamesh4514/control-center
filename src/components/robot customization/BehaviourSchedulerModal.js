import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  TextField as MuiTextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import SelectField from "../common/SelectField";
import TextField from "../common/TextField";
import { url, rosUrl } from "../common/api";
import axios from "axios";
import useStyles from "./styles";

/** * Represents Add/Edit Behaviour Scheduler of the Robot
 * @module {function} Add/Edit Behaviour Scheduler  */

const BehaviourSchedulerModal = ({
  data,
  robot_id,
  setData,
  open,
  handleClose,
  title,
  options,
  handleSave,
}) => {
  const classes = useStyles();
  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
    console.log(e.target.value);
    setData({ ...data });
  };

  const handleDelete = () => {
    setData({
      name: "",
      behaviour_id: null,
      repeat_type: "None",
      date: null,
      time: null,
    });
    handleClose();
  };

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
        {/* <DialogTitle>{title}</DialogTitle> */}
        <Grid container className={classes.modal} style={{ width: "600px" }}>
          <Grid
            item
            xs={12}
            style={{ paddingLeft: "40px", paddingTop: "20px" }}
          >
            <p
              className={classes.title}
              style={{ color: "#626976", fontSize: "25px" }}
            >
              {title}
            </p>
            <Typography variant="subtitle1"></Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ paddingLeft: "40px", paddingTop: "30px" }}
          >
            <p className={classes.title}>Name</p>
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: "40px" }}>
            <Grid item xs={9}>
              <TextField
                type="text"
                style={{ width: "500px" }}
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ paddingLeft: "40px", paddingTop: "30px" }}
          >
            <p className={classes.title}>Behaviour</p>
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: "40px" }}>
            <SelectField
              style={{ width: "500px" }}
              name="behaviour_id"
              options={options}
              innerLabel="--select a behaviour--"
              selectValue={data.behaviour_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ paddingLeft: "40px", paddingTop: "30px" }}
          >
            <p className={classes.title}>Schedule</p>
          </Grid>
          <Grid item xs={12}>
            <Grid container style={{ paddingLeft: "40px" }}>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  name="date"
                  label="Date"
                  type="date"
                  value={data.date}
                  onChange={handleChange}
                  style={{
                    width: 200,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  max="2100-07-31"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="time"
                  label="Time"
                  type="time"
                  style={{
                    width: 200,
                    marginLeft: "10px",
                    paddingRight: "30px",
                  }}
                  value={data.time}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ paddingLeft: "40px", paddingTop: "30px" }}
          >
            <p className={classes.title}>Repeat</p>
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: "40px" }}>
            <SelectField
              style={{ width: "200px" }}
              name="repeat_type"
              // label="Repeat"
              options={{
                None: "None",
                "Every Day": "Every Day",
                "Every Week": "Every Week",
                "Every Month": "Every Month",
              }}
              selectValue={data.repeat_type}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "20px",
              paddingBottom: "20px",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}></Grid>
              <Grid item xs={3}>
                <Button
                  name={"Discard"}
                  handleClick={handleDelete}
                  style={{ height: "100%", width: "100%" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  name={"Save "}
                  handleClick={handleSave}
                  disabled={!data.name.length}
                  style={{ height: "100%", width: "100%" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default BehaviourSchedulerModal;
