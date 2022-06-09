import {
  AppBar,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Checkbox from "../common/Checkbox";
import SelectField from "../common/SelectField";
import TextField from "../common/TextField";
import Radio from "../common/Radio";
import Alert from "../common/Alert";
import Button from "../common/Button";
import {url,rosUrl,config} from "../common/api";
import { useHistory } from "react-router-dom";
import S3 from "react-aws-s3";
import { useSelector } from "react-redux";
import axios from "axios";
import useStyles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";


const ReactS3Client = new S3(config);

/** * Represents custom screen settings of the Robot
 * @module {function} custom Screen  */

const CustomScreen = () => {
  const [data, setData] = useState({
    topbar: "Hide",
    title: "",
    subtitle: "",
    // backgroundImage: "defaultImage",
    image: null,
    fnButtons: [],
  });
  const history = useHistory();
  const [robot_id, setRobot_id] = useState(history.location.state);
  const [behaviourList, setBehaviourList] = useState([]);
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const [robotData, setRobotData] = useState(
    useSelector((state) => state.CustomizationSlice)
  );
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    time: 3000,
    type: "info",
    message: "",
  });
  const [loader, setLoader] = useState("static")
  // console.log(robotData);

  // const [tips, setTips] = useState([{ tip: "" }]);
  // const [checked, setChecked] = useState(true);

  useEffect(() => {
    getAllBehaviour();
  }, []);

  const handleClose = () => {
    setOpen((s) => !s);
  };

  const handleFile = async (e) => {
    setLoader("indeterminate");
    console.log(e);
    const newFileName =
      "web/" +
      `customScreen_background_${robot_id}_${Math.floor(Math.random() * 1000)}_${
        e.target.name
      }`;
    await ReactS3Client.uploadFile(e.target.files[0], newFileName)
      .then((dataa) => {
        console.log(dataa);
        data["image"] = dataa.location
        console.log(data);
    setLoader("static");
        setData({ ...data });
      })
      .catch((err) => {
        data[e.target.name] = err;
        setData({ ...data });
      });
  };

  const handleChecked = (e) => {
    data.backgroundImage = e.target.value;
    setData({ ...data });
  };
  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
    console.log(data);
    setData({ ...data });
  };
  // const addTip = () => {
  //   tips.push({ tip: "" });
  //   setTips([...tips]);
  // };
  // const deleteTip = (index) => {
  //   const item=tips.filter((tip,ind)=>ind!==index)
  //   setTips([...item]);
  // };
  // const handleTip = (e) => {
  //   console.log(tips);
  //   tips[e.target.name].tip = e.target.value;
  //   setTips([...tips]);
  // };
  const handleFnButton = (e) => {
    console.log(e.target.checked, e.target.name);
    behaviourList[e.target.name].selected = e.target.checked;
    console.log(behaviourList);
    setBehaviourList([...behaviourList]);
  };

  const getScreenType = async (screenId, list) => {
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
        // setChecked(res?.data?.data[0]?.type);
        data.title = res.data.data.screen_title;
        data.subtitle = res.data.data.screen_subtitle;
        if (res.data.data.toolbar_display_style === "hide") {
          data.topbar = "Hide";
        } else {
          data.topbar = res.data.data.toolbar_display_style;
        }
        data.image = res.data.data.bg_img_url;
        console.log(data);
        setData({ ...data });
        const functionsList = res.data?.data?.function_btn_list;
        for (let i = 0; i < functionsList?.length; i++) {
          for (let j = 0; j < list.length; j++) {
            if (list[j].id === functionsList[i]) {
              list[j].selected = true;
            }
          }
        }
        setBehaviourList([...list]);
        console.log(list);
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

  const getAllBehaviour = async () => {
    await axios
      .get(
        `${url}/api/v1/user/all-behavior/robot?robotId=${robot_id}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          list[i].selected = false;
        }
        setBehaviourList([...list]);
        getScreenType(robotData.screen_type_id, list);
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

  const setScreenType = async () => {
    console.log(data)
    const list = [];
    console.log(robotData.screen_type_id,data);
    behaviourList.map((item) => {
      if (item.selected) {
        list.push(item.id);
      }
    });
    await axios
      .put(
        `${url}/api/v1/user/setting/screen/${robotData.screen_type_id}?userId=${userId}`,
        {
          type: "Custom",
          show_toolbar: data.topbar === "Show" ? 1 : 0,
          toolbar_display_style: data.topbar,
          screen_subtitle: data.subtitle,
          screen_title: data.title,
          bg_img_url: data.image,
          function_btn_list: list,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
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
      .catch((error) => {
        console.log(error.response.data);
        if (error?.response?.status === 500) {
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
        <Grid container spacing={3} style={{ marginBottom: "75px" }}>
          <Grid item xs={12}>
            <span style={{ color: "#626976", fontSize: "35px" }}>
              <IconButton
                onClick={() =>
                  history.push("/customization/homescreen", robot_id)
                }
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              Custom Screen
            </span>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.title}>Customize robot's custom screen</p>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={2} style={{ paddingTop: "15px" }}>
                      <p className={classes.title}>Topbar</p>
                    </Grid>
                    <Grid item xs={10}>
                      <SelectField
                        id="topbar"
                        name={"topbar"}
                        selectValue={data.topbar}
                        options={{
                          Show: "Show",
                          Hide: "Hide",
                        }}
                        handleChange={handleChange}
                        style={{ width: "100%", margin: "0px" }}
                      />
                    </Grid>
                  </Grid>
                </Grid> */}
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={2} style={{ paddingTop: "15px" }}>
                      <p className={classes.title}>Title</p>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        name={"title"}
                        // variant="outlined"
                        value={data.title}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={2} style={{ paddingTop: "15px" }}>
                      <p className={classes.title}>Subtitle</p>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        name={"subtitle"}
                        variant="outlined"
                        value={data.subtitle}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ borderTop: "1px solid grey" }}>
                  <Grid container>
                    <Grid item xs={12} style={{ paddingTop: "10px" }}>
                      <p className={classes.subtitle}>Background Image</p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <label htmlFor="upload_file">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "400px",
                            width: "500px",
                            // border: "2px dashed grey",
                            borderRadius: "10px",
                          }}
                          className={classes.image}
                        >
                          <CircularProgress
                            variant={loader}
                            style={{ position: "absolute" }}
                          />

                          {data.image ? (
                            <img
                              src={`${data.image}?${+new Date()}`}
                              alt="Aido"
                              height="100%"
                              width="100%"
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          ) : (
                            <h6 style={{ color: "#626976", fontSize: "25px" }}>
                              Upload image
                            </h6>
                          )}
                        </div>
                      </label>
                      <TextField
                        type="file"
                        accept="image/*"
                        name="image"
                        id="upload_file"
                        onChange={handleFile}
                        style={{ display: "none" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ borderTop: "1px solid grey" }}>
                  <Grid container>
                    <Grid item xs={12} style={{ paddingTop: "10px" }}>
                      <p className={classes.title}>Selected Function Buttons</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {behaviourList.map((item, index) => {
                          if (item.selected) {
                            return (
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={2}>
                                    <Checkbox
                                      id={index}
                                      checked={item.selected}
                                      name={index}
                                      key={index}
                                      handleChecked={handleFnButton}
                                    />
                                  </Grid>
                                  <Grid item xs={2}>
                                    <img
                                      src={
                                        item.image_url ||
                                        "https://aidouserfiles.s3.us-east-2.amazonaws.com/default/aido.png"
                                      }
                                      alt="Aido"
                                      height="50px"
                                      width="50px"
                                    />
                                  </Grid>
                                  <Grid item xs={8}>
                                    <Typography variant="subtitle1">
                                      {item.name}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            );
                          }
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    borderTop: "1px solid grey",
                    // borderBottom: "1px solid grey",
                  }}
                >
                  <Grid container style={{ paddingTop: "10px" }}>
                    <Grid item xs={12}>
                      <p className={classes.title}>Function Buttons</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {behaviourList.map((item, index) => (
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={2}>
                                <Checkbox
                                  id={index}
                                  checked={item.selected}
                                  name={index}
                                  key={index}
                                  handleChecked={handleFnButton}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <img
                                  src={
                                    item.image_url ||
                                    "https://aidouserfiles.s3.us-east-2.amazonaws.com/default/aido.png"
                                  }
                                  alt="Aido"
                                  height="50px"
                                  width="50px"
                                />
                              </Grid>
                              <Grid item xs={8} style={{ paddingLeft: "10px" }}>
                                <Typography variant="subtitle1">
                                  {item.name}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={5}></Grid>
        </Grid>
      </Container>
      <AppBar
        position="fixed"
        style={{
          top: "auto",
          bottom: "5px",
          width: "60%",
          left: "auto",
          right: "auto",
          height: "70px",
          background:
            "linear-gradient(182.87deg, rgba(255, 255, 255, 0.05) 0.69%, rgba(213, 232, 248, 0.05) 95.8%), #EBF2F8",
          border: "2.5px solid rgba(255, 255, 255, 0.9)",
          boxSizing: " border-box",
          boxShadow: "inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
          borderRadius: "12px",
        }}
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={6}></Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "center",
              }}
            >
              {/* <Button
                onClick={(e) => {
                  const list = behaviourList;
                  for (let i = 0; i < list.length; i++) {
                    list[i].selected = false;
                  }
                  setBehaviourList([...list]);
                  setData({
                    topbar: "Hide",
                    title: "",
                    subtitle: "",
                    image: "",
                    fnButtons: [],
                  });
                }}
                name="Clear"
                style={{ marginRight: "10px", height: "100%", width: "100%" }}
              ></Button> */}
              <Button
                onClick={(e) => {
                  setScreenType();
                }}
                name="Save"
                style={{ height: "100%", width: "100%" }}
              ></Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
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

export default CustomScreen;
