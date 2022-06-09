import {
  IconButton,
  Container,
  Grid,
  Paper,
  Switch,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import GeneralSettingsCard from "../common/GeneralSettingsCard";
import SelectField from "./../common/SelectField";
import NavigationSettingCard from "../common/NavigationSettingCard";
import Button from "../common/Button";
import SensorCard from "../common/SensorCard";
import useStyles from "./styles";
import Alert from "../common/Alert";
import {url,rosUrl} from "../common/api";
import axios from "axios";
import ROSLIB from "roslib";


const BehaviourSensors = () => {
  const [sensor, setSensor] = useState({
    humidity: 0,
    humidityAlert: 0,
    smoke: 0,
    smokeAlert: 0,
    pressure: 0,
    pressureAlert: 0,
    temperature: 0,
    temperatureAlert: 0,
    co: 0,
    coAlert: 0,
    dust: 0,
    dustAlert: 0,
    air: 0,
    airAlert: 0,
  });
  const history = useHistory();
  const [robot_id, setRobot_id] = useState(history.location.state);
  // console.log(robot_id);
  const userId = localStorage.getItem("userId");
  const sessionData = JSON.parse(localStorage.getItem("session"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
  const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [alert, setAlert] = useState({
     time: 3000,
     type: "info",
     message: "",
   });
   const [ros, setRos] = useState()
   const [sensorSwitch, setSensorSwitch] = useState()

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

  //   // First, we create a Param object with the name of the param.
  //   const humidity = new ROSLIB.Param({
  //     ros: ros,
  //     name: "/system_param/humidity",
  //   });

  //   //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //   humidity.get(function (value) {
  //     console.log("humidity VAL: " + value);
  //     sensor.humidity = value;
  //     setSensor({ ...sensor });
  //   });

  //   // First, we create a Param object with the name of the param.
  //   const humidityAlert = new ROSLIB.Param({
  //     ros: ros,
  //     name: "/system_param/humidity_alert",
  //   });

  //   //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //   humidityAlert.get(function (value) {
  //     console.log("humidity alert VAL: " + value);
  //     sensor.humidityAlert = value;
  //     setSensor({ ...sensor });
  //   });

  //    const smoke = new ROSLIB.Param({
  //      ros: ros,
  //      name: "/system_param/smoke_sensor",
  //    });

  //    //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //    smoke.get(function (value) {
  //      console.log("smoke VAL: " + value);
  //      sensor.smoke = value;
  //      setSensor({ ...sensor });
  //    });
    
  //     const smokeAlert = new ROSLIB.Param({
  //       ros: ros,
  //       name: "/system_param/smoke_sensor_alert",
  //     });

  //     //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //     smokeAlert.get(function (value) {
  //       console.log("smoke alert VAL: " + value);
  //       sensor.smokeAlert = value;
  //       setSensor({ ...sensor });
  //     });
  //    const pressure = new ROSLIB.Param({
  //      ros: ros,
  //      name: "/system_param/pressure",
  //    });

  //    //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //    pressure.get(function (value) {
  //      console.log("pressure VAL: " + value);
  //      sensor.pressure = value;
  //      setSensor({ ...sensor });
  //    });
    
  //    const pressureAlert = new ROSLIB.Param({
  //      ros: ros,
  //      name: "/system_param/pressure_alert",
  //    });

  //    //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //    pressureAlert.get(function (value) {
  //      console.log("pressure alert VAL: " + value);
  //      sensor.pressureAlert = value;
  //      setSensor({ ...sensor });
  //    });

  //    const temperature = new ROSLIB.Param({
  //      ros: ros,
  //      name: "/system_param/temperature",
  //    });

  //    //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //    temperature.get(function (value) {
  //      console.log("temp VAL: " + value);
  //      sensor.temperature = value;
  //      setSensor({ ...sensor });
  //    });
    
  //   const temperatureAlert = new ROSLIB.Param({
  //     ros: ros,
  //     name: "/system_param/temperature_alert",
  //   });

  //   //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //   temperatureAlert.get(function (value) {
  //     console.log("temp alert VAL: " + value);
  //     sensor.temperatureAlert = value;
  //     setSensor({ ...sensor });
  //   });
  //    const co = new ROSLIB.Param({
  //      ros: ros,
  //      name: "/system_param/co_sensor",
  //    });

  //    //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //    co.get(function (value) {
  //      console.log("co VAL: " + value);
  //      sensor.co = value;
  //      setSensor({ ...sensor });
  //    });
  //   const coAlert = new ROSLIB.Param({
  //     ros: ros,
  //     name: "/system_param/co_sensor_alert",
  //   });

  //   //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //   coAlert.get(function (value) {
  //     console.log("co alert VAL: " + value);
  //     sensor.coAlert = value;
  //     setSensor({ ...sensor });
  //   });
  //  const dust = new ROSLIB.Param({
  //    ros: ros,
  //    name: "/system_param/dust_sensor",
  //  });

  //  //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //  dust.get(function (value) {
  //    console.log("dust VAL: " + value);
  //    sensor.dust = value;
  //    setSensor({ ...sensor });
  //  });
  //  const dustAlert = new ROSLIB.Param({
  //    ros: ros,
  //    name: "/system_param/dust_sensor_alert",
  //  });

  //  //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //  dustAlert.get(function (value) {
  //    console.log("dust alert VAL: " + value);
  //    sensor.dustAlert = value;
  //    setSensor({ ...sensor });
  //  });

  // const air = new ROSLIB.Param({
  //   ros: ros,
  //   name: "/system_param/indoor_air_quality",
  // });

  // //Then we set the value of the param, which is sent to the ROS Parameter Server.
  // air.get(function (value) {
  //   console.log("air VAL: " + value);
  //   sensor.air = value;
  //   setSensor({ ...sensor });
  // });
  //  const airAlert = new ROSLIB.Param({
  //    ros: ros,
  //    name: "/system_param/indoor_air_quality_alert",
  //  });

  //  //Then we set the value of the param, which is sent to the ROS Parameter Server.
  //  airAlert.get(function (value) {
  //    console.log("air alert VAL: " + value);
  //    sensor.airAlert = value;
  //    setSensor({ ...sensor });
  //  });
    const sensor_switch = new ROSLIB.Service({
      ros: ros,
      name: "/sensor_switch",
      serviceType: "aido_service/Sensor_switch",
    });

    setSensorSwitch(sensor_switch);

    const sensors = new ROSLIB.Service({
      ros: ros,
      name: "/sensor_status",
      serviceType: "aido_service/Sensor_status",
    });
    const request = new ROSLIB.ServiceRequest({
    });
     sensors.callService(request, function (result) {
       console.log(
         "Result for service call on ",
           result
       );
       sensor.coAlert = result.co_alert;
       sensor.co=result.co_status;
       sensor.dustAlert=result.dust_alert;
       sensor.dust=result.dust_status;
       sensor.humidityAlert=result.humidity_alert;
       sensor.humidity=result.humidity_status;
       sensor.airAlert=result.iaq_alert
       sensor.air=result.iaq_status;
       sensor.pressureAlert=result.pressure_alert;
       sensor.pressure=result.pressure_status;
       sensor.smokeAlert=result.smoke_alert;
       sensor.smoke=result.smoke_status
       sensor.temperatureAlert=result.temperature_alert;
       sensor.temperature=result.temperature_status;
       setSensor({...sensor})
     });

    //  const txt_subscriber_humidity = new ROSLIB.Topic({
    //    ros: ros,
    //    name: "/humidity",
    //    messageType: "aido_msgs/Sensor",
    //  });

    //  // subscribing the msg
    //  txt_subscriber_humidity.subscribe(function (m) {
    //    var mDta = JSON.stringify(m);
    //    console.log("topic humidity message " + mDta);
    //   //  Android.setFromJSData("Humidity", mDta);
    //  });
    setRos(ros);

    // getConfig();
    return () => {
      ros?.close();
    };
  }, []);

   const handleClose = () => {
     setOpen((s) => !s);
   };

  const getConfig = async () => {
    await axios
      .get(
        `${url}/api/v1/user/moduleconfiguration?robotId=${robot_id}&userId=${userId}`,
        options
      )
      .then((res) => {
        //  console.log("RESPONSE ==== : ", res.data);
        const submodule = res.data.data[0];
        const sensorData = JSON.parse(submodule.submodule);
        console.log(sensorData);
        for (let i = 0; i < sensorData.length; i++) {
          switch (sensorData[i].submodule_id) {
            case 1:
              //  console.log("hey",sensorData[i])
              sensor.humidity = sensorData[i].module_status;
              sensor.humidityAlert = sensorData[i].default_alert_status;
              //  setSensor({ ...sensor });
              break;
            case 2:
              sensor.temperature = sensorData[i].module_status;
              sensor.temperatureAlert = sensorData[i].default_alert_status;
              //  setSensor({ ...sensor });
              break;
            case 3:
              sensor.dust = sensorData[i].module_status;
              sensor.dustAlert = sensorData[i].default_alert_status;
              //  setSensor({ ...sensor });
              break;
            case 4:
              sensor.smoke = sensorData[i].module_status;
              sensor.smokeAlert = sensorData[i].default_alert_status;
              //  setSensor({ ...sensor });
              break;
            case 5:
              sensor.air = sensorData[i].module_status;
              sensor.airAlert = sensorData[i].default_alert_status;
              //  setSensor({ ...sensor });
              break;
            case 6:
              sensor.pressure = sensorData[i].module_status;
              sensor.pressureAlert = sensorData[i].default_alert_status;
              //  setSensor({ ...sensor });
              break;
            case 7:
              sensor.co = sensorData[i].module_status;
              sensor.coAlert = sensorData[i].default_alert_status;
              //  setSensor({ ...sensor });
              break;
            default:
              break;
          }
          //  console.log(sensorData[i])
        }
        setSensor({ ...sensor });
      })
      .catch((err) => {
        console.log(err.response?.data);
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

   const handleChangeSensor = (e) => {
     console.log(e.target.checked)
     sensor[e.target.name] = e.target.checked ? 1 : 0;
      
     if(!sensor[e.target.name]){
       let name;
       let alertName;
       let value=0
       let alertValue=0
       switch (e.target.name) {
         case "humidity":
           name = "humidity";
           alertName = "humidity_alert";
           sensor.humidityAlert = 0;
           break;
         case "air":
           name = "iaq";
           alertName = "iaq_alert";
           sensor.airAlert = 0;
           break;
         case "temperature":
           name = "temperature";
           alertName = "temperature_alert";
           sensor.temperatureAlert = 0;
           break;
         case "dust":
           name = "dust_sensor";
           alertName = "dust_sensor_alert";
           sensor.dustAlert = 0;
           break;
         case "smoke":
           name = "smoke_sensor";
           alertName = "smoke_sensor_alert";
           sensor.smokeAlert = 0;
           break;
         case "pressure":
           name = "pressure";
           alertName = "pressure_alert";
           sensor.pressureAlert = 0;
           break;
         case "co":
           name = "co_sensor";
           alertName = "co_sensor_alert";
           sensor.coAlert = 0;
           break;
         default:
           break;
       }
       const request = new ROSLIB.ServiceRequest({
         sensor_name: name,
         switch_value: value ? "enable" : "disable",
       });
       console.log(request);
       sensorSwitch.callService(request, function (result) {
         if (result.status === "Success") {
           setAlert({
             time: 3000,
             type: "success",
             message: `${e.target.name} updated successfully`,
           });
           setOpen(true);
         }
         console.log(
           "Result for service call on " +
             sensorSwitch.name +
             ": " +
             result.status
         );
       });
      //  const requestAlert = new ROSLIB.ServiceRequest({
      //    sensor_name: alertName,
      //    switch_value: alertValue ? "enable" : "disable",
      //  });
      //  console.log(requestAlert);
      //  sensorSwitch.callService(requestAlert, function (result) {
      //    if (result.status === "Success") {
      //      setAlert({
      //        time: 3000,
      //        type: "success",
      //        message: `${e.target.name} updated successfully`,
      //      });
      //      setOpen(true);
      //    }
      //    console.log(
      //      "Result for service call on " +
      //        sensorSwitch.name +
      //        ": " +
      //        result.status
      //    );
      //  });
     }else{
       let name;
       let value = e.target.checked ? 1 : 0;
       switch (e.target.name) {
         case "humidity":
            name= "humidity";
           break;
         case "air":
            name="iaq";
           break;
         case "temperature":
            name= "temperature";
           break;
         case "dust":
           name= "dust_sensor";
           break;
         case "smoke":
           name= "smoke_sensor";
           break;
         case "pressure":
            name="pressure";
           break;
         case "co":
            name= "co_sensor";
           break;
         default:
           break;
       }
       const request = new ROSLIB.ServiceRequest({
         sensor_name: name,
         switch_value: value ? "enable" : "disable",
       });
       console.log(request);
       sensorSwitch.callService(request, function (result) {
         if (result.status === "Success") {
           setAlert({
             time: 3000,
             type: "success",
             message: `${e.target.name} updated successfully`,
           });
           setOpen(true);
         }
         console.log(
           "Result for service call on " +
             sensorSwitch.name +
             ": " +
             result.status
         );
       });
     }
     console.log(sensor);
       setSensor({ ...sensor });
    };

  const handleChange = (e) => {
     console.log(e.target.checked, e.target.name);
    sensor[e.target.name] = e.target.checked ? 1 : 0;
    console.log(sensor);
    setSensor({ ...sensor });
    let name;
    let value = e.target.checked ? 1 : 0;
     switch (e.target.name) {
       case "humidityAlert":
          name= "humidity_alert";
         break;
       case "airAlert":
          name= "iaq_alert";
         break;
       case "temperatureAlert":
          name= "temperature_alert";
         break;
       case "dustAlert":
          name= "dust_sensor_alert";
         break;
       case "smokeAlert":
         name= "smoke_sensor_alert";
         break;
       case "pressureAlert":
          name= "pressure_alert";
         break;
       case "coAlert":
          name= "co_sensor_alert";
         break;
       default:
         break;
     }
        const request = new ROSLIB.ServiceRequest({
          sensor_name: name,
          switch_value: value ? "enable" : "disable",
        });
        console.log(request);
        sensorSwitch.callService(request, function (result) {
          if ( result.status === "Success") {
            setAlert({
              time: 3000,
              type: "success",
              message: `${name} updated successfully`,
            });
            setOpen(true);
          }
          console.log(
            "Result for service call on " +
              sensorSwitch.name +
              ": " +
              result.status
          );
        });
  };
  const handleSave=()=>{
     const sensors = [];
     sensors.push({ name: "temperature", value: sensor.temperature });
     sensors.push({ name: "temperature_alert", value: sensor.temperatureAlert });
     sensors.push({ name: "humidity", value: sensor.humidity });
     sensors.push({ name: "humidity_alert", value: sensor.humidityAlert });
     sensors.push({ name: "dust_sensor", value: sensor.dust });
     sensors.push({ name: "dust_sensor_alert", value: sensor.dustAlert });
     sensors.push({ name: "smoke_sensor", value: sensor.smoke });
     sensors.push({ name: "smoke_sensor_alert", value: sensor.smokeAlert });
     sensors.push({ name: "iaq", value: sensor.air });
     sensors.push({ name: "iaq_alert", value: sensor.airAlert });
     sensors.push({ name: "pressure", value: sensor.pressure });
     sensors.push({ name: "pressure_alert", value: sensor.pressureAlert });
     sensors.push({ name: "co_sensor", value: sensor.co });
     sensors.push({ name: "co_sensor_alert", value: sensor.coAlert });
     console.log(sensors);
      for (let i = 0; i < sensors.length; i++) {
        const request = new ROSLIB.ServiceRequest({
          sensor_name: sensors[i].name,
          switch_value: sensors[i].value ? "enable" : "disable",
        });
        console.log(request);
        sensorSwitch.callService(request, function (result) {
          if((i===sensors.length) && (result.status==="success")){
            setAlert({
              time: 3000,
              type: "success",
              message: "Record updated successfully",
            });
            setOpen(true);
          }
          console.log(
            "Result for service call on " +
              sensorSwitch.name +
              ": " +
              result.status
          );
        });
      }
  }
  const handleSaveOnServer = async () => {
    const body = {
      configurationList: [
        {
          module_id: 1,
          submodule: [
            {
              submodule_id: 1,
              module_status: sensor.humidity,
              default_alert_status: sensor.humidityAlert,
            },
            {
              submodule_id: 2,
              module_status: sensor.temperature,
              default_alert_status: sensor.temperatureAlert,
            },
            {
              submodule_id: 3,
              module_status: sensor.dust,
              default_alert_status: sensor.dustAlert,
            },
            {
              submodule_id: 4,
              module_status: sensor.smoke,
              default_alert_status: sensor.smokeAlert,
            },
            {
              submodule_id: 5,
              module_status: sensor.air,
              default_alert_status: sensor.airAlert,
            },
            {
              submodule_id: 6,
              module_status: sensor.pressure,
              default_alert_status: sensor.pressureAlert,
            },
            {
              submodule_id: 7,
              module_status: sensor.co,
              default_alert_status: sensor.coAlert,
            },
          ],
        },
      ],
    };
    const sensors=[]
    sensors.push({name:"temperature",value:sensor.temperature})
    sensors.push({name:"humidity",value: sensor.humidity });
    sensors.push({ name: "dust_sensor", value: sensor.dust });
    sensors.push({ name: "smoke_sensor", value: sensor.smoke });
    sensors.push({ name: "iaq", value: sensor.air });
    sensors.push({ name: "pressure", value: sensor.pressure });
    sensors.push({ name: "co_sensor", value: sensor.co });
    console.log(sensors)
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
        for(let i=0;i<sensors.length;i++){
          const request = new ROSLIB.ServiceRequest({
            sensor_name:sensors[i].name,
            switch_value:sensors[i].value?"enable":"disable",
          });
          console.log(request);
          sensorSwitch.callService(request, function (result) {
            console.log(
              "Result for service call on " +
                sensorSwitch.name +
                ": " +
                result.status
            );
          });
        }
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
        <Grid container spacing={3}>
          <Grid item xs={11}>
            <span style={{ color: "#626976", fontSize: "35px" }}>
              <IconButton
                onClick={() => history.push("/customization", robot_id)}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              Aido Sensor settings
            </span>
          </Grid>
          <Grid item xs={1}>
            {/* <Button
              onClick={handleSave}
              name="Save"
            ></Button> */}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} className={classes.customization}>
              <Grid item xs={12}>
                <SensorCard
                  mainTitle={"Humidity Sensor"}
                  title1={"Enable/Disable Humidity Sensor"}
                  name1="humidity"
                  state1={sensor.humidity}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="humidityAlert"
                  state2={sensor.humidityAlert}
                  handleChange2={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SensorCard
                  mainTitle={"Smoke Sensor"}
                  title1={"Enable/Disable Smoke Sensor"}
                  name1="smoke"
                  state1={sensor.smoke}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="smokeAlert"
                  state2={sensor.smokeAlert}
                  handleChange2={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SensorCard
                  mainTitle={"Pressure Sensor"}
                  title1={"Enable/Disable Pressure Sensor"}
                  name1="pressure"
                  state1={sensor.pressure}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="pressureAlert"
                  state2={sensor.pressureAlert}
                  handleChange2={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SensorCard
                  mainTitle={"Temperature Sensor"}
                  title1={"Enable/Disable Temperature Sensor"}
                  name1="temperature"
                  state1={sensor.temperature}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="temperatureAlert"
                  state2={sensor.temperatureAlert}
                  handleChange2={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SensorCard
                  mainTitle={"CO Sensor"}
                  title1={"Enable/Disable CO Sensor"}
                  name1="co"
                  state1={sensor.co}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="coAlert"
                  state2={sensor.coAlert}
                  handleChange2={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <SensorCard
                  mainTitle={"Dust Sensor"}
                  title1={"Enable/Disable Dust Sensor"}
                  name1="dust"
                  state1={sensor.dust}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="dustAlert"
                  state2={sensor.dustAlert}
                  handleChange2={handleChange}
                />
              </Grid> */}
              <Grid item xs={12}>
                <SensorCard
                  mainTitle={"Air Quality Sensor"}
                  title1={"Enable/Disable Air Quality Sensor"}
                  name1="air"
                  state1={sensor.air}
                  handleChange1={handleChangeSensor}
                  title2={"Enable /Disable default alert"}
                  name2="airAlert"
                  state2={sensor.airAlert}
                  handleChange2={handleChange}
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

export default BehaviourSensors;
