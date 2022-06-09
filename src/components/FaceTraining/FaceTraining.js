import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  CardActionArea,
  IconButton,
} from "@material-ui/core";
import SelectField from "./../common/SelectField";
import TextField from "./../common/TextField";
import Alert from "./../common/Alert";
import Button from "./../common/Button";
import { url, rosUrl, config } from "./../common/api";
import axios from "axios";
import ROSLIB from "roslib";
import S3 from "react-aws-s3";
import useStyles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import NewFace from "./NewFace";
import EditFace from "./EditFace";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const ReactS3Client = new S3(config);

const FaceTraining = () => {
  const [data, setData] = useState({
    name: "",
    updateName: "",
    image: "",
  });
  const [peopleCount, setPeopleCount] = useState();
  const [people, setPeople] = useState([]);
  const [newfaceOpen, setNewfaceOpen] = useState(false);
  const [editfaceOpen, setEditfaceOpen] = useState(false);
  const [batchSize, setBatchSize] = useState(4);
  const [batchNumber, setBatchNumber] = useState(1);
  const [nextButton, setNextButton] = useState()
  const [barMessage, setBarMessage] = useState()
  const [ross, setRoss] = useState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    time: 3000,
    type: "info",
    message: "",
  });
  const [rosLoader, setRosLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(true)
  const [rosMessage, setRosMessage] = useState("");

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
        message: "ROS SERVER UNDER MAINTAINENCE, Try again later!",
      });
      setOpen(true);
      setBarMessage(`Server under maintainance, Try again later!`);
      setPageLoader(false)
      setNextButton(1)
    });

    ros.on("close", function () {
      console.log("Connection to websocket server closed.");
    });

    const count = new ROSLIB.Service({
      ros: ros,
      name: "/get_image_count",
      serviceType: "aido_service/Image_count",
    });
    const request = new ROSLIB.ServiceRequest({});

    count.callService(request, function (result) {
      console.log("Result for service call on ", result);
      let num=result.image_count
      let a=Math.floor(num/batchSize)
      if((num%batchSize)>0){
        a=a+1
      }
      // console.log(a)
      setPeopleCount(result.image_count);
      setNextButton(a)
      setBarMessage(`Total number of Faces trained - ${result.image_count}`)
    });

    const face = new ROSLIB.Service({
      ros: ros,
      name: "/get_image",
      serviceType: "aido_service/GetImage",
    });
    const request1 = new ROSLIB.ServiceRequest({
      batch_size: batchSize,
      batch_number: batchNumber,
    });

    face.callService(request1, function (result) {
      console.log("Result for service call on ", result);
      people.push(result.images);
      people.push(result.names);
      setPeople([...people]);
      setPageLoader(false)
    });

    setRoss(ros);

    return () => {
      ros.close();
    };
  }, []);

  const getCount = () => {
    const count = new ROSLIB.Service({
      ros: ross,
      name: "/get_image_count",
      serviceType: "aido_service/Image_count",
    });

    const request = new ROSLIB.ServiceRequest({});

    count.callService(request, function (result) {
      console.log("Result for service call on ", result);
      let num = result.image_count;
      let a = Math.floor(num / batchSize);
      if (num % batchSize > 0) {
        a = a + 1;
      }
      // console.log(a)
      setPeopleCount(result.image_count);
      setNextButton(a);
      setBarMessage(`Total number of Faces trained - ${result.image_count}`);

    });
  };

  const getFaces = (number,size) => {
    console.log("hey", ross,number,size);
    setPageLoader(true)
    const face = new ROSLIB.Service({
      ros: ross,
      name: "/get_image",
      serviceType: "aido_service/GetImage",
    });
    const request1 = new ROSLIB.ServiceRequest({
      batch_size: size || batchSize,
      batch_number: number || batchNumber,
    });

    face.callService(request1, function (result) {
      console.log("Result for service call on ", result);
      const peoples = [];
      peoples.push(result.images);
      peoples.push(result.names);
      setPeople([...peoples]);
      // setBatchNumber(number)
      getCount()
      setPageLoader(false)
    });
  };

  const handleClose = () => setOpen((s) => !s);
  const handleRosLoader = () => setRosLoader(false);
  const handleNewface = () => setNewfaceOpen(false);
  const handleEditface = () => setEditfaceOpen(false);

  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
    setData({ ...data });
  };

  const handleFile = async (e) => {
    console.log(e.target?.files[0]);
    data.image = e.target?.files[0];
    setData({ ...data });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader?.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (handleDiscard) => {
    setRosLoader(true);
    setRosMessage("Please wait,While the face is trained");
    const addTwoIntsClient = new ROSLIB.Service({
      ros: ross,
      name: "/face_training_add",
      serviceType: "aido_service/TrainName",
    });

    let img = await convertBase64(data.image);

    const imageMessage = new ROSLIB.Message({
      format: "jpeg",
      data: img.split(",")[1],
    });

    const request = new ROSLIB.ServiceRequest({
      image: imageMessage,
      name: data.name,
    });

    console.log(addTwoIntsClient);
    addTwoIntsClient.callService(request, function (result) {
      console.log("Result for service call on ", result);
      if (result.status === "Success") {
        setAlert({
          time: 3000,
          type: "success",
          message: `${result?.status}`,
        });
        setOpen(true);
        handleRosLoader();
        setData({
          name: "",
          updateName: null,
          image: null,
        });
        handleDiscard();
        getFaces()
      } else {
        setAlert({
          time: 3000,
          type: "error",
          message: `${result?.status},Try again later!`,
        });
        setOpen(true);
        handleRosLoader();
        handleDiscard();
      }
    });
  };
  const handleUpdateName = () => {
    console.log(data);
    const updateName = new ROSLIB.Service({
      ros: ross,
      name: "/face_training_name_update",
      serviceType: "aido_service/NameUpdate",
    });

    const request = new ROSLIB.ServiceRequest({
      current_name: data.name,
      update_name: data.updateName,
    });
    // console.log(addTwoIntsClient);
    updateName.callService(request, function (result) {
      console.log("Result for service call on ", result);
      if (result.status === "Success") {
        handleRosLoader();
        setAlert({
          time: 3000,
          type: "success",
          message: `${result?.status}`,
        });
        setOpen(true);
        setData({
          name: "",
          updateName: null,
          image: null,
        });
        handleEditface();
        getFaces();
      } else {
        setAlert({
          time: 3000,
          type: "error",
          message: `${result?.status},Try again later!`,
        });
        setOpen(true);
        handleRosLoader();
        setData({
          name: "",
          updateName: null,
          image: null,
        });
        handleEditface();
      }
    });
  };
  const handleUpdateImage = async (val) => {
    setRosLoader(true);
    setRosMessage("Please wait until the update completes");
    console.log(data, !data.image);
    if (!data.image && val === 1) {
      handleUpdateName();
    } else {
      const updateImage = new ROSLIB.Service({
        ros: ross,
        name: "/face_training_image_update",
        serviceType: "aido_service/TrainName",
      });

      let img = await convertBase64(data.image);

      const imageMessage = new ROSLIB.Message({
        format: "jpeg",
        data: img.split(",")[1],
      });
      // console.log(imageMessage)
      const request = new ROSLIB.ServiceRequest({
        image: imageMessage,
        name: data.name,
      });
      // console.log(addTwoIntsClient);
      updateImage.callService(request, function (result) {
        console.log("Result for service call on ", result);
        if (result.status === "Success") {
          if (val === 1) {
            handleUpdateName();
          } else {
            handleRosLoader();
            setAlert({
              time: 3000,
              type: "success",
              message: `${result?.status}`,
            });
            setOpen(true);
            setData({
              name: "",
              updateName: null,
              image: null,
            });
            handleEditface();
            getFaces();
          }
        } else {
          setAlert({
            time: 3000,
            type: "error",
            message: `${result?.status},Try again later!`,
          });
          setOpen(true);
          handleRosLoader();
          setData({
            name: "",
            updateName: null,
            image: null,
          });
          handleEditface();
        }
      });
    }
  };

  const handleDelete = (id) => {
    console.log(data, id);
    setRosMessage("Please wait,While the face is deleted.");
    setRosLoader(true);
    setPageLoader(true)
    const deleteName = new ROSLIB.Service({
      ros: ross,
      name: "/face_training_name_delete",
      serviceType: "aido_service/NameDelete",
    });

    const request = new ROSLIB.ServiceRequest({
      current_name: people[1][id].split(".")[0],
    });
    // console.log(addTwoIntsClient);
    deleteName.callService(request, function (result) {
      console.log("Result for service call on ", result);
      if (result.status === "Success") {
        handleRosLoader();
        setAlert({
          time: 3000,
          type: "success",
          message: `${result?.status}`,
        });
        setOpen(true);
        getFaces();
      } else {
        setAlert({
          time: 3000,
          type: "error",
          message: `${result?.status},Try again later!`,
        });
        setOpen(true);
        setPageLoader(false)
        handleRosLoader();
      }
    });
  };

  const handleEdit = (id) => {
    data.name = people[1][id].split(".")[0];
    console.log(data, id);
    setData({ ...data });
    setEditfaceOpen(true);
  };

  const handleUpdate = () => {
    if (!data.image && !data.updateName) {
      console.log("empty");
      setAlert({
        time: 3000,
        type: "error",
        message: `Please enter a new name or image to update!`,
      });
      setOpen(true);
    } else if (data.updateName?.length > 0) {
      console.log("name");
      handleUpdateImage(1);
    } else {
      console.log("no name");
      handleUpdateImage(0);
    }
  };

  const handlePrev = () => {
    // console.log(batchNumber);
    getFaces(batchNumber-1);
    setBatchNumber(s=>s-1)
  };

  const handleNext=()=>{
    getFaces(batchNumber+1)
    setBatchNumber(s=>s+1)
  }

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <p style={{ color: "#626976", fontSize: "35px" }}>Face Training</p>
        </Grid>
        <Grid item xs={3}>
          {/* <Button
            name={"+ Add New face"}
            onClick={(e) => setNewfaceOpen(true)}
          /> */}
        </Grid>
      </Grid>
      <Container className={classes.modal}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card style={{ padding: "10px" }} className={classes.paper}>
              <Grid container>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    name={"+ Add New face"}
                    onClick={(e) => setNewfaceOpen(true)}
                    style={{padding:"10px 10px"}}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {barMessage}
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {pageLoader ? (
                    <CircularProgress
                      variant={"indeterminate"}
                      style={{ height: "30px", width: "30px", color: "grey" }}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={handlePrev}
                    disabled={batchNumber < 2}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      // border: "0.5px solid grey",
                    }}
                  >
                    <SkipPreviousIcon />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  xs={1}
                  className={classes.title}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // border: "0.5px solid grey",
                  }}
                >
                  Page {batchNumber}
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={handleNext}
                    disabled={batchNumber >= nextButton}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      // border: "0.3px solid grey",
                    }}
                  >
                    <SkipNextIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {people[1]?.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card>
                <CardActionArea>
                  {/* <CardMedia
                    style={{ height: 220 }}
                    image={item.image_url}
                    // title="Contemplative Reptile"
                  /> */}
                  <img
                    src={`data:image/png;base64,${people[0][index].data}`}
                    height="300"
                    width="100%"
                  />
                </CardActionArea>
                <Grid container className={classes.paper} spacing={1}>
                  <Grid item xs={6} style={{ paddingLeft: "10px" }}>
                    <p
                      style={{
                        color: "#626976",
                        fontSize: "25px",
                        overflow: "hidden",
                      }}
                    >
                      {item.split(".")[0]}
                    </p>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      onClick={(e) => handleEdit(index)}
                      name="Edit"
                      style={{ padding: "1em 2em" }}
                    ></Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      onClick={(e) => handleDelete(index)}
                      name="Delete"
                      style={{ padding: "1em 1.5em" }}
                    ></Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Alert
        open={open}
        handleClose={handleClose}
        time={alert.time}
        type={alert.type}
        message={alert.message}
      />
      <NewFace
        open={newfaceOpen}
        handleClose={handleNewface}
        data={data}
        rosLoader={rosLoader}
        rosMessage={rosMessage}
        setData={setData}
        handleChange={handleChange}
        handleFile={handleFile}
        handleSubmit={handleSubmit}
      />
      <EditFace
        open={editfaceOpen}
        handleClose={handleEditface}
        data={data}
        rosLoader={rosLoader}
        rosMessage={rosMessage}
        setData={setData}
        handleChange={handleChange}
        handleFile={handleFile}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

export default FaceTraining;
