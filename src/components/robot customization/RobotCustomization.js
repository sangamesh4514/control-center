import {
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomizationCard from "../common/CustomizationCard";
import Crop169OutlinedIcon from "@material-ui/icons/Crop169Outlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import image from "./image.jpg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { customizationSetData } from "../../redux/slices/CustomizationSlice";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import useStyles from "./styles";
import Alert from "../common/Alert";
import Radio from "../common/Radio";
import {url,rosUrl} from "../common/api";
import ModesCard from "../common/ModesCard";
import imageIcon from './image.svg'

/** * Represents Mode Settings of the Robot
 * @module {function} Mode Settings  */

const RobotCustomization = () => {
  const history = useHistory();
  const [robot_id, setRobot_id] = useState(history.location.state);
  const [modeId, setModeId] = useState();
  const [checked, setChecked] = useState("Default");
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
   const [open, setOpen] = useState(false);
   const [alert, setAlert] = useState({
     time: 3000,
     type: "info",
     message: "",
   });
  

  useEffect(() => {
    dispatch(customizationSetData(robot_id, userId));
    getAidoSettings();
  }, []);

  const handleExpandClick = () => {
    setExpand((s) => !s);
  };
   const handleClose = () => {
     setOpen((s) => !s);
   };

  const handleChecked = (e) => {
    setChecked(e.target.value);
    setModeType(modeId, e.target.value);
  };

  const getAidoSettings = async (state) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

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
        console.log(res);
        setModeId(res.data.data.mode_id);
        getModeType(res.data.data.mode_id);
      })
      .catch((err) => {
        console.log("ERROR: ====", err.response.data);
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

  const getModeType = async (mode) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    await axios
      .get(
        `${url}/api/v1/user/setting/mode/${mode}?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.data.mode_type === "default") {
          setChecked("Default");
        } else {
          setChecked(res.data.data.mode_type);
        }
      })
      .catch((err) => {
        console.log(err?.response?.data);
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

  const setModeType = async (mode, type) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    await axios
      .put(
        `${url}/api/v1/user/setting/mode/${modeId}?userId=${userId}`,
        {
          mode_type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        //  setChecked(res.data.data[0].mode_type);
         setAlert({
           time: 3000,
           type: "success",
           message: "Record updated successfully",
         });
         setOpen(true);
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
      <Container
      // style={{
      //   paddingTop: "30px",
      // }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <span style={{ color: "#626976", fontSize: "35px" }}>
                  <IconButton onClick={() => history.push("/dashboard")}>
                    <ArrowBackIosIcon fontSize="small" />
                  </IconButton>
                  Customize Aido
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.customization}>
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomizationCard
                      icon={<Crop169OutlinedIcon />}
                      title={"Home Screen"}
                      body={"Customize Home Screen"}
                      route={"/customization/homescreen"}
                      data={robot_id}
                    />
                    {/* <Paper style={{ marginTop: "1px" }}>
                    <Grid
                      container
                      style={{ paddingTop: "15px", paddingBottom: "15px" }}
                    >
                      <Grid
                        item
                        xs={3}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <SettingsOutlinedIcon />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">Default</Typography>
                        <Typography variant="body2">Admin Call list</Typography>
                      </Grid>
                    </Grid>
                  </Paper> */}
                  </Grid>
                  <Grid item xs={12}>
                    <CustomizationCard
                      icon={<SettingsOutlinedIcon />}
                      title={"General Settings"}
                      body={"Customize Settings"}
                      route={"/customization/general/settings"}
                      data={robot_id}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomizationCard
                      icon={<ExploreOutlinedIcon />}
                      title={"Navigation Settings"}
                      body={"Customize Settings"}
                      route={"/customization/navigation/settings"}
                      data={robot_id}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomizationCard
                      icon={<RoomOutlinedIcon />}
                      title={"Map"}
                      body={"configure map settings"}
                      route={"/map"}
                      data={robot_id}
                    />
                    {/* <Paper style={{ marginTop: "1px" }}>
                  <Grid
                    container
                    style={{ paddingTop: "15px", paddingBottom: "15px" }}
                  >
                    <Grid
                      item
                      xs={3}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <SettingsOutlinedIcon />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1">Default</Typography>
                      <Typography variant="body2">Current map</Typography>
                    </Grid>
                  </Grid>
                </Paper> */}
                  </Grid>
                  <Grid item xs={12}>
                    <CustomizationCard
                      icon={<ExploreOutlinedIcon />}
                      title={"LED Settings"}
                      body={"Customize  LED"}
                      route={"/customization/projector/settings"}
                      data={robot_id}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={imageIcon} height="480px" width="auto" />
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomizationCard
                      icon={<ContactPhoneOutlinedIcon />}
                      title={"Contacts"}
                      body={"Contacts of this robot"}
                      route={"/contacts"}
                      data={robot_id}
                    />
                    {/* <Paper style={{ marginTop: "1px" }}>
                  <Grid
                    container
                    style={{ paddingTop: "15px", paddingBottom: "15px" }}
                  >
                    <Grid
                      item
                      xs={3}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <SettingsOutlinedIcon />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1">Default</Typography>
                      <Typography variant="body2">Assigned group</Typography>
                    </Grid>
                  </Grid>
                </Paper> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Grid container>
                        <Grid item xs={10}>
                          <p
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "500",
                              fontSize: "15px",
                              lineHeight: "15px",
                              color: "#747C8B",
                            }}
                          >
                            Modes
                          </p>
                          <p
                            style={{
                              fontFamily: "Montserrat",
                              fontStyle: "normal",
                              fontWeight: "normal",
                              fontSize: "14px",
                              lineHeight: "15px",
                              color: "#747C8B",
                            }}
                          >
                            Which mode to turn on
                          </p>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: expand,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expand}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                          <Collapse in={expand} timeout="auto" unmountOnExit>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <ModesCard
                                  title={"Default"}
                                  body={"Aido default behaviour"}
                                  value={"Default"}
                                  checked={checked === "Default"}
                                  handleChecked={handleChecked}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <ModesCard
                                  title={"Greet"}
                                  body={"Aido functions as a greeter"}
                                  value={"Greet"}
                                  checked={checked === "Greet"}
                                  handleChecked={handleChecked}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <ModesCard
                                  title={"Privacy"}
                                  body={"Turns your camera and microphone off"}
                                  value={"Privacy"}
                                  checked={checked === "Privacy"}
                                  handleChecked={handleChecked}
                                />
                              </Grid>
                            </Grid>
                          </Collapse>
                        </Grid>
                      </Grid>
                    </Paper>
                    {/* <CustomizationCard
                    icon={<TuneOutlinedIcon />}
                    title={"Modes"}
                    body={"which mode to turn on"}
                  /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <CustomizationCard
                      icon={<FileCopyOutlinedIcon />}
                      title={"Behaviour Scheduler"}
                      body={" List of Schedulers"}
                      route={"/customization/behaviour/schedulers"}
                      data={robot_id}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomizationCard
                      icon={<ExploreOutlinedIcon />}
                      title={"Sensor Settings"}
                      body={"Sensor Types"}
                      route={"/customization/sensors/settings"}
                      data={robot_id}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomizationCard
                      icon={<ExploreOutlinedIcon />}
                      title={"AI Settings"}
                      body={"Configure AI settings"}
                      route={"/customization/deep-learning/settings"}
                      data={robot_id}
                    />
                  </Grid>
                </Grid>
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

export default RobotCustomization;
