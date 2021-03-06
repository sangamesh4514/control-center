// import {createJoystick} from './nipple'

var viewer, zoomView, gridClient;
var ROSLIB = window.ROSLIB;
var ROS2D = window.ROS2D;
var createjs = window.createjs;
var OT = window.OT;
let virtualWall = new createjs.Shape();
let path = new createjs.Shape();
let drawVirtualWallFlag = false;
let drawPathFlag = false;
let locationName = null;
var cmd_vel_listener;

let virtualWallCoordsList = [];
let pathCoordsList = [];
let currentPathTag = 0;
let currentVirtualWallTag = 0;
let drawLocationFlag = false;
let locationXCord = null;
let locationYCord = null;
let disable = true;

const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
};

var session;
var count;
const userId = localStorage.getItem("userId");
const sessionData = JSON.parse(localStorage.getItem("session"));
const fcm_token = localStorage.getItem("fcm_token");
const robot = window.location.href?.split("?")[1]?.split("=");
console.log(robot[1]);


/** * Represents Map Editor and Control of the Robot
* @module {function} Map Editor/Control  */

function init() {
  //create session
  session = OT.initSession(sessionData.api_key, sessionData.session_id);
  if (robot[4]) {
    const video = document.getElementById("videos");
    video.style.visibility = "hidden";
    const controsl = document.getElementById("zone_joystick");
    controsl.style.visibility = "hidden";
  } else {
    const editorbuttons = document.getElementById("editorbuttons");
    editorbuttons.style.visibility = "hidden";
  }
  // Connect to ROS.
  var ros = new ROSLIB.Ros({
    url: "ws://ec2-54-176-28-246.us-west-1.compute.amazonaws.com:9090/",
  });

  ros.on("connection", function () {
    console.log("Connected to rosbridge websocket server.");

  });

  ros.on("error", function (error) {
    console.log("Error connecting to websocket server: ", error);
    alert("Error connecting map,Try again later...");
  });

  ros.on("close", function () {
    console.log("Connection to websocket server closed.");
  });

  cmd_vel_listener = new ROSLIB.Topic({
    ros: ros,
    name: "/cmd_vel",
    messageType: "geometry_msgs/Twist",
  });

  move = function (linear, angular) {
    var twist = new ROSLIB.Message({
      linear: {
        x: linear,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: angular,
      },
    });
    cmd_vel_listener.publish(twist);
  };
  //joystick

  var listenerMessage = new ROSLIB.Topic({
    ros: ros,
    name: "/message",
    messageType: "std_msgs/String",
  });

  listenerMessage.subscribe(function (message) { });

  //Subscribing to a Topic

  var listener1 = new ROSLIB.Topic({
    ros: ros,
    name: "/map",
    messageType: "nav_msgs/OccupancyGrid",
    compression: "png",
  });

  listener1.subscribe(function (message) {
    // console.log(
    //   "Received message on map data  " +
    //     listener1.name +
    //     ": " +
    //     message.data
    // );
    //listener.unsubscribe();
  });
  //Create the main viewer.
  viewer = new ROS2D.Viewer({
    divID: "map",
    width: 1380,
    height: 630,
    overflow: scroll,
  });
  viewer.scene.canvas.overflow = "scroll";

  var rosTopic = new ROSLIB.Topic({
    ros: ros,
    name: "/map_metadata",
    messageType: "nav_msgs/MapMetaData",
  });
  var image = new ROS2D.NavigationImage({
    size: 10,

    image: "./robot_image.png",
    pulse: !0,
  });
  // Setup the nav client.
  var nav = NAV2D.OccupancyGridClientNav({
    ros: ros,
    rootObject: viewer.scene,
    viewer: viewer,
    serverName: "/move_base",
    image: "./robot_image.png",
    // continue: true,
  });
  // var robotMarker = new ROS2D.NavigationArrow({
  //   size: 0.25,
  //   strokeSize: 0.05,
  //   pulse: true,
  //   fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65),
  // });

  // nav.rootObject.addChild(robotMarker);
  // viewer.scene.update();

  //
  //  Setup the map client.
  // gridClient = new ROS2D.OccupancyGridClient({
  //   ros: ros,
  //   rootObject: viewer.scene,
  // });

  // Add zoom to the viewer.
  zoomView = new ROS2D.ZoomView({
    rootObject: viewer.scene,
    minScale: 0.001,
  });

  // // Scale the canvas to fit to the map
  // gridClient.on("change", function () {
  //   //console.log(gridClient.currentGrid);
  //   viewer.scaleToDimensions(
  //     gridClient.currentGrid.width,
  //     gridClient.currentGrid.height
  //   );
  //   viewer.shift(
  //     gridClient.currentGrid.pose.position.x,
  //     gridClient.currentGrid.pose.position.y
  //   );
  //   // console.log(
  //   //   "pos value",
  //   //   gridClient.currentGrid.pose,
  //   //   gridClient.currentGrid.pose.position.x
  //   // );
  // });

  //get virtual wall points api call
  getVirtualWallCoordinates();
  getPathCoordinates();
  getLocationCoordinates();
  let flag = true;

  viewer.scene.addEventListener("click", (event) => {
    //console.log(gridClient.currentGrid.position);
    //gridClient.currentGrid;
    var pos1 = viewer.scene.globalToRos(event.stageX, event.stageY);
    let pos = new ROSLIB.Vector3({
      x: pos1.x,
      y: pos1.y,
      z: pos1.z,
    });

    // console.log("map clicked pos value", pos1);
    // console.log(
    //   "map clicked rosToGlobal value",
    //   viewer.scene.rosToGlobal(pos)
    // );

    if (drawVirtualWallFlag) {
      if (flag) {
        virtualWall.graphics.moveTo(pos1.x, -pos1.y);

        flag = false;
      } else {
        // console.log("map clicked flag value", flag);
      }
      virtualWall.graphics.lineTo(pos1.x, -pos1.y);
      virtualWallCoordsList.push([
        pos1.x,
        -pos1.y,
        pos.z,
        currentVirtualWallTag,
      ]);
    }
    if (drawPathFlag) {
      if (flag) {
        path.graphics.moveTo(pos1.x, -pos1.y);
        // console.log("map clicked flag value", flag);
        flag = false;
      } else {
        //console.log("current path tag value ", currentPathTag);
      }
      path.graphics.lineTo(pos1.x, -pos1.y);
      pathCoordsList.push([pos1.x, -pos1.y, pos.z, currentPathTag]);
    }

    if (drawLocationFlag) {
      //  console.log("saveLocationCoords ", pos1.x, -pos1.y);
      locationXCord = pos1.x;
      locationYCord = -pos1.y;
      addLocationPopup();
    }

    viewer.scene.update();
  });
}
function zoomInBtnClicked() {
  console.log("zoomInBtnClicked", viewer.scene.scaleX);

  viewer.scene.scaleX *= 1.1;
  viewer.scene.scaleY *= 1.1;

  viewer.scene.update();
}
function zoomOutBtnClicked() {
  console.log("zoomInBtnClicked", viewer.scene.scaleX);

  viewer.scene.scaleX /= 1.1;
  viewer.scene.scaleY /= 1.1;
  viewer.scene.update();
}
function addLocation() {
  drawVirtualWallFlag = false;
  drawPathFlag = false;
  drawLocationFlag = true;
  const virtualWall = document.getElementById("virtualWall");
  virtualWall.disabled = true;
  virtualWall.style.border = "none";
  const path = document.getElementById("path");
  path.disabled = true;
  path.style.border = "none";
  const location = document.getElementById("location")
  location.style.border = "4px solid #48BAFE"
  // addLocationPopup();
}
function addVirtualWall() {
  drawVirtualWallFlag = true;
  drawPathFlag = false;
  drawLocationFlag = false;

  virtualWallCoordsList = [];

  virtualWall.graphics
    .setStrokeStyle(0.04, 1, 1, 0, [2, 1], 10)
    .beginStroke("red");
  viewer.scene.addChild(virtualWall);
  viewer.scene.update();
  const location = document.getElementById("location");
  location.disabled = true;
  location.style.border = "none";
  const path = document.getElementById("path");
  path.disabled = true;
  path.style.border = "none";
  const btn = document.getElementById("virtualWall");
  btn.style.border = "4px solid #48BAFE";
}
function saveLocation(e, locationName, locationXCord, locationYCord) {
  e.stopPropagation();
  drawLocationFlag = false;
  //  console.log("saveLocation ", locationName);
  let locationNameField = document.getElementById("locationName");
  locationName = locationNameField.value;
  // console.log("location name ", locationName);

  document.getElementById("locationPopup").style.display = "none";
  document.getElementById("locationPopup").style.visibility = "hidden";

  const location = {
    location_name: locationName,
    x_cord: locationXCord,
    y_cord: locationYCord,
    z_cord: 0,
  };

  postLocationCoordinates(location);
  save()
}

