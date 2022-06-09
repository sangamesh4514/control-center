import React, { useState, useEffect } from "react";
import { Grid, Container, Snackbar } from "@material-ui/core";
import SelectField from "../common/SelectField";
import axios from "axios";
import Button from "../common/Button";
import Alert from "../common/Alert";
import { url, rosUrl } from "../common/api";
import NotificationCard from "../common/NotificationCard";
import Loader from "../common/DataLoaderGif/Loader";
import useStyles from "./styles";

const Notifications = () => {
  const [robotId, setRobotId] = useState();
  const [notificationList, setnotificationList] = useState([]);
  const [message, setMessage] = useState("")
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

  useEffect(() => {
    getNotifications();
  }, []);

  const handleClose = () => {
    setOpen((s) => !s);
  };
  const getNotifications = async () => {
    await axios
      .get(`${url}/api/v1/user/alertnotification?userId=${userId}`,
        options
      )
      .then((res) => {
        console.log("RESPONSE ==== : ", res);
        setnotificationList(res?.data?.data);
        const date = new Date("2021-06-19T10:25:48.000Z");
        console.log(date.toDateString());
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
        } else if (err?.response?.data.status.subCode === 1200) {
          setAlert({
            time: 3000,
            type: "info",
            message: "No Notifications yet!",
          });
          setOpen(true);
        } else {
          console.log(err?.response?.data);
        }
        setMessage("No Notifications")
        // setnotificationList([{ message: "No Notifications" }]);
      });
  };

  const deleteNotifications=async()=>{
    console.log("delete")
     await axios
       .delete(`${url}/api/v1/user/alertnotification?userId=${userId}`,options)
       .then((res) => {
         console.log("RESPONSE ==== : ", res);
          setAlert({
            time: 3000,
            type: "success",
            message: `Successfully deleted all notifications`,
          });
          setOpen(true);
         getNotifications()
       }).catch(err=>{
         console.log(err?.response?.data)
          setAlert({
            time: 3000,
            type: "error",
            message: `server under maintainance,Try again later!`,
          });
          setOpen(true);
       })
  }

   const deleteOne = async (id) => {
     console.log("delete");
     await axios
       .delete(`${url}/api/v1/user/alertnotification/${id}`, options)
       .then((res) => {
         console.log("RESPONSE ==== : ", res);
          setAlert({
            time: 3000,
            type: "success",
            message: `Successfully deleted`,
          });
          setOpen(true);
         getNotifications()
       })
       .catch((err) => {
         console.log(err?.response?.data);
         setAlert({
           time: 3000,
           type: "error",
           message: `server under maintainance,Try again later!`,
         });
         setOpen(true);
       });
   };

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <span style={{ color: "#626976", fontSize: "35px" }}>
            Notifications
          </span>
          <br></br>
          <br></br>
        </Grid>
        <Grid item xs={2}>
          {notificationList.length ? (
            <Button
              name={"Delete All"}
              onClick={(e) => deleteNotifications()}
              style={{ padding: "10px 10px" }}
            />
          ) : null}
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.customization}>
        {notificationList.length ? (
          notificationList.map((item) => (
            <Grid item xs={12}>
              <NotificationCard
                name={item.robot_name}
                title={item.module}
                body={item.submodule}
                message={item.message}
                time={item.created_at}
                id={item.id}
                handleDelete={deleteOne}
              />
            </Grid>
          ))
        ) : (
          <>{message.length ? message : <Loader />}</>
        )}
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

export default Notifications;
