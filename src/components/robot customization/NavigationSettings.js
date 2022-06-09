import {Container, Grid, Typography,IconButton } from "@material-ui/core";
import ArrowBackOut from "@material-ui/icons/ArrowBack";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import GeneralSettingsCard from "../common/GeneralSettingsCard";
import NavigationSettingCard from "../common/NavigationSettingCard";
import Alert from "../common/Alert";
import Button from "../common/Button";
import {url,rosUrl} from "../common/api";
import axios from "axios";
import useStyles from "./styles";

/** * Represents Navigation Settings of the Robot
 * @module {function} Navigation Settings  */

const NavigationSettings = () => {
  const [state, setState] = useState({
    bypass_obstacle: 1,
    go_to_speed_control: "high",
    navigation_timeout_sec: 50,
    obstacle_avoid: 0,
    obstacle_avoid_sensitivity: "medium",
  });
  const options = { 1: "1", 2: "2" };
  const history = useHistory();
  const [robot_id, setRobot_id] = useState(history.location.state);
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [alert, setAlert] = useState({
     time: 3000,
     type: "info",
     message: "",
   });
  useEffect(() => {
    getAidoSettings();
  }, []);

  const handleChangeValue = (e) => {
    state[e.target.name] = e.target.value;
    //  updateAidoSettings(state);
    setState({ ...state });
  };
  const handleChange = (e) => {
    console.log(e.target.name, e.target.checked);
    state[e.target.name] = e.target.checked ? 1 : 0;
    // updateAidoSettings(state);
    setState({ ...state });
  };
   const handleClose = () => {
     setOpen((s) => !s);
   };

  const getAidoSettings = async () => {
    await axios
      .get(
        `${url}/api/v1/user/setting?userId=${userId}&robotId=${robot_id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setState(res.data.data);
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          setAlert({
            time: 3000,
            type: "error",
            message: "SERVER UNDER MAINTAINENCE, Try again!",
          });
          setOpen(true);
        }
        console.log(err.response.data);
      });
  };
  const updateAidoSettings = async (state) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    await axios
      .put(
        `${url}/api/v1/user/setting?userId=${userId}&robotId=${robot_id}`,
        state,
        options
      )
      .then((res) => {
        console.log("RESPONSE in Update Settings ==== : ", res);
         setAlert({
           time: 3000,
           type: "success",
           message: "Record updated successfully",
         });
         setOpen(true);
      })
      .catch((err) => {
        console.log("ERROR in Update Settings: ====", err.response.data);
       if (err?.response?.status === 500) {
         setAlert({
           time: 3000,
           type: "error",
           message: "SERVER UNDER MAINTAINENCE, Try again!",
         });
         setOpen(true);
       } else {
         setAlert({
           time: 3000,
           type: "error",
           message: "Record not updated,Try again later!",
         });
         setOpen(true);
       }
      });
  };
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <span style={{ color: "#626976", fontSize: "35px" }}>
              <IconButton
                onClick={() => history.push("/customization", robot_id)}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>{" "}
              User's Aido Navigation Settings
            </span>
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={() => updateAidoSettings(state)}
              
              name="Save"
            ></Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.customization}>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <NavigationSettingCard
                  title="Obstacle Avoidance Profile"
                  body="Are there any stairs or drops that might cause aido to fall?"
                  name="obstacle_avoid"
                  state={state.obstacle_avoid}
                  options={{ 1: "Yes", 0: "No" }}
                  handleChange={handleChangeValue}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <NavigationSettingCard
                  title=" Obstacle Avoidance Sensitivity"
                  body="Set specifics regarding aido's obstacle avoidance sensitivity"
                  name="obstacle_avoid_sensitivity"
                  state={state.obstacle_avoid_sensitivity}
                  options={{ High: "High", Low: "Low" }}
                  handleChange={handleChangeValue}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <NavigationSettingCard
                  title='"Go To" speed control'
                  body="Set the speed to aido's navigation"
                  name="go_to_speed_control"
                  state={state.go_to_speed_control}
                  options={{ Low: "Low", High: "High" }}
                  handleChange={handleChangeValue}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <GeneralSettingsCard
                  title="Bypass Obstacles"
                  body="When set to on,aido will take detours from the optimal path to avoid obstacles"
                  body="When set to off,aido will never deviate from the optimal path"
                  name={"bypass_obstacle"}
                  state={state.bypass_obstacle === 1}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <NavigationSettingCard
                  title="Navigation Timeout"
                  body="After the configured time,aido will stop navigation if its unable to reach destination"
                  name="navigation_timeout_sec"
                  state={state.navigation_timeout_sec}
                  options={{ 0: "0sec", 10: "10sec", 20: "20sec", 30: "30sec" }}
                  handleChange={handleChangeValue}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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

export default NavigationSettings;