function updateLocationOnCanvas(locationName, xCord, yCord) {
  var text1 = new createjs.Text(locationName, ".2px Arial", "white");

  text1.textBaseline = "alphabetic";
  text1.textAlign = "center";

  var rect = new createjs.Shape();
  rect.shadow = new createjs.Shadow("#000000", 2, 2, 10);
  rect.graphics

    .beginFill("green")
    .drawRoundRectComplex(
      xCord,
      yCord,
      text1.getMeasuredWidth() + 0.3,
      text1.getMeasuredHeight() + 0.3,
      0.1,
      0.1,
      0.1,
      0.1
    );

  text1.x = xCord + (text1.getMeasuredWidth() + 0.3) / 2;
  text1.y = yCord + (text1.getMeasuredHeight() + 0.4) / 2;

  var container = new createjs.Container();

  container.addChild(rect, text1);

  viewer.scene.addChild(container);
  viewer.scene.update();
}
function addPath() {
  drawVirtualWallFlag = false;
  drawLocationFlag = false;
  drawPathFlag = true;
  pathCoordsList = [];
  path.graphics
    .setStrokeStyle(0.04, 1, 1, 0)
    //.setLineDash([2, 1])
    .beginStroke("green");
  viewer.scene.addChild(path);
  viewer.scene.update();
  const virtualWall = document.getElementById("virtualWall");
  virtualWall.disabled = true;
  virtualWall.style.border = "none"
  const location = document.getElementById("location");
  location.disabled = true;
  location.style.border = "none";
  const btn = document.getElementById("path");
  btn.style.border = "4px solid #48BAFE";
}
function saveVirtualWallCoordinates() {
  if (drawVirtualWallFlag) {
    if (virtualWallCoordsList.length > 0) {
      postVirtualWallCoordinates(virtualWallCoordsList);
    }
  }
  // if (drawPathFlag) {
  //   console.log("draw line type ", " path");
  // }
}
function savePathCoords() {
  if (drawPathFlag) {
    if (pathCoordsList.length > 0) {
      postPathCoordinates(pathCoordsList);
    }
  }
}

