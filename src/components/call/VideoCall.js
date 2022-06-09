import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import VideocamOffOutlinedIcon from "@material-ui/icons/VideocamOffOutlined";
import MicOffOutlinedIcon from "@material-ui/icons/MicOffOutlined";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import CallEndOutlinedIcon from "@material-ui/icons/CallEndOutlined";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import FilterCenterFocusIcon from "@material-ui/icons/FilterCenterFocus";
import SelectField from "../common/SelectField";
import Alert from "../common/Alert";
import axios from "axios";
import Button from "../common/Button";
import { url, rosUrl } from "../common/api";
import ROSLIB from "roslib";
import Sound from "react-sound";
import { Joystick } from "react-joystick-component";
import {
  OTSession,
  OTPublisher,
  OTStreams,
  OTSubscriber,
  createSession,
} from "opentok-react";

// import firebase from './../../firebase'
import { messaging } from "./../../init-fcm";
import "./styles.css";
import ringtone from "./song.mp3";
// import socketIOClient from "socket.io-client";
import io from "socket.io-client";
import { Call } from "@material-ui/icons";

/** * Represents Video Call to all Robots
 * @module {function} Video Call  */

const useStyles = makeStyles((theme) => ({
  buttonui: {
    background:
      "linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.6)",
    boxSizing: "border-box",
    boxShadow:
      "-3px - 3px 6px rgb(255 255 255 / 21 %), 1px 1px 2px rgb(0 0 0 / 20 %), inset 1px 1px 1px rgb(255 255 255 / 24 %)",
    borderRadius: "50px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "18px",
    textAlign: "center",
    letterSpacing: "0.00310565px",
    textTransform: "uppercase",
    color: "rgba(116, 124, 139, 0.72)",
    padding: "10px",
  },
  customization: {
    padding: "1em 2em",
    background: "#EAF1F8",
    border: "2.5px solid #F2F9FF",
    boxShadow:
      "inset 6px 5px 7px 1.5px rgba(204, 216, 236, 0.2), inset -5px -5px 2px rgba(255, 255, 255, 0.3)",
    borderRadius: "20px",
  },
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "15px",
    color: "#747C8B",
  },
  subtitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "10px",
    color: "#747C8B",
  },
  icons: {
    marginRight: "10px",
    zIndex: "20",
    border: "2px solid grey",
    background: "rgba(240, 240, 240, 0.09)",
    boxShadow:
      "-6px -6px 12px rgba(255, 255, 255, 0.1), 9px 9px 12px rgba(0, 0, 0, 0.19), inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    backdropFilter: "blur(27.1828px)",
    borderRadius: "300px",
    padding: "10px",
  },
  expandIcons: {
    marginRight: "10px",
    zIndex: "20",
    border: "2px solid grey",
    background: "rgba(240, 240, 240, 0.09)",
    boxShadow:
      "-6px -6px 12px rgba(255, 255, 255, 0.1), 9px 9px 12px rgba(0, 0, 0, 0.19), inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    backdropFilter: "blur(27.1828px)",
    borderRadius: "300px",
    padding: "15px",
  },
  joystickIcons: {
    zIndex: "20",
    border: "2px solid grey",
    background: "rgba(240, 240, 240, 0.09)",
    boxShadow:
      "-6px -6px 12px rgba(255, 255, 255, 0.1), 9px 9px 12px rgba(0, 0, 0, 0.19), inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    backdropFilter: "blur(27.1828px)",
    borderRadius: "300px",
    padding: "5px",
  },
  expandJoystickIcons: {
    zIndex: "20",
    border: "2px solid grey",
    background: "rgba(240, 240, 240, 0.09)",
    boxShadow:
      "-6px -6px 12px rgba(255, 255, 255, 0.1), 9px 9px 12px rgba(0, 0, 0, 0.19), inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    backdropFilter: "blur(27.1828px)",
    borderRadius: "300px",
    padding: "15px",
  },
}));

let socket;

