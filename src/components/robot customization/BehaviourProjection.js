import {
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import GeneralSettingsCard from "../common/GeneralSettingsCard";
import NavigationSettingCard from "../common/NavigationSettingCard";
import Alert from "../common/Alert";
import Button from "../common/Button";
import Switch from "../common/Switch";
import { url, rosUrl } from "../common/api";
import Slider from "@material-ui/core/Slider";
import BrightnessHighOutlinedIcon from "@material-ui/icons/BrightnessHighOutlined";
import ROSLIB from "roslib";
import useStyles from "./styles";

const BehaviourProjection = () => {
  const history = useHistory();
  const [data, setData] = useState({
    dimmable: 0,
    dimmableBightness: 1,
  });
  const [brightness, setBrightness] = useState();
  const [dimmable, setDimmable] = useState();
  const [robot_id, setRobot_id] = useState(history.location.state);
  const [ross, setRoss] = useState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    time: 3000,
    type: "info",
    message: "",
  });

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: `${rosUrl}`,
    });

    ros.on("connection", function () {
      console.log("Connected to rosbridge websocket server.");
    });

    ros.on("error", function (error) {
      console.log("Error connecting to websocket server: ", error);
      setAlert({
        time: 3000,
        type: "error",
        message: "Error connecting to ros server, Try again!",
      });
      setOpen(true);
      //  alert("Error connecting ros,Try again later...");
    });

    ros.on("close", function () {
      console.log("Connection to websocket server closed.");
    });
    //  ros.getParams(function (params) {
    //    console.log(params);
    //  });

    // First, we create a Param object with the name of the param.
    const brightnessParam = new ROSLIB.Param({
      ros: ros,
      name: "/system_param/dimmable_brightness",
    });

    //Then we set the value of the param, which is sent to the ROS Parameter Server.
    brightnessParam.get(function (value) {
      console.log("brightness VAL: " + value);
      data.dimmableBightness = value;
      setData({ ...data });
    });
    const dimmableParam = new ROSLIB.Param({
      ros: ros,
      name: "/system_param/dimmable_led",
    });

    //Then we set the value of the param, which is sent to the ROS Parameter Server.
    dimmableParam.get(function (value) {
      console.log("dimmable LED VAL: " + value);
      data.dimmable = value;
      setData({ ...data });
    });
    console.log(ros);
    setDimmable(dimmableParam);
    setBrightness(brightnessParam);
    setRoss(ros);
    return () => {
      ros.close();
    };
  }, []);

  const handleClose = () => {
    setOpen((s) => !s);
  };

  const handleChange = (e) => {
    data[e.target.name] = e.target.checked ? 1 : 0;
    setData({ ...data });
  };
  const handleSlider = (e, newValue) => {
    data.dimmableBightness = newValue;
    setData({ ...data });
  };
  const handleSave = () => {
    console.log(data)
    if (ross.isConnected) {
      const sensor_switch = new ROSLIB.Service({
        ros: ross,
        name: "/mic_pcb",
        serviceType: "aido_service/Mic_pcb_service",
      });

      const request = new ROSLIB.ServiceRequest({
        sensor_name: "dim_led",
        switch_value: data.dimmable?"enable":"disable" ,
      });

      sensor_switch.callService(request, function (result) {
        console.log(
          "Result for service call on " +
            sensor_switch.name +
            ": " +
            result.status
        );
      });

      dimmable.get(function (value) {
        console.log("dimmbale LED Value", value);
      });

       const request1 = new ROSLIB.ServiceRequest({
         sensor_name: "dim_led_brightness",
         switch_value: `${data.dimmableBightness}`,
       });

       sensor_switch.callService(request1, function (result) {
         console.log(
           "Result for service call on " +
             sensor_switch.name +
             ": " +
             result.status
         );
       });

     
      brightness.get(function (value) {
        console.log("MAX VAL: " + value);
      });
      setAlert({
        time: 3000,
        type: "success",
        message: "Record updated successfully",
      });
      setOpen(true);
    } else {
      setAlert({
        time: 3000,
        type: "error",
        message: "Not connected to ros server, Try again later!",
      });
      setOpen(true);
    }
  };

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={11}>
            <span style={{ color: "#626976", fontSize: "35px" }}>
              <IconButton
                onClick={() => history.push("/customization", robot_id)}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              Aido's LED Settings
            </span>{" "}
          </Grid>
          <Grid item xs={1}>
            <Button name="Save" onClick={() => handleSave()}></Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "20px" }}
            className={classes.customization}
          >
            <Paper style={{ height: "200px" }} className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <p className={classes.title}>Dimmable LED</p>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={11}>
                      <p className={classes.title}>
                        {" "}
                        Enable/Disable the Dimmable LED
                      </p>
                    </Grid>
                    <Grid item xs={1}>
                      <Switch
                        checked={data.dimmable}
                        onChange={handleChange}
                        color="primary"
                        name={"dimmable"}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={5}>
                      <p className={classes.title}>
                        {" "}
                        Choose Brightness for your LED
                      </p>
                    </Grid>
                    <Grid item xs={1}>
                      <BrightnessHighOutlinedIcon />
                    </Grid>
                    <Grid item xs={5}>
                      <Slider
                        style={{ width: "100%" }}
                        disabled={!data.dimmable}
                        name="dimmableBrightness"
                        value={data.dimmableBightness}
                        onChange={handleSlider}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        // getAriaValueText={valuetext}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <h4>{data.dimmableBightness}</h4>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {/* <Grid container>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="subtitle1">Projector</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <GeneralSettingsCard
                title={"Enable/Disable the projector"}
                name="projector"
                state={true}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="subtitle1">KeyStone Interface</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <NavigationSettingCard
                title="Choose the Keystone Interface"
                // body="At low charge aido will charge itself"
                name="interface"
                state={0}
                options={{ 0: "0", 20: "20", 30: "30", 40: "40", 50: "50" }}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="subtitle1">Focus settings</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <NavigationSettingCard
                title="Choose the Focus of the projector"
                // body="At low charge aido will charge itself"
                name="focus"
                state={0}
                options={{ 0: "0", 20: "20", 30: "30", 40: "40", 50: "50" }}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="subtitle1">Power Mode</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <GeneralSettingsCard
                title={"Disable the projector on Power Mode"}
                name="projector"
                state={true}
                handleChange={handleChange}
              />
            </Grid>
          </Grid> */}
        {/* <Grid container>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="subtitle1">RGB LED</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <GeneralSettingsCard
                title={"Enable/Disable the RGB LED"}
                name="projector"
                state={true}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "1px" }}>
              <NavigationSettingCard
                title="Customize your LED"
                // body="At low charge aido will charge itself"
                name="focus"
                state={0}
                options={{ 0: "0", 20: "20", 30: "30", 40: "40", 50: "50" }}
                handleChange={handleChange}
              />
            </Grid>
          </Grid> */}
        {/* <Grid container>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="subtitle1">Indication LED</Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <GeneralSettingsCard
                title={"Enable/Disable the Indication LED"}
                name="projector"
                state={true}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "1px" }}>
              <NavigationSettingCard
                title="Choose the Behaviour to play on Indication"
                body="Choosing Default will play Default behaviour on Indication"
                name="focus"
                state="Default"
                options={{
                  Default: "Default",
                  0: "0",
                  20: "20",
                  30: "30",
                  40: "40",
                  50: "50",
                }}
                handleChange={handleChange}
              />
            </Grid>
          </Grid> */}
      </Container>
      <Alert
        open={open}
        handleClose={handleClose}
        time={alert.time}
        type={alert.type}
        message={alert.message}
      />
    </>
  );
};

export default BehaviourProjection;
