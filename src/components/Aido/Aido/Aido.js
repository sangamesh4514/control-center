import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import aido from "./Group.png";
import sensor from "./Group973.svg";
import React, { useState, useEffect } from "react";
import image from "./aido.jpg";
import AidoModal from "./AidoModal";
import Alert from "./../../common/Alert";
import Button from "./../../common/Button";
import { url } from "./../../common/api";
import ROSLIB from "roslib";
import axios from "axios";

/** * Represents Aido Robot
 * @module {function} Aido Robot  */

const Aido = ({ name, robot_id, battery, fcm_token, user_role }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  // const [battery, setBattery] = useState()
  const classes = useStyles();
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const sessionData = JSON.parse(localStorage.getItem("session"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState({
    time: 3000,
    type: "info",
    message: "",
  });

  useEffect(() => {
    // const ros = new ROSLIB.Ros({
    //   url: "ws://ec2-54-176-28-246.us-west-1.compute.amazonaws.com:9090",
    // });
    // ros.on("connection", function () {
    //   console.log("Connected to rosbridge websocket server.");
    // });
    // ros.on("error", function (error) {
    //   console.log("Error connecting to websocket server: ", error);
    //   //  alert("Error connecting ros,Try again later...");
    // });
    // ros.on("close", function () {
    //   console.log("Connection to websocket server closed.");
    // });
    // const batteryParam = new ROSLIB.Param({
    //   ros: ros,
    //   name: "/system_param/battery_status",
    // });
    // //Then we set the value of the param, which is sent to the ROS Parameter Server.
    // batteryParam.get(function (value) {
    //   console.log("battery VAL: " + value);
    //   setBattery(value);
    // });
    // const fetchBattery=()=>{
    //   //  myTimer()
    //    batteryParam.get(function (value) {
    //      console.log("battery VAL: " + value);
    //      setBattery(value);
    //    });
    // }
    // const myVar=setInterval(fetchBattery,10000);
    // // var myVar = setInterval(myTimer, 1000);
    // // function myTimer() {
    // //   var d = new Date();
    // //   var t = d.toLocaleTimeString();
    // //   console.log(t)
    // // }
    // return () => {
    //   ros.close()
    //   clearInterval(myVar);
    // }
  }, []);

  const handleAlert = () => {
    setAlertOpen((s) => !s);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getVariables = async () => {
    await axios
      .get(
        `${url}/api/v1/user/globalvariable?robotId=${robot_id}&userId=${userId}`,
        options
      )
      .then((res) => {
        console.log("RESPONSE ==== : ", res);
        const sensorData = res.data.data;
        for (let i = 0; i < sensorData.length; i++) {
          switch (sensorData[i].submodule_id) {
            case 1:
              sensorData[i].unit = "%rH";
              break;
            case 2:
              sensorData[i].unit = "Degree Celcius";
              break;
            case 3:
              sensorData[i].unit = "ugm/m3";
              break;
            case 4:
              sensorData[i].unit = "ppm";
              break;
            case 5:
              sensorData[i].unit = "%";
              break;
            case 6:
              sensorData[i].unit = "hPA";
              break;
            case 7:
              sensorData[i].unit = "ppm";
              break;
            default:
              break;
          }
          console.log(sensorData[i].last_edited);
          var dateUTC = new Date(sensorData[i].last_edited);
          var dateUTC = dateUTC.getTime();
          var dateIST = new Date(dateUTC);
          console.log(dateIST)
          // //date shifting for IST timezone (+5 hours and 30 minutes)
          // dateIST.setHours(dateIST.getHours() + 5);
          // dateIST.setMinutes(dateIST.getMinutes() + 30);
          // console.log(dateIST)
          sensorData[i].last_edited=dateIST
        }
        setData(sensorData);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setAlert({
          time: 3000,
          type: "info",
          message:
            "No sensor and AI data found for this robot,Try again later!",
        });
        setAlertOpen(true);
        //  setData([{
        //    module_name: "No Data",
        //    submodule_name: "",
        //  }]);
        //  setOpen(true);
      });
  };
  console.log(robot_id);

  return (
    <>
      <Card className={classes.aido}>
        <div style={{ paddingTop: "30px" }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <p className={classes.title}>{name}</p>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img style={{ width: "9em" }} src={aido} />
            </Grid>
            <Grid
              item
              xs={12}
              onClick={getVariables}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img style={{ width: "2em" }} src={sensor} />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span
                    style={{
                      textAlign: "center",
                      color: "#FFC149",
                      paddingBottom: "2px",
                    }}
                  >
                    {battery?battery:"--"}%
                  </span>
                  <p
                    className={classes.subtitle}
                    style={{ textAlign: "center" }}
                  >
                    Power
                  </p>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span
                    style={{
                      textAlign: "center",
                      color: "#7FE29B",
                      paddingBottom: "2px",
                    }}
                  >
                    ON
                  </span>
                  <p
                    className={classes.subtitle}
                    style={{ textAlign: "center" }}
                  >
                    Status
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    name="Control"
                    style={{ width: "100%", height: "100%" }}
                    // style={{ width: "100px" }}
                    disabled={true}
                    onClick={(e) =>{
                      // window.location.href = `map.html?id=${robot_id}=${fcm_token}=${user_role}`;
                    }
                    }
                  >
                    Control
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    style={{ width: "100%", height: "100%" }}
                    name="Customize"
                    onClick={() => history.push("/customization", robot_id)}
                  >
                    Customize
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingBottom: "10px",
          }}
        ></div>
      </Card>
      <AidoModal open={open} handleClose={handleClose} data={data} />
      <Alert
        open={alertOpen}
        handleClose={handleAlert}
        time={alert.time}
        type={alert.type}
        message={alert.message}
      />
    </>
  );
};

export default Aido;