const VideoCall = () => {
  const [robotId, setRobotId] = useState();
  const [open, setOpen] = useState(false);
  const [robotList, setRobotList] = useState({});
  const [firebaseToken, setFirebaseToken] = useState();
  const [robotListData, setRobotListData] = useState();
  const [sessionHelper, setSessionHelper] = useState();
  const [expand, setExpand] = useState(false);
  const [ros, setRos] = useState();
  const [teleport, setTeleport] = useState();
  const [audio] = useState(
    new Audio(
      "https://aidouserfiles.s3-us-east-2.amazonaws.com/web/-226Ringtoneundefined_audio_link.mpeg"
    )
  );
  const [myVar, setMyVar] = useState();
  const [fVideo, setFVideo] = useState();
  const userName = localStorage.getItem("username");
  const [alert, setAlert] = useState({
    time: 3000,
    type: "info",
    message: "",
  });
  const ENDPOINT =
    "ws://ec2-54-176-28-246.us-west-1.compute.amazonaws.com/3000";

  const [publisherEventHandlers, setPublisherEventHandlers] = useState({
    streamCreated: (event) => {
      console.log("Publisher stream created!");
      audio.pause();
      if (stream.length < 1) {
        console.log("hey");
      }
    },
    streamDestroyed: (event) => {
      console.log("Publisher stream destroyed!");
    },
  });
  const [publisherProperties, setPublisherProperties] = useState({
    audioFallbackEnabled: false,
    showControls: false,
    publishVideo: true,
    publishAudio: true,
    width: "100%",
    height: "100%",
  });

  const [subscriberProperties, setSubscriberProperties] = useState({
    showControls: false,
    width: "591px",
    height: "267px",
    zIndex: "1",
  });

  const [subscriberEventHandlers, setSubscriberEventHandlers] = useState({
    videoDisabled: (event) => {
      console.log("Subscriber video disabled!");
      setAlert({
        time: 4000,
        type: "info",
        message: "Robot disabled the video!",
      });
      setOpen(true);
    },
    videoEnabled: (event) => {
      console.log("Subscriber video enabled!");
      setAlert({
        time: 4000,
        type: "info",
        message: "Robot enabled video!",
      });
      setOpen(true);
    },
    connected: (e) => {
      console.log("connected", e);
      audio.pause();
    },
    disconnected: (e) => {
      console.log("disconnected", e, sessionHelper);
      sessionHelper.disconnect();
      console.log("disconneted");
      setAlert({
        time: 4000,
        type: "error",
        message: "Robot disconnected the call",
      });
      setOpen(true);
    },
    destroyed: (e) => {
      console.log("disconneted", ros, sessionHelper);
      setAlert({
        time: 4000,
        type: "error",
        message: "Robot disconnected the call",
      });
      setOpen(true);
    },
    // audioLevelUpdated: (event) => {
    //   console.log(event);
    // },
    audioBlocked: (event) => {
      console.log(event);
      setAlert({
        time: 4000,
        type: "info",
        message: "Robot disabled the mic!",
      });
      setOpen(true);
    },
    audioUnblocked: (event) => {
      console.log(event);
      setAlert({
        time: 4000,
        type: "info",
        message: "Robot enabled the mic!",
      });
      setOpen(true);
    },
  });
  const [callMessage, setCallMessage] = useState("");
  const [stream, setStream] = useState([]);
  // const [socket, setSocket] = useState();
  const userId = localStorage.getItem("userId");
  const sessionData = JSON.parse(localStorage.getItem("session"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };

  const classes = useStyles();

  useEffect(() => {
    // socketCall();
    socket = io("http://ingendynamics.com:3000", {
      transports: ["websocket"],
    });
    console.log(socket);
    socket.on("connection", (data) => {
      console.log("connected", data);
    });
    // socket.on("message",data=>{
    //   console.log("message",data)
    // })
    socket.emit("message", "connection from cc");
    socket.on("disconnect", (data) => {
      console.log("connected", data);
      // socket = io("http://192.168.29.21:5000", {
      //   transports: ["websocket"],
      // });
    });

    let join = {
      client_id: `${userId}`,
      type: "web",
    };
    // console.log("j",join)
    socket.emit("join", join);

    socket.on("chat", (data) => {
      //  let dummy=JSON.parse(data)
      console.log(data);
      if (data.event === "Busy") {
        setAlert({
          time: 4000,
          type: "info",
          message: `Robot is busy, Try again later!`,
        });
        setOpen(true);
      } else if (data.event === "Rejected") {
        setAlert({
          time: 4000,
          type: "info",
          message: `Robot rejected your call, Try again later!`,
        });
        setOpen(true);
      } else {
        setAlert({
          time: 4000,
          type: "info",
          message: `${data.event}, Try again later!`,
        });
        setOpen(true);
      }
    });

    //  socket.on("getmsg",data=>{
    //    console.log("message",JSON.parse(data))
    //  })
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    // Notification.requestPermission()
    //   .then(() => {
    //     return messaging.getToken();
    //   })
    //   .then((token) => {
    //     console.log(token);
    //     localStorage.setItem("fcm_token", token);
    //     setFirebaseToken(token);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // navigator.serviceWorker.addEventListener("message", (message) => {
    //   console.log(
    //     message,
    //     message.data["firebase-messaging-msg-data"].data.callStatus
    //   );

    //   const alertMessage =
    //     message.data["firebase-messaging-msg-data"].data.callStatus;
    //   if (alertMessage === "busy") {
    //     setAlert({
    //       time: 4000,
    //       type: "info",
    //       message: "Robot is busy with another call,Try again later!",
    //     });
    //     setOpen(true);
    //   } else if (alertMessage === "rejected") {
    //     console.log("Call was rejected");
    //     setAlert({
    //       time: 4000,
    //       type: "error",
    //       message: "Robot rejected your call,Try again later!",
    //     });
    //     setOpen(true);
    //   }
    // });

    getRobotList();
    return () => {
      if (ros) {
        ros.close();
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      sessionHelper?.disconnect();
      handleEndCall();
    };
  }, []);

  const handleChange = (e) => {
    setRobotId(e.target.value);
  };
  const getRobotList = async () => {
    await axios
      .get(`${url}/api/v1/user/all-robot?userId=${userId}`, options)
      .then((res) => {
        console.log("RESPONSE ==== : ", res.data.data);
        const listData = res.data.data;
        const list = {};
        listData.map((a, i) => (list[i] = a.name));
        setRobotListData(listData);
        setRobotList(list);
      })
      .catch((err) => {
        console.log(err.response?.data);
        if (err.response?.status === 500) {
          alert("SERVER UNDER MAINTAINENCE, Try again!");
        } else {
          setAlert({
            time: 6000,
            type: "info",
            message: "No Robots to Call",
          });
          setOpen(true);
        }
      });
  };
  const handleCall = async () => {
    console.log("ROBOT LIST: ", robotListData[robotId]);
    setCallMessage(`calling robot...${robotListData[robotId].name}`);
    console.log("AUDIO ", audio);
    audio.currentTime = 0;
    audio.play();
    const video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
          setFVideo(video);
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
    let button = document.getElementById("buttons");
    button.style.display = "initial";
    let joystick = document.getElementById("joystick");
    joystick.style.display = "initial";
    let token1;
    await axios
      .get(
        `${url}/api/v1/user/token?sessionId=${sessionData.session_id}&userId=${userId}`,
        options
      )
      .then(async (res) => {
        console.log(res.data.data.token);
        token1 = res.data.data.token;
        console.log(res);
        const dummy = createSession({
          apiKey: sessionData.api_key,
          sessionId: sessionData.session_id,
          token: res.data.data.token,
          onStreamsUpdated: (streams) => {
            console.log(streams);
            setStream([...streams]);
          },
        });
        console.log(dummy);
        setSessionHelper({ ...dummy });

        // setMyVar(setTimeout(() => {
        //   console.log("hey", stream.length);
        //   if (stream.length < 1) {
        //     // setCallMessage("Robot didn't pick the call, Try again later!");
        //     setOpen(true);
        //     audio.pause();
        //     handleEndCall();
        //   }
        // }, 10000))

        // await axios
        //   .post(
        //     `${url}/api/v1/user/startcall?userId=${userId}&type=web`,
        //     {
        //       user_id: userId,
        //       robot_id: robotListData[robotId].robot_id,
        //       session_id: sessionData.session_id,
        //       caller_name: userName,
        //       sender_fcm_token: firebaseToken,
        //       receiver_fcm_token: robotListData[robotId].fcm_token,
        //       user_role: `${robotListData[robotId].user_role}`,
        //     },
        //     options
        //   )
        //   .then((res) => console.log(res))
        //   .catch((err) => {
        //     console.log("calling", err.response.data);
        //   });

        let data2 = {
          user_id: userId,
          robot_id: robotListData[robotId].robot_id,
          session_id: sessionData.session_id,
          caller_name: userName,
          apiKey: sessionData.api_key,
          event: "start call",
          token: token1,
          user_role: `${robotListData[robotId].user_role}`,
          callingFrom: "web",
        };

        socket.emit("chat", { message: data2 });

        const ros = new ROSLIB.Ros({
          url: `${rosUrl}`,
        });

        ros.on("connection", function () {
          console.log("Connected to rosbridge websocket server.");
        });

        ros.on("error", function (error) {
          console.log("Error connecting to websocket server: ", error);
        });

        ros.on("close", function () {
          console.log("Connection to websocket server closed.");
        });
        const teleport = new ROSLIB.Topic({
          ros: ros,
          name: "/tele_port_goal",
          messageType: "aido_msgs/Data",
        });
        setTeleport(teleport);
        setRos(ros);
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          alert("SERVER UNDER MAINTAINENCE, Try again!");
        }
        console.log(err?.response?.data, err);
      });
  };

  const handleClose = () => {
    handleEndCall();
    setOpen((s) => !s);
  };

  const handleEndCall = (e) => {
    console.log("hey", sessionHelper, sessionHelper?.session?.currentState);
    sessionHelper?.disconnect();
    setCallMessage();
    setStream([]);
    // clearTimeout(myVar);
    audio.pause();
    stop();
    if (expand) {
      handleExpand();
    }
    if (ros) {
      console.log(ros);
      ros.close();
    }
    let button = document.getElementById("buttons");
    if (button) {
      button.style.display = "none";
    }
    let joystick = document.getElementById("joystick");
    if (joystick) {
      joystick.style.display = "none";
    }
  };
  function stop(e) {
    var stream = fVideo?.srcObject;
    var tracks = stream?.getTracks();

    for (var i = 0; i < tracks?.length; i++) {
      var track = tracks[i];
      track?.stop();
    }
    const video = document.getElementById("videoElement");
    if (video) {
      video.srcObject = null;
    }
  }
  const handleExpand = () => {
    let popup = document.getElementById("subscriber");
    let buttons = document.getElementById("buttons");
    // let expand = document.getElementById("expand");
    let publisher = document.getElementById("publisher");
    let joystick = document.getElementById("joystick");
    const controller = document.getElementById("endcall");
    console.log(controller);
    if (!expand) {
      popup.style.position = "fixed";
      // popup.style.top = "-320px";
      // popup.style.left = "-360px";
      popup.style.top = "0px";
      popup.style.left = "0px ";
      popup.style.height = "100%";
      popup.style.width = "100%";

      // expand.style.position = "absolute";
      // expand.style.bottom = "-300px";
      // expand.style.left = "90%";
      buttons.style.position = "fixed";
      buttons.style.bottom = "20px";
      buttons.style.left = "40%";
      joystick.style.position = "fixed";
      joystick.style.right = "10px";
      joystick.style.bottom = "20px";
      if (publisher) {
        publisher.style.width = "200px";
        publisher.style.height = "200px";
      }
      setExpand(true);
    } else {
      popup.style.position = "relative";
      popup.style.top = "0px";
      popup.style.left = "0px ";
      popup.style.height = "267px";
      popup.style.width = "100%";
      // expand.style.position = "absolute";
      // expand.style.bottom = "210px";
      // expand.style.left = "90%";
      buttons.style.position = "absolute";
      buttons.style.bottom = "10%";
      buttons.style.left = "15%";
      joystick.style.position = "absolute";
      joystick.style.right = "15px";
      joystick.style.bottom = "15px";
      if (publisher) {
        publisher.style.width = "100px";
        publisher.style.height = "100px";
      }
      setExpand(false);
    }
  };

  const handleMic = () => {
    if (publisherProperties.publishAudio) {
      setPublisherProperties((s) => ({
        ...s,
        publishAudio: false,
      }));
    } else {
      setPublisherProperties((s) => ({
        ...s,
        publishAudio: true,
      }));
    }
  };

  const handleVideo = () => {
    if (publisherProperties.publishVideo) {
      setPublisherProperties((s) => ({
        ...s,
        publishVideo: false,
      }));
    } else {
      setPublisherProperties((s) => ({
        ...s,
        publishVideo: true,
      }));
    }
  };

  const handleLeft = () => {
    const value = new ROSLIB.Message({
      sensor_data: [1, 0],
    });
    console.log(value);
    if (teleport) {
      teleport.publish(value);
    }
  };
  const handleRight = () => {
    const value = new ROSLIB.Message({
      sensor_data: [-1, 0],
    });
    console.log(value);
    if (teleport) {
      teleport.publish(value);
    }
  };
  const handleTop = () => {
    const value = new ROSLIB.Message({
      sensor_data: [0, 1],
    });
    console.log(value);
    if (teleport) {
      teleport.publish(value);
    }
  };
  const handleDown = () => {
    const value = new ROSLIB.Message({
      sensor_data: [0, -1],
    });
    console.log(value);
    if (teleport) {
      teleport.publish(value);
    }
  };
  const handleRightTop = () => {
    const value = new ROSLIB.Message({
      sensor_data: [-1, 1],
    });
    console.log(value);
    if (teleport) {
      teleport.publish(value);
    }
  };
  const handleLeftTop = () => {
    const value = new ROSLIB.Message({
      sensor_data: [1, 1],
    });
    console.log(value);
    if (teleport) {
      teleport.publish(value);
    }
  };
  const handleRightBottom = () => {
    const value = new ROSLIB.Message({
      sensor_data: [-1, -1],
    });
    console.log(value);
    if (teleport) {
      teleport.publish(value);
    }
  };
  const handleLeftBottom = () => {
    const value = new ROSLIB.Message({
      sensor_data: [1, -1],
    });
    console.log(value);
    if (teleport) {
      teleport.publish(value);
    }
  };
  const handleStop = () => {
    const home = new ROSLIB.Service({
      ros: ros,
      name: "/home_service",
      serviceType: "aido_service/Home",
    });
    const request = new ROSLIB.ServiceRequest({});
    home.callService(request, function (result) {
      console.log("Result for service call on ", result);
    });
  };

  return (
    <>
      <Grid>
        <Grid item xs={12}>
          <span style={{ color: "#626976", fontSize: "35px" }}>Call</span>
          <br></br>
          <br></br>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={7}>
          <Grid container spacing={2} className={classes.customization}>
            <Grid item xs={12}>
              <p className={classes.title}>Choose Robot</p>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <SelectField
                    style={{ width: "100%" }}
                    innerLabel="---choose a robot to make a call---"
                    selectValue={robotId}
                    handleChange={handleChange}
                    options={robotList}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                  <Button
                    startIcon={<VideocamIcon />}
                    name={"NEW CALL"}
                    disabled={robotId === undefined}
                    handleClick={handleCall}
                    style={{ width: "100%", height: "60%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12}></Grid> */}
            <Grid id="videos" item xs={12}>
              <div id="subscriber">
                {sessionHelper?.session?.currentState === "connected" ? (
                  <div
                    id="publisher"
                    style={{
                      position: "absolute",
                      zIndex: "20",
                      height: "100px",
                      width: "100px",
                    }}
                  >
                    <OTPublisher
                      session={sessionHelper?.session}
                      properties={publisherProperties}
                      eventHandlers={publisherEventHandlers}
                    />
                  </div>
                ) : (
                  <p
                    style={{
                      position: "absolute",
                      left: "150px",
                      zIndex: "2",
                      paddingTop: "10px",
                      color: "#626976",
                      fontSize: "15px",
                    }}
                  >
                    {callMessage}
                  </p>
                )}
                {sessionHelper?.session?.currentState === "connected" ? (
                  <div>
                    {stream.map((s) => {
                      return (
                        <OTSubscriber
                          key={s.id}
                          session={sessionHelper?.session}
                          stream={s}
                          properties={subscriberProperties}
                          eventHandlers={subscriberEventHandlers}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <video
                      style={
                        !expand
                          ? {
                              position: "relative",
                              zIndex: "1",
                              width: "100%",
                              height: "267px",
                              objectFit: "cover",
                            }
                          : {
                              position: "relative",
                              zIndex: "1",
                              width: "1500px",
                              height: "695px",
                              objectFit: "cover",
                            }
                      }
                      autoplay="true"
                      id="videoElement"
                    ></video>
                  </div>
                )}
              </div>

              <div
                id="buttons"
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: "15%",
                  zIndex: "20",
                  display: "none",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div>
                    <IconButton
                      id="endcall"
                      onClick={handleVideo}
                      disabled={!stream?.length}
                      className={!expand ? classes.icons : classes.expandIcons}
                      // className={classes.buttonui}
                    >
                      {publisherProperties.publishVideo ? (
                        <VideocamOutlinedIcon
                          style={{ color: "white", fontSize: "30px" }}
                        />
                      ) : (
                        <VideocamOffOutlinedIcon
                          style={{ color: "white", fontSize: "30px" }}
                        />
                      )}
                    </IconButton>
                    <IconButton
                      id="endcall"
                      onClick={handleMic}
                      disabled={!stream?.length}
                      className={!expand ? classes.icons : classes.expandIcons}
                      // className={classes.buttonui}
                    >
                      {publisherProperties.publishAudio ? (
                        <MicNoneOutlinedIcon
                          style={{ color: "white", fontSize: "30px" }}
                        />
                      ) : (
                        <MicOffOutlinedIcon
                          style={{ color: "white", fontSize: "30px" }}
                        />
                      )}
                    </IconButton>
                    <IconButton
                      id="endcall"
                      onClick={handleEndCall}
                      className={!expand ? classes.icons : classes.expandIcons}
                      // className={classes.buttonui}
                    >
                      <CallEndOutlinedIcon
                        style={{ color: "red", fontSize: "30px" }}
                      />
                    </IconButton>
                    <IconButton
                      id="endcall"
                      onClick={handleExpand}
                      disabled={!stream?.length}
                      className={!expand ? classes.icons : classes.expandIcons}
                      // className={classes.buttonui}
                    >
                      {!expand ? (
                        <FullscreenIcon
                          style={{ color: "white", fontSize: "30px" }}
                        />
                      ) : (
                        <FullscreenExitIcon
                          style={{ color: "white", fontSize: "30px" }}
                        />
                      )}
                    </IconButton>
                  </div>
                </div>
              </div>
              <div
                id="joystick"
                style={{
                  position: "absolute",
                  right: "15px",
                  bottom: "15px",
                  zIndex: "20",
                  display: "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {/* <IconButton
                    onClick={handleLeftTop}
                    disabled={!stream?.length}
                    className={
                      !expand
                        ? classes.joystickIcons
                        : classes.expandJoystickIcons
                    }
                  >
                    <ArrowDropUpIcon />
                  </IconButton> */}
                  <IconButton
                    onClick={handleTop}
                    disabled={!stream?.length}
                    className={
                      !expand
                        ? classes.joystickIcons
                        : classes.expandJoystickIcons
                    }
                  >
                    <ArrowDropUpIcon />
                  </IconButton>
                  {/* <IconButton
                    onClick={handleRightTop}
                    disabled={!stream?.length}
                    className={
                      !expand
                        ? classes.joystickIcons
                        : classes.expandJoystickIcons
                    }
                  >
                    <ArrowDropUpIcon />
                  </IconButton> */}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    onClick={handleLeft}
                    disabled={!stream?.length}
                    className={
                      !expand
                        ? classes.joystickIcons
                        : classes.expandJoystickIcons
                    }
                  >
                    <ArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleStop}
                    disabled={!stream?.length}
                    className={
                      !expand
                        ? classes.joystickIcons
                        : classes.expandJoystickIcons
                    }
                    // className={classes.buttonui}
                  >
                    <FilterCenterFocusIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleRight}
                    disabled={!stream?.length}
                    className={
                      !expand
                        ? classes.joystickIcons
                        : classes.expandJoystickIcons
                    }
                    // className={classes.buttonui}
                  >
                    <ArrowRightIcon />
                  </IconButton>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {/* <IconButton
                    onClick={handleLeftBottom}
                    disabled={!stream?.length}
                    className={
                      !expand
                        ? classes.joystickIcons
                        : classes.expandJoystickIcons
                    }
                  >
                    <ArrowDropUpIcon />
                  </IconButton> */}
                  <IconButton
                    onClick={handleDown}
                    disabled={!stream?.length}
                    className={
                      !expand
                        ? classes.joystickIcons
                        : classes.expandJoystickIcons
                    }
                    // className={classes.buttonui}
                  >
                    <ArrowDropDownIcon />
                  </IconButton>
                  {/* <IconButton
                    onClick={handleRightBottom}
                    disabled={!stream?.length}
                    className={
                      !expand
                        ? classes.joystickIcons
                        : classes.expandJoystickIcons
                    }
                  >
                    <ArrowDropUpIcon />
                  </IconButton> */}
                </div>
              </div>
              {/* <IconButton
                  id="expand"
                  onClick={handleExpand}
                  style={{
                    position: "absolute",
                    bottom: "210px",
                    left: "90%",
                    zIndex: "20",
                  }}
                  // className={classes.buttonui}
                >
                  <FullscreenIcon
                    style={{ color: "white", fontSize: "40px" }}
                  />
                </IconButton> */}
            </Grid>
            {/* <Grid item xs={12}>
                <button onClick={handleLeft}>left</button>
                <button onClick={handleRight}>right</button>
                <button onClick={handleTop}>top</button>
                <button onClick={handleDown}>down</button>
              </Grid> */}
          </Grid>
        </Grid>
      </Grid>
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

export default VideoCall;
