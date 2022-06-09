import { IconButton, Container, Grid, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import AddIcon from "@material-ui/icons/Add";
import React, { useState, useEffect } from "react";
import BehaviourSchedulerModal from "./BehaviourSchedulerModal";
import { useHistory } from "react-router-dom";
import BehaviourSchedularCard from "../common/BehaviourSchedularCard";
import axios from "axios";
import Alert from "../common/Alert";
import Button from "../common/Button";
import {url,rosUrl} from "../common/api";
import useStyles from "./styles";

/** * Represents Behaviour Scheduler of the Robot
 * @module {function} Behaviour Scheduler  */

const BehaviourScheduler = () => {
  const [data, setData] = useState({
    name: "",
    behaviour_id: null,
    repeat_type: "None",
    date: null,
    time: null,
  });
  const [schedulers, setSchedulers] = useState([]);
  const [behaviourList, setBehaviourList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState({});
  const history = useHistory();
  const [robot_id, setRobot_id] = useState(history.location.state);
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [alert, setAlert] = useState({
    time: 3000,
    type: "info",
    message: "",
  });
  const [alertOpen, setAlertOpen] = useState(false);
console.log(data)
  useEffect(() => {
    getAllSchedulers();
    getAllBehaviour();
  }, []);

  useEffect(() => {
    getAllSchedulers();
  }, [count]);

  const handleAlert = () => {
    setAlertOpen((s) => !s);
  };
  const handleClose = () => {
    setOpen((s) => !s);
    if (edit) {
      setEdit(false);
    }
  };
  const getAllSchedulers = async () => {
    await axios
      .get(
        `${url}/api/v1/user/scheduler?robotId=${robot_id}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        // res.data?.data?.map(item=>schedulers.push(item))
        console.log(res);
        setSchedulers([...res.data?.data]);
      })
      .catch((err) => {
        console.log(err.response.data);
        setSchedulers([]);
        if (err?.response?.status === 500) {
          alert("SERVER UNDER MAINTAINENCE, Try again!");
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
          options[list[i].id] = list[i].name;
        }
        console.log(options);
        setOptions({ ...options });
        setBehaviourList([...list]);
      })
      .catch((err) => {
        console.log(err.response.data);
        setAlert({
          time: 3000,
          type: "error",
          message: "No Behaviours to create a scheduler, Try again later!",
        });
        setAlertOpen(true);
      });
  };

  const handleDelete = async (index) => {
    console.log(schedulers[index].id);
    await axios
      .delete(
        `${url}/api/v1/user/scheduler/${schedulers[index].id}?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCount((s) => s - 1);
        setAlert({
          time: 3000,
          type: "success",
          message: "Scheduler Deleted successfully",
        });
        setAlertOpen(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err?.response?.status === 500) {
          setAlert({
            time: 3000,
            type: "error",
            message: "SERVER UNDER MAINTAINENCE, Try again!",
          });
          setAlertOpen(true);
        } else {
          setAlert({
            time: 3000,
            type: "error",
            message: "Scheduler not deleted, Try again later!",
          });
          setAlertOpen(true);
        }
      });
  };

  const handleEdit = (index) => {
    console.log(index);
    setEdit(true);
    setEditIndex(index);
    handleClose();
    setData({
      name: schedulers[index].name,
      behaviour_id: schedulers[index].behavior_id + "",
      repeat_type: schedulers[index].repeat_type,
      date: schedulers[index].date.split("T")[0],
      time: schedulers[index].time,
    });
  };
   function dateDiffInDays(a, b) {
     // Discard the time and time-zone information.
     const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
     const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

     return Math.floor((utc2 - utc1) / _MS_PER_DAY);
   }
  const handleSave = async () => {
     let today = new Date();
     let diff = new Date(data?.date);
     let value = dateDiffInDays(today, diff);
     let time=data?.time?.split(":")
     let hours;
     let mins;
     if(time?.length){
        hours = time[0]-today.getHours()
        mins=time[1]-today.getMinutes()
     }
     console.log(time,hours,mins);
    if(!data.behaviour_id){
      setAlert({
                time: 3000,
                type: "error",
                message: `please provide behavior ,Try again!`,
              });
              setAlertOpen(true);
    }else if(!data.date){
       setAlert({
         time: 3000,
         type: "error",
         message: `please provide date ,Try again!`,
       });
       setAlertOpen(true);
    }else if(!data.time){
      setAlert({
        time: 3000,
        type: "error",
        message: `please provide time ,Try again!`,
      });
      setAlertOpen(true);
    }else if(value<0){
       setAlert({
         time: 3000,
         type: "error",
         message: `please provide valid date ,Try again!`,
       });
       setAlertOpen(true);
    }else if(value===0 && hours<0){
       setAlert({
         time: 3000,
         type: "error",
         message: `please provide valid time ,Try again!`,
       });
       setAlertOpen(true);
    }else if(value===0 && hours===0 && mins<1){
       setAlert({
         time: 3000,
         type: "error",
         message: `please provide valid time ,Try again!`,
       });
       setAlertOpen(true);
    }else{
       if (!edit) {
         await axios
           .post(
             `${url}/api/v1/user/scheduler?userId=${userId}&robotId=${robot_id}`,
             {
               robot_id: robot_id,
               behavior_id: data.behaviour_id,
               name: data.name,
               date: data.date,
               time: data.time,
               repeat_type: data.repeat_type,
             },
             {
               headers: {
                 Authorization: `Bearer ${userToken}`,
               },
             }
           )
           .then((res) => {
             console.log(res);
             setCount((s) => s + 1);
             setAlert({
               time: 3000,
               type: "success",
               message: "Scheduler created successfully",
             });
             setAlertOpen(true);
           })
           .catch((err) => {
             console.log(err.response.data);
             if (err?.response?.status === 500) {
               setAlert({
                 time: 3000,
                 type: "error",
                 message:
                   "Scheduler not created,choose behaviour and try again!",
               });
               setAlertOpen(true);
             } else if (err?.response?.data?.status?.code === 400) {
               if (err?.response?.data?.status?.subCode === 1113) {
                 setAlert({
                   time: 3000,
                   type: "error",
                   message: `please provide behavior ,Try again!`,
                 });
                 setAlertOpen(true);
               } else {
                 setAlert({
                   time: 3000,
                   type: "error",
                   message: `${err?.response?.data?.status?.message},Try again!`,
                 });
                 setAlertOpen(true);
               }
             }
           });
       } else {
         console.log("editing save", edit);
         await axios
           .put(
             `${url}/api/v1/user/scheduler/${schedulers[editIndex].id}?userId=${userId}`,
             {
               robot_id: robot_id,
               behavior_id: data.behaviour_id,
               name: data.name,
               date: data.date,
               time: data.time,
               repeat_type: data.repeat_type,
             },
             {
               headers: {
                 Authorization: `Bearer ${userToken}`,
               },
             }
           )
           .then((res) => {
             console.log(res);
             setCount((s) => s + 1);
             setAlert({
               time: 3000,
               type: "success",
               message: "Scheduler updated successfully",
             });
             setAlertOpen(true);
           })
           .catch((err) => {
             console.log(err.response.data);
             if (err?.response?.status === 500) {
               setAlert({
                 time: 3000,
                 type: "error",
                 message: "Scheduler not updated,Try again later!",
               });
               setAlertOpen(true);
             }
           });
         setEdit(false);
       }
       
    handleClose();
    setData({
      name: "",
      behaviour_id: null,
      repeat_type: "None",
      date: null,
      time: null,
    });
    }
    
   
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={9}>
                <span style={{ color: "#626976", fontSize: "35px" }}>
                  <IconButton
                    onClick={() => history.push("/customization", robot_id)}
                  >
                    <ArrowBackIosIcon fontSize="small" />
                  </IconButton>
                  Behavior Scheduler
                </span>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={handleClose}
                  name="+ Add Behavior Scheduler"
                  style={{ height: "80%", width: "80%",marginTop:"10px" }}
                ></Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.customization}>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <Typography variant="subtitle2">
                  By adding Scheduler Aido will perform behavior at the
                  selected time{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={3} style={{ marginTop: "10px" }}></Grid>
                  <Grid item xs={9}></Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <Grid container spacing={3}>
                  {schedulers.map((item, index) => (
                    <Grid item xs={12}>
                      <BehaviourSchedularCard
                        index={index}
                        title={item.name}
                        behaviour={item.behavior_name}
                        body1={item.repeat_type}
                        body2={`${item.time}  ${item.date.split("T")[0]}`}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <BehaviourSchedulerModal
        data={data}
        robot_id={robot_id}
        setData={setData}
        title="Behaviour Scheduler"
        open={open}
        options={options}
        handleSave={handleSave}
        handleClose={handleClose}
      />
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

export default BehaviourScheduler;
