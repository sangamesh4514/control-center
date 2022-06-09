import {
  IconButton,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import GeneralSettingsCard from "../common/GeneralSettingsCard";
import SelectField from "../common/SelectField";
import Button from "../common/Button";
import Alert from "../common/Alert";
import Switch from "../common/Switch";
import {url,rosUrl} from "../common/api";
import NavigationSettingCard from "../common/NavigationSettingCard";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useStyles from "./styles";

/** * Represents General Settings of the Robot
 * @module {function} General Settings  */

const GeneralSettings = () => {
  const [state, setState] = useState({
    enable_interaction_btn: 0,
    enable_power_btn: 0,
    enable_voice_wake_up: 0,
    enable_volume_btn: 0,
    show_battery_status: 0,
    battery_charge_at: 0,
    stand_by: 0,
    _24_hr_format: 0,
  });
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
  const options = { 1: "Enable", 0: "Disable" };
  const handleChange = (e) => {
    // console.log(e.target.name,e.target.checked)
    state[e.target.name] = e.target.checked ? 1 : 0;
    // console.log(e.target.checked ? 1 : 0);
    // updateAidoSettings(state)
    setState({ ...state });
  };
  const handleChangeValue = (e) => {
    // console.log(e.target.name, e.target.value);
    state[e.target.name] = e.target.value;
    // updateAidoSettings(state)
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
        console.log(err.response.data);
        if (err?.response?.status === 500) {
         setAlert({
           time: 3000,
           type: "error",
           message: "SERVER UNDER MAINTAINENCE, Try again!",
         });
         setOpen(true);
        }
      });
  };
  const updateAidoSettings = async (state) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    console.log(state);
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
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <span style={{ color: "#626976", fontSize: "35px" }}>
              <IconButton
                onClick={() => history.push("/customization", robot_id)}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>{" "}
              User's Aido General Settings
            </span>
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={() => updateAidoSettings(state)}
              name=" Save"
            ></Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.customization}>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <GeneralSettingsCard
                  body={"24-Hour Time"}
                  title={"Date and time"}
                  name="_24_hr_format"
                  state={state._24_hr_format === 1}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <Paper className={classes.paper} style={{ height: "170px" }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={11}>
                          <p className={classes.title}>Battery</p>
                          <p className={classes.subtitle}>Battery percentage</p>
                        </Grid>
                        <Grid item xs={1}>
                          <Switch
                            checked={state.show_battery_status === 1}
                            onChange={handleChange}
                            color="primary"
                            name={"show_battery_status"}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={6}>
                          <p className={classes.title}>
                            {" "}
                            Return to homebase at low charge
                          </p>
                          <p className={classes.subtitle}>
                            {" "}
                            At low charge aido will go back home base and charge
                            itself
                          </p>
                        </Grid>
                        <Grid item xs={4}>
                          <SelectField
                            style={{ width: "100%" }}
                            name={"battery_charge_at"}
                            selectValue={state.battery_charge_at}
                            options={{
                              0: "0%",
                              20: "20%",
                              30: "30%",
                              40: "40%",
                              50: "50%",
                            }}
                            handleChange={handleChangeValue}
                          />
                        </Grid>
                        <Grid item xs={2}></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <GeneralSettingsCard
                  title={"Standby"}
                  body={"When not in use brightness will be minimum."}
                  name="stand_by"
                  state={state.stand_by === 1}
                  handleChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12} style={{ marginTop: "20px" }}>
                <Grid container>
                  <Paper className={classes.paper} style={{ height: "300px" }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <p className={classes.title}>Touch interaction</p>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={11}>
                            <p className={classes.title}>Volume buttons</p>
                            <p className={classes.subtitle}>
                              Enable/Disable the volume buttons
                            </p>
                          </Grid>
                          <Grid item xs={1}>
                            <Switch
                              checked={state.enable_volume_btn === 1}
                              onChange={handleChange}
                              color="primary"
                              name={"enable_volume_btn"}
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={11}>
                            <p className={classes.title}> Power button</p>
                            <p className={classes.subtitle}>
                              Enable/Disable the power buttons
                            </p>
                          </Grid>
                          <Grid item xs={1}>
                            <Switch
                              checked={state.enable_power_btn === 1}
                              onChange={handleChange}
                              color="primary"
                              name={"enable_power_btn"}
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={6}>
                            <p className={classes.title}>Interaction Button</p>
                            <p className={classes.subtitle}>
                              Interaction button will work as configured
                            </p>
                          </Grid>
                          <Grid item xs={4}>
                            <SelectField
                              style={{ width: "100%" }}
                              name={"enable_interaction_btn"}
                              selectValue={state.enable_interaction_btn}
                              options={{
                                0: "Disable",
                                1: "Enable",
                              }}
                              handleChange={handleChangeValue}
                            />
                          </Grid>
                          <Grid item xs={2}></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid> */}
              {/* <Grid item xs={12} style={{ marginTop: "20px" }}>
                <Typography variant="subtitle1">Voice interaction</Typography>
              </Grid> */}
              {/* <Grid
                item
                xs={12}
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <GeneralSettingsCard
                  title={"Voice interaction / Wake up"}
                  body={"Wake-up allows to triggers aido by voice"}
                  name="enable_voice_wake_up"
                  state={state.enable_voice_wake_up === 1}
                  handleChange={handleChange}
                />
              </Grid> */}
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

export default GeneralSettings;
