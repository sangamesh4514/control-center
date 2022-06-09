import {
  IconButton,
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomescreenCard from "./../common/HomescreenCard";
import Alert from "./../common/Alert";
import PersonIcon from "@material-ui/icons/Person";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Radio from "../common/Radio";
import { url, rosUrl } from "../common/api";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { customizationState } from "../../redux/slices/CustomizationSlice";
import useStyles from "./styles";

/** * Represents Home screen settings of the Robot
 * @module {function} Home Screen  */

const HomeScreen = () => {
  const [checked, setChecked] = useState("Default");
  const [data, setData] = useState()
  const [open, setOpen] = useState(false)
  const history = useHistory();
  const [robot_id, setRobot_id] = useState(history.location.state);
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const [robotData, setRobotData] = useState(
    useSelector((state) => state.CustomizationSlice)
  );
  const classes = useStyles();
  const [alert, setAlert] = useState({
    time: 3000,
    type: "info",
    message: "",
  });
  console.log("---------", robotData)

  useEffect(() => {
    getScreenType(robotData.screen_type_id);
  }, []);

  const handleClose = () => {
    setOpen((s) => !s);
  };
  const getScreenType = async (screenId) => {
    await axios
      .get(
        `${url}/api/v1/user/setting/screen/${screenId}?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setData(res?.data?.data)
        if (res.data.data.type === "default") {
          setChecked("Default");
        } else {
          setChecked(res?.data?.data.type);
        }
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
      });
  };

  const setScreenType = async (screenType, screenId) => {
    // console.log(screenType)
    await axios
      .put(
        `${url}/api/v1/user/setting/screen/${screenId}?userId=${userId}`,
        {
          type: screenType,
          // show_toolbar: data.show_toolbar,
          // toolbar_display_style: data.toolbar_display_style,
          // screen_subtitle: data.screen_subtitle,
          // screen_title: data.screen_title,
          // bg_img_url: data.bg_img_url,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        //  setChecked(res?.data?.data[0]?.type)
        setAlert({
          time: 3000,
          type: "success",
          message: "Record updated successfully",
        });
        setOpen(true);
      })
      .catch((err) => {
        console.log(err?.response?.data);
        if (err?.response?.status === 500) {
          // alert("SERVER UNDER MAINTAINENCE, Try again!");
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

  const handleChecked = (e) => {
    setChecked(e.target.value);
    setScreenType(e.target.value, robotData.screen_type_id);
    // console.log(robotData,e.target.value)
  };

  return (
    <>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <span style={{ color: "#626976", fontSize: "35px" }}>
              <IconButton
                onClick={() => history.push("/customization", robot_id)}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              Home Screen
            </span>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "20px" }}>
            <Grid container spacing={2} className={classes.customization}>
              <Grid item xs={12}>
                <HomescreenCard
                  title={"Default"}
                  body={"Set the screen with default look"}
                  value={"Default"}
                  body="Set the screen type to default"
                  checked={checked === "Default"}
                  handleChecked={handleChecked}
                />
              </Grid>
              <Grid item xs={12}>
                <HomescreenCard
                  title={"Clear Screen"}
                  body={"Keeps the screen clear"}
                  value={"Clear"}
                  body="Keep the screen clear"
                  checked={checked === "Clear"}
                  handleChecked={handleChecked}
                />
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid
                    container
                    style={{ paddingTop: "15px", paddingBottom: "15px" }}
                  >
                    <Grid
                      xd={2}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: "5px",
                      }}
                    >
                      <Radio
                        value="Custom"
                        checked={checked === "Custom"}
                        handleChecked={handleChecked}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <PersonIcon />
                    </Grid>
                    <Grid item xs={7}>
                      <p className={classes.title}>Custom Screen</p>
                      <p className={classes.subtitle}>
                        Create your custom screen
                      </p>
                      <Typography variant="body2"></Typography>
                    </Grid>
                    <Grid item xs={1} style={{ paddingLeft: "10%" }}>
                      <IconButton
                        onClick={() =>
                          history.push(
                            "/customization/homescreen/custom",
                            robot_id
                          )
                        }
                      >
                        <NavigateNextIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
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

export default HomeScreen;
