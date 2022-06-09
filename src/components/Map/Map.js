import React, { useState, useEffect } from "react";
import { Grid, Paper, Container, makeStyles } from "@material-ui/core";
import SelectField from "../common/SelectField";
import axios from "axios";
import Button from "../common/Button";
import useStyles from './styles'

const Map = () => {
  const [robotId, setRobotId] = useState();
  const [robotList, setRobotList] = useState({});
  const [robotListData, setRobotListData] = useState();
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
    getRobotList()
  }, [])

  const handleChange = (e) => {
    setRobotId(e.target.value);
  };

  const handleEdit = () => {
    console.log("map", robotId, robotListData[robotId])
    const robot = robotListData[robotId]
    window.location.href = `map.html?id=${robot.robot_id}=${robot.fcm_token}=${robot.user_role}=1`
  }
  const getRobotList = async () => {
    await axios
      .get(
        `https://ingendynamics.com/api/v1/user/owned-robot?userId=${userId}`,
        options
      )
      .then((res) => {
        console.log("RESPONSE ==== : ", res.data.data);
        const listData = res.data.data;
        const list = {};
        listData.map((a, i) => (list[i] = a.name));
        // console.log(list,listData)
        setRobotListData(listData);
        setRobotList(list);
      })
      .catch((err) => {
        console.log(err?.response?.data)
        if (err?.response?.data?.status?.subCode === 1200) {
          alert("You don't have any robot to edit map");
        }
      });
  };
  return (
    <>
      <Grid>
        <Grid item xs={12}>
          <span style={{ color: '#626976', fontSize: '35px' }}>
            Map
          </span>
          <br></br>
        </Grid>
      </Grid>
      <Grid style={{ margin: "1em 0" }}>
        <Grid item xs={12} className={classes.customization}>
          <Grid container>
            <Grid item xs={12}>
              <p className={classes.title}>Choose Robot</p>
            </Grid>
            <Grid item xs={8}>
              <SelectField
                style={{ width: "100%" }}
                innerLabel={"---Choose Robot---"}
                selectValue={robotId}
                handleChange={handleChange}
                options={robotList}
                disabled={true}
              />
            </Grid>
            <Grid item xs={1}>

            </Grid>
            <Grid item xs={3}>
              <Button
                name={"Edit"}
                // disabled={robotId === undefined}
                disabled={true}
                // handleClick={handleEdit}
                style={{ marginRight: "10px" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Map;