function getVirtualWallCoordinates() {
  // console.log("getVirtualWallPoints api");
  viewer.scene.addChild(virtualWall);

  axios
    .get(
      `https://ingendynamics.com/api/v1/user/map/virtualwall?userId=${userId}&robotId=${robot[1]}`,
      options
    )
    .then(function (response) {
      // console.log("getVirtualWallPoints api 1", response.data.data);
      if (response.data.data != undefined) {
        // console.log("getVirtualWallPoints api 2");

        // console.log(
        //   "axios  api ",
        //   response.data.data.virtualWallCoordsList
        // );
        if (
          response.data.data.virtualWallCoordsList != undefined &&
          response.data.data.virtualWallCoordsList.length > 0
        ) {
          // console.log(
          //   "getVirtualWallPoints api 3",
          //   response.data.data.virtualWallCoordsList
          // );
          currentVirtualWallTag = response.data.data.currentTag + 1;
          for (let item of response.data.data.virtualWallCoordsList) {
            let moveToFlag = true;
            virtualWall.graphics
              .setStrokeStyle(0.04, 1, 1, 0)
              .beginStroke("red");
            for (let cords of item) {
              // console.log(
              //   "cords ",
              //   cords,
              //   cords.x_cord,
              //   cords.y_cord,
              //   cords.z_cord
              // );

              if (moveToFlag) {
                virtualWall.graphics.moveTo(cords.x_cord, cords.y_cord);
                moveToFlag = false;
                // console.log("move to flag if ", moveToFlag);
              } else {
                let pos = new ROSLIB.Vector3({
                  x: cords.x_cord,
                  y: cords.y_cord,
                  z: cords.z_cord,
                });
                //console.log("move to flag else ", moveToFlag);
                virtualWall.graphics.lineTo(cords.x_cord, cords.y_cord);
              }
              viewer.scene.update();
            }
          }
        }
      } else {
        currentVirtualWallTag = 0;
      }
    })
    .catch(function (error) {
      console.log("axios  api ", error.response.data);
      if (error?.response?.status === 500) {
        alert("SERVER UNDER MAINTAINENCE, Try again!");
      }
    });
}
function postVirtualWallCoordinates(virtualWallListCords) {
  //console.log("getVirtualWallPoints api", virtualWallListCords);

  //ec2-54-193-125-53.us-west-1.compute.amazonaws.com
  axios.defaults.headers.post["Content-Type"] = "application/json";

  axios
    .post(
      `https://ingendynamics.com/api/v1/user/map/virtualwall?userId=${userId}&robotId=${robot[1]}`,
      { virtualWallList: virtualWallListCords },
      options
    )
    .then(function (response) {
      //  console.log("axios  api ", response);
      drawVirtualWallFlag = false;
      currentVirtualWallTag = currentVirtualWallTag + 1;
      const loader = document.getElementById("loader");
      loader.style.visibility = "hidden";
    })
    .catch(function (error) {
      console.log("axios  api ", error.response.data);
      if (error?.response?.status === 500) {
        alert("SERVER UNDER MAINTAINENCE, Try again!");
      }
    });
}

