import { Grid, Container, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Aido from "../Aido/Aido/Aido";
import axios from "axios";
import useStyles from "./style";
import ROSLIB from "roslib";
import { url, rosUrl } from "./../common/api";
import CircularProgress from "@material-ui/core/CircularProgress";

const Dashboard = () => {
  // useEffect(() => {
  //   const user = localStorage.getItem('userToken');
  //   if (user === null) {
  //     history.push('/')
  //   }
  // }, []);

  const classes = useStyles();
  console.log("Dashboard insider");
  // const [robotList, setRobotList] = useState()
  const [robotListData, setRobotListData] = useState([]);
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const [battery, setBattery] = useState();
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
  useEffect(() => {
    getRobotList(userId);
  }, []);

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: `${rosUrl}`,
    });
    ros.on("connection", function () {
      console.log("Connected to rosbridge websocket server.");
    });
    ros.on("error", function (error) {
      console.log("Error connecting to websocket server: ", error);
      //  alert("Error connecting ros,Try again later...");
    });
    ros.on("close", function () {
      console.log("Connection to websocket server closed.");
    });
    const batteryParam = new ROSLIB.Param({
      ros: ros,
      name: "/system_param/battery_status",
    });
    //Then we set the value of the param, which is sent to the ROS Parameter Server.
    batteryParam.get(function (value) {
      console.log("battery VAL: " + value);
      setBattery(value);
    });
    const fetchBattery = () => {
      //  myTimer()
      batteryParam.get(function (value) {
        console.log("battery VAL: " + value);
        setBattery(value);
      });
    };
    const myVar = setInterval(fetchBattery, 10000);
    // var myVar = setInterval(myTimer, 1000);
    // function myTimer() {
    //   var d = new Date();
    //   var t = d.toLocaleTimeString();
    //   console.log(t)
    // }
    return () => {
      ros.close();
      clearInterval(myVar);
    };
  }, []);
  /** * Represents Robots List
   * @module {function} Robots List  */

  const getRobotList = async (userId) => {
    await axios
      .get(`${url}/api/v1/user/owned-robot?userId=${userId}`, options)
      .then((res) => {
        console.log("RESPONSE ==== : ", res);
        const listData = res?.data?.data;
        setRobotListData(listData);
        console.log(listData);
      })
      .catch((err) => {
        console.log("ERROR: ====", err);
        if (err.status === 500) {
          alert("SERVER UNDER MAINTAINENCE, Try again!");
        } else if (err.response?.data?.status.subCode === 1200) {
          setMessage("You don't have any robot yet");
        }
      });
  };
  const history = useHistory();
  return (
    <>
      <Grid>
        <Grid item xs={12}>
          <span style={{ color: "#626976", fontSize: "35px" }}>
            All My Aido
          </span>
          <br></br>
          <br></br>
        </Grid>
      </Grid>
      <Grid container>
        {robotListData?.length ? (
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {robotListData?.map((robot) => (
                <Grid
                  key={robot.robot_id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                >
                  <Aido
                    name={robot?.name}
                    robot_id={robot.robot_id}
                    fcm_token={robot.fcm_token}
                    user_role={robot.user_role}
                    battery={battery}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ) : (
          <>
            {message?.length ? (
              <Typography variant="h5">{message}</Typography>
            ) : (
              <CircularProgress
                variant={"indeterminate"}
                style={{ height: "60px", width: "60px", color: "grey" }}
              />
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
