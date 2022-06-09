import {
  IconButton,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useState,useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import GeneralSettingsCard from "../common/GeneralSettingsCard";
import NavigationSettingCard from "../common/NavigationSettingCard";
import Alert from "../common/Alert";
import Button from "../common/Button";
import {url,rosUrl} from "../common/api";
import SensorCard from "../common/SensorCard";
import axios from 'axios'
import useStyles from './styles'
import ROSLIB from "roslib";


const BehaviourDeepLearning = () => {
  const [state, setState] = useState({
    face:0,
    faceAlert:0,
  })
  const history = useHistory();
  const [robot_id, setRobot_id] = useState(history.location.state);
   const userId = localStorage.getItem("userId");
   const sessionData = JSON.parse(localStorage.getItem("session"));
   const options = {
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("userToken")}`,
     },
   };
   const classes=useStyles()
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({
      time: 3000,
      type: "info",
      message: "",
    });
   const [sensorSwitch, setSensorSwitch] = useState()
   const [aiSwitch, setAiSwitch] = useState();

  

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

    const face = new ROSLIB.Param({
      ros: ros,
      name: "/system_param/face_recognition",
    });

    //Then we set the value of the param, which is sent to the ROS Parameter Server.
    face.get(function (value) {
      console.log("face VAL: " + value);
      state.face = value;
      setState({ ...state });
    });

     const faceAlert = new ROSLIB.Param({
       ros: ros,
       name: "/system_param/face_alert",
     });

     //Then we set the value of the param, which is sent to the ROS Parameter Server.
     faceAlert.get(function (value) {
       console.log("face alert VAL: " + value);
       state.faceAlert = value;
       setState({ ...state });
     });

      const ai = new ROSLIB.Service({
      ros: ros,
      name:  "/computer_vision_switch",
      serviceType: "aido_service/Vision_switch",
    });

     const sensor_switch = new ROSLIB.Service({
       ros: ros,
       name: "/sensor_switch",
       serviceType: "joint_state_publisher/Sensor_switch",
     });

     setSensorSwitch(sensor_switch);

    setAiSwitch(ai);
  //  getConfig()
  }, [])
  
   const handleClose = () => {
     setOpen((s) => !s);
   };

  const getConfig=async()=>{
     await axios
       .get(
         `${url}/api/v1/user/moduleconfiguration?robotId=${robot_id}&userId=${userId}`,
         options
       )
       .then((res) => {
         console.log("RESPONSE ==== : ", res);
          const submodule=res.data.data[1]
          const data=JSON.parse(submodule.submodule)
          console.log(data)
          for (let i = 0; i < data.length; i++) {
           switch (data[i].submodule_id) {
             case 8:
               //  console.log("hey",sensorData[i])
               state.face = data[i].module_status;
               state.faceAlert = data[i].default_alert_status;
               //  setSensor({ ...sensor });
               break;
             case 9:
               state.fall= data[i].module_status;
               state.fallAlert = data[i].default_alert_status;
               //  setSensor({ ...sensor });
               break;
             case 10:
               state.emotion = data[i].module_status;
               state.emotionAlert = data[i].default_alert_status;
               //  setSensor({ ...sensor });
               break;
            
             default:
               break;
           }}
           setState({...state})
       })
       .catch((err) => {
         console.log(err.response?.data);
          setAlert({
            time: 3000,
            type: "error",
            message: "SERVER UNDER MAINTAINENCE, Try again!",
          });
          setOpen(true);
       });
  }

  const handleChangeSensor = (e) => {
    console.log(e.target.checked);
    state[e.target.name] = e.target.checked ? 1 : 0;
    if (!state[e.target.name]) {
      switch (e.target.name) {
        case "face":
          state["faceAlert"] = 0;
          break;
        case "fall":
          state["fallAlert"] = 0;
          break;
        case "emotion":
          state["emotionAlert"] = 0;
          break;
        default:
          break;
      }
    }
    console.log(state);
    setState({ ...state });
  };
  const handleChange = (e) => {
    state[e.target.name] = e.target.checked ? 1 : 0;
    console.log(state);
    setState({ ...state });
  };

  const handleSave=()=>{
     const request = new ROSLIB.ServiceRequest({
       cv_module_name: "face_emotion",
       switch_value: state.face ? "enable" : "disable",
     });
     console.log(request);
     aiSwitch.callService(request, function (result) {
       console.log(
         "Result for service call on " ,
           result.status
       );
       if (result.status === "Success") {
         setAlert({
           time: 3000,
           type: "success",
           message: "Record updated successfully",
         });
         setOpen(true);
       }
     });

    //  const alertRequest = new ROSLIB.ServiceRequest({
    //    sensor_name: "face_alert",
    //    switch_value: state.faceAlert ? "enable" : "disable",
    //  });
    //  console.log("alert", alertRequest);
    //  sensorSwitch.callService(alertRequest, function (result) {
    //    console.log(
    //      "Result for service call on for face alert " +
    //        sensorSwitch.name +
    //        ": " +
    //        result.status
    //    );
    //     if (result.status === "Success") {
    //       setAlert({
    //         time: 3000,
    //         type: "success",
    //         message: "Record updated successfully",
    //       });
    //       setOpen(true);
    //     }
    //  });
  }
   const handleSaveAPI = async () => {
     const body = {
       configurationList: [
         {
           module_id: 2,
           submodule: [
             {
               submodule_id: 8,
               module_status: state.face,
               default_alert_status: state.faceAlert,
             },
             {
               submodule_id: 9,
               module_status: state.fall,
               default_alert_status: state.fallAlert,
             },
             {
               submodule_id: 10,
               module_status: state.emotion,
               default_alert_status: state.emotionAlert,
             },
           ],
         },
       ],
     };
     await axios
       .post(
         `${url}/api/v1/user/moduleconfiguration?robotId=${robot_id}&userId=${userId}`,
         body,
         options
       )
       .then((res) => {
         console.log(res);
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
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <span style={{ color: "#626976", fontSize: "35px" }}>
              <IconButton
                onClick={() => history.push("/customization", robot_id)}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              Aido AI settings
            </span>
          </Grid>
          <Grid item xs={1}>
            <Button name="  Save" onClick={handleSave}></Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.customization}>
              <Grid item xs={12}>
                <SensorCard
                  title1={"Enable/Disable the Face and Emotion Recognition"}
                  name1="face"
                  state1={state.face}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="faceAlert"
                  state2={state.faceAlert}
                  handleChange2={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <SensorCard
                  mainTitle={"Emotion Recognition"}
                  title1={"Enable/Disable the Emotion Recognition"}
                  name1="emotion"
                  state1={state.emotion}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="emotionAlert"
                  state2={state.emotionAlert}
                  handleChange2={handleChange}
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <SensorCard
                  mainTitle={"Fall Detection"}
                  title1={"Enable/Disable the Fall Detection"}
                  name1="fall"
                  state1={state.fall}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="fallAlert"
                  state2={state.fallAlert}
                  handleChange2={handleChange}
                />
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <Typography variant="subtitle1">Face Tracking</Typography>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <GeneralSettingsCard
              title={"Enable/Disable the Face Tracking"}
              name="projector"
              state={false}
              handleChange={handleChange}
            />
          </Grid>
        </Grid> */}
        {/* <Grid container>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <Typography variant="subtitle1">Gaze Detection</Typography>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <GeneralSettingsCard
              title={"Enable/Disable the Gaze Detection"}
              name="projector"
              state={false}
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

export default BehaviourDeepLearning;