function getPathCoordinates() {
  console.log("getPathCoordinates api", currentPathTag);
  viewer.scene.addChild(path);

  axios
    .get(

      `https://ingendynamics.com/api/v1/user/map/path?userId=${userId}&robotId=${robot[1]}`,

      options
    )
    .then(function (response) {
      console.log("getPathCoordinates api 1", response.data.data.currentTag);
      if (response.data.data != undefined) {
        console.log("getPathCoordinates api 2");

        console.log(
          " getPathCoordinates axios  api ",
          response.data.data.pathCoordsList
        );
        if (
          response.data.data.pathCoordsList != undefined &&
          response.data.data.pathCoordsList.length > 0
        ) {
          console.log(
            "getPathCoordinates api 3",
            response.data.data.pathCoordsList
          );
          currentPathTag = response.data.data.currentTag + 1;
          for (let item of response.data.data.pathCoordsList) {
            let moveToFlag = true;
            // virtualWall.graphics
            //   .setStrokeStyle(0.04, 1, 1, 0)
            //   .beginStroke("red");
            path.graphics.setStrokeStyle(0.04, 1, 1, 0).beginStroke("green");
            for (let cords of item) {
              console.log(
                "path cords ",
                cords,
                cords.x_cord,
                cords.y_cord,
                cords.z_cord
              );

              if (moveToFlag) {
                path.graphics.moveTo(cords.x_cord, cords.y_cord);
                moveToFlag = false;
                console.log("move to flag if ", moveToFlag);
              } else {
                console.log("move to flag else ", moveToFlag);
                path.graphics.lineTo(cords.x_cord, cords.y_cord);
              }
              viewer.scene.update();
            }
          }
        }
      } else {
        currentPathTag = 0;
      }
    })
    .catch(function (error) {
      console.log("axios  api ", error.response.data);
      if (error?.response?.status === 500) {
        alert("SERVER UNDER MAINTAINENCE, Try again!");
      }
    });
}
function getLocationCoordinates() {
  // console.log("getLocationCoordinates api 11 ");

  axios
    .get(
      `https://ingendynamics.com/api/v1/user/map/location?userId=${userId}&robotId=${robot[1]}`,
      options
    )
    .then(function (response) {
      if (response.data.data != undefined) {
        //console.log("getLocationCoordinates api 2");

        // console.log(
        //   " getLocationCoordinates axios  api ",
        //   response.data.data
        // );
        if (response.data.data != undefined && response.data.data.length > 0) {
          // console.log("getLocationCoordinates api 3", response.data.data);

          for (let item of response.data.data) {
            // console.log(
            //   "getLocationCoordinates values ",
            //   item.location_name,
            //   item.x_cord,
            //   item.y_corde
            // );

            updateLocationOnCanvas(
              item.location_name,
              item.x_cord,
              item.y_cord
            );
          }
        }
      }
    })
    .catch(function (error) {
      console.log("axios  api ", error.response.data);
      if (error?.response?.status === 500) {
        alert("SERVER UNDER MAINTAINENCE, Try again!");
      }
    });
}
function postPathCoordinates(pathCordsList) {
  // console.log("postPathCoordinates api", pathCordsList);

  //ec2-54-193-125-53.us-west-1.compute.amazonaws.com
  axios.defaults.headers.post["Content-Type"] = "application/json";

  axios
    .post(
      `https://ingendynamics.com/api/v1/user/map/path?userId=${userId}&robotId=${robot[1]}`,
      {
        pathCoordsList: pathCordsList,
      },
      options
    )
    .then(function (response) {
      //console.log("axios  api ", response);
      drawPathFlag = false;
      currentPathTag = currentPathTag + 1;
      const loader = document.getElementById("loader");
      loader.style.visibility = "hidden";
    })
    .catch(function (error) {
      console.log("axios  api ", error.response.data);
      if (error?.response?.status === 500) {
        alert("SERVER UNDER MAINTAINENCE, Try again!");
      }
    });
}

