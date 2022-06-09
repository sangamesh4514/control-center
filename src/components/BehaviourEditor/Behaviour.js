import React, { useEffect, useState } from "react";
import { Grid, Button, } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import useStyles from './styles';
import BehaviourList from "./BehaviourList";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { behaviourDeleteApi } from "../../redux/slices/BehaviourSlice";
import axios from "axios";
import Loader from "../common/DataLoaderGif/Loader";

const Behaviour = () => {
  const [loading, setLoading] = useState(true);
  const [checkRobot, setCheckRobot] = useState(false);
  const [list, setList] = useState([]);
  const [bSteps, setBSteps] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  useEffect(async () => {
    console.log("running");
    getList();
    checkRobotList();
  }, []);

  const handleClick = () => {
    if (checkRobot === false) {
      history.push('/behaviour/add');
    } else {
      alert("No Robots found! (NOTE: Add new Robot from Companion App)");
    }
  }

  const checkRobotList = async () => {
    await axios.get(`https://ingendynamics.com/api/v1/user/all-robot?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        if (res.data.data === []) {
          setCheckRobot(true);
        }
      });
  }


  const getBehaviorSteps = async (id) => {
    const pulled = await axios.get(` https://ingendynamics.com/web/steps/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        console.log(res.data.data);
        const steps = res.data.data;
        setBSteps(steps);
      });
  }

  /**
   * Represents Behavior List Module
   * @module {function} Behavior List
   */
  const getList = async () => {
    await axios.get(`https://ingendynamics.com/api/v1/user/all-behavior?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        if (res.data.status.code === 200) {
          console.log(res.data.data);
          const listData = res.data.data;
          setList(listData);
          setLoading(false);
        }
      }).catch(error => {
        if (error?.response?.status === 500) {
          alert('SERVER UNDER MAINTAINENCE, Try again!');
        }
      });
  }

  const handleDeleteChange = (id, robot_id) => {
    console.log("inside delete");
    dispatch(behaviourDeleteApi(id, robot_id));
    getList();
  }


  const handleEditBehavior = (data) => {
    history.push('/behaviour/add', data);
  }

  return (
    <>
      <Grid>
        <Grid item xs={9}>
          <Grid item xs={6} style={{ display: 'inline-block' }}>
            <span style={{ color: '#626976', fontSize: '35px' }}>
              Behaviour List
            </span>
          </Grid>
          <Grid item xs={6} style={{ float: 'right' }}>
            <Button className={classes.buttonui} style={{ textTransform: 'capitalize' }} onClick={handleClick}>+ Create New Behaviour </Button>
          </Grid>
          <br></br>
          <br></br>
        </Grid>
      </Grid>

      <Grid spacing={5} className={classes.container}>
        {
          loading === true ? <Loader /> : (list?.map(
            res => {
              return <BehaviourList
                data={res}
                handleEditBehavior={handleEditBehavior}
                setList={setList} list={list}
                handleDelete={handleDeleteChange} />;
            }
          ))
        }
        {list === null ? (<h5 style={{
          background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8',
          border: '2.5px solid rgba(255, 255, 255, 0.6)',
          padding: '1em'
        }}>No Behavior found, <br></br>Create new behavior to get started!</h5>) : null
        }



      </Grid>
    </>
  );
};

export default Behaviour;