function postLocationCoordinates(location) {
  //console.log("postLocationCoordinates api", location);

  //ec2-54-193-125-53.us-west-1.compute.amazonaws.com
  axios.defaults.headers.post["Content-Type"] = "application/json";

  axios
    .post(
      `https://ingendynamics.com/api/v1/user/map/location?userId=${userId}&robotId=${robot[1]}`,
      {
        location,
      },
      options
    )
    .then(function (response) {
      //console.log("axios  api ", response);
      updateLocationOnCanvas(
        location.location_name,
        location.x_cord,
        location.y_cord
      );

      locationName = null;
      xCord = null;
      yCord = null;
      document.getElementById("locationName").value = null;
    })
    .catch(function (error) {
      console.log("axios  api ", error.response.data);
      if (error.response.status === 500) {
        alert("SERVER UNDER MAINTAINENCE, Try again!");
      }
    });
}

function addLocationPopup() {
  console.log("addLocationPopup");
  let popup = document.getElementById("locationPopup");
  popup.style.display = "flex";
  popup.style.visibility = "visible";
  popup.style.position = "absolute";
  popup.style.left = "500px";
  popup.style.bottom = "150px";
}

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// // (optional) add server code here
// initializeSession();

function initializeSession(session, token) {
  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
  });

  // Create a publisher
  // var publisher = OT.initPublisher(
  //   "publisher",
  //   {
  //     insertMode: "append",
  //     width: "100%",
  //     height: "100%",
  //   },
  //   handleError
  // );
  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      // session.publish(publisher, handleError);
      //  alert("Robot view")
    }
  });
}

async function handleCall(session, sessionId, userId, fcm_token, robot) {
  // console.log(robotListData[robotId]);

  await axios
    .get(
      `https://ingendynamics.com/api/v1/user/token?sessionId=${sessionData.session_id}&userId=${userId}`,
      options
    )
    .then(async (res) => {
      initializeSession(session, res.data.data.token);
      console.log(robot, userId, sessionId, fcm_token);
      await axios
        .post(
          `https://ingendynamics.com/api/v1/user/startcall?userId=${userId}&type=web`,
          {
            user_id: userId,
            robot_id: robot[1],
            session_id: sessionId,
            caller_name: userId,
            sender_fcm_token: fcm_token,
            receiver_fcm_token: robot[2],
            user_role: robot[3],
          },
          options
        ).then(res => console.log(res))
        .catch((err) => {
          console.log(err.response.data)
          if (err?.response?.status === 500) {
            alert("SERVER UNDER MAINTAINENCE, Try again!");
          }
        });
    }).catch(err => {
      console.log(err.response.data)
      if (err?.response?.status === 500) {
        alert("SERVER UNDER MAINTAINENCE, Try again!");
      }
    })
  // setTimeout(function () {
  //   const stream = sessionMembers();
  //   if (stream === undefined) {
  //     endSession();
  //     setOpen((s) => !s);
  //   }
  // }, 30000);
}

function videoCall() {
  const robot = window.location.href?.split("?")[1]?.split("=");
  console.log(robot);
  if (robot[1]) {
    // replace these values with those generated in your TokBox Account
    handleCall(session, sessionData.session_id, userId, fcm_token, robot);
    alert("Callng robot");
    count += 1;
  }
}

function endCall() {
  session.disconnect();
  alert("call disconnected");
  count -= 1;
  console.log("session disconnected", count);
}

function fullScreen() {
  let popup = document.getElementById("subscriber");
  if (popup.style.height < "300px") {
    popup.style.height = "680px";
    popup.style.width = "1480px";
    let btn = document.getElementById("callButtons");
    btn.style.position = "relative";
    btn.style.left = "500px";
    let bottombar = document.getElementById("bottombar");
    bottombar.style.visibility = "hidden";
    // let controls = document.getElementById("zone_joystick");
    // controls.style.position="fixed"
    // controls.style.right="30px";
    // // controls.style.left="0px"
  } else {
    popup.style.height = "200px";
    popup.style.width = "300px";
    let btn = document.getElementById("callButtons");
    btn.style.position = "relative";
    btn.style.left = "0px";
    let bottombar = document.getElementById("bottombar");
    bottombar.style.visibility = "visible";
  }
}

function save() {

  if (drawVirtualWallFlag) {
    const loader = document.getElementById("loader");
    loader.style.visibility = "visible";
    saveVirtualWallCoordinates();
  }

  if (drawPathFlag) {
    const loader = document.getElementById("loader");
    loader.style.visibility = "visible";
    savePathCoords();
  }

  const virtualWall = document.getElementById("virtualWall");
  virtualWall.disabled = false;
  virtualWall.style.border = "1px solid white";
  const location = document.getElementById("location");
  location.disabled = false;
  location.style.border = "1px solid white";
  const path = document.getElementById("path");
  path.disabled = false;
  path.style.border = "1px solid white"


}

function forword() {
  console.log("forword", "called");
  var twist = new ROSLIB.Message({
    linear: {
      x: 0.5,
      y: 0,
      z: 0,
    },
    angular: {
      x: 0,
      y: 0,
      z: 0,
    },
  });
  cmd_vel_listener.publish(twist);
}
function backword() {
  console.log("backword", "called");
  var twist = new ROSLIB.Message({
    linear: {
      x: -0.5,
      y: 0,
      z: 0,
    },
    angular: {
      x: 0,
      y: 0,
      z: 0,
    },
  });
  cmd_vel_listener.publish(twist);
}
function stop() {
  console.log("stop", "called");
  var twist = new ROSLIB.Message({
    linear: {
      x: 0,
      y: 0,
      z: 0,
    },
    angular: {
      x: 0,
      y: 0,
      z: 0,
    },
  });
  cmd_vel_listener.publish(twist);
}
function turnLeft() {
  console.log("turn Left", "called");
  var twist = new ROSLIB.Message({
    linear: {
      x: 0,
      // x: 0.1,
      y: 0,
      z: 0,
    },
    angular: {
      x: 0,
      y: 0,
      z: 0.6,
    },
  });
  cmd_vel_listener.publish(twist);
  // setTimeout(stop, 5000);
  // setTimeout(forword, 5000);
}
function turnRight() {
  console.log("turn right", "called");
  var twist = new ROSLIB.Message({
    linear: {
      x: 0,
      //x: 0.1,
      y: 0,
      z: 0,
    },
    angular: {
      x: 0,
      y: 0,
      z: -0.6,
    },
  });
  cmd_vel_listener.publish(twist);
}
