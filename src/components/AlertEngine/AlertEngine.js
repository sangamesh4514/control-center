import React, { useEffect, useState } from "react";
import { Grid, Button, IconButton, Modal } from '@material-ui/core';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import useStyles from '../BehaviourEditor/styles';
import editicon from './Group525.svg';
import deleteicon from './Group526.svg';
import EditAlert from '../AlertEngine/EditAlert';
import AddIcon from "@material-ui/icons/Add";
import Loader from "../common/DataLoaderGif/Loader";

const AlertEngine = () => {
    const userToken = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
    const history = useHistory();
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [alerts, setAlerts] = useState();
    const [alert, setAlert] = useState(null);
    const [alertEdit, setAlertEdit] = useState(false);

    useEffect(() => {
        getAlerts();
        setLoading(true);
        if (alerts === null) {
            setLoading(false);
        }
    }, []);

    const deleteAlertApi = async (id, robotid) => {
        await axios.delete(`https://ingendynamics.com/api/v1/user/alert/${id}?robotId=${robotid}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                console.log('[ALERT DELETED!]')
            }).catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }


    const getAlerts = async () => {
        await axios.get(`https://ingendynamics.com/api/v1/user/alert?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                if (res.data.status.code === 200) {
                    console.log(res.data.data);
                    const listData = res.data.data;
                    setAlerts(listData);
                    setLoading(false);
                }
            }).catch(error => {
                if (error?.response?.status === 404) {
                    console.log('No alerts found');
                    setLoading(false);
                    setAlerts(null);
                }
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }




    const handleDelete = (id) => () => {
        setAlerts(alerts.filter(el => el.id !== id))
        deleteAlertApi(id);
        if (alerts === null) {
            getAlerts();
        }
    }

    const handleClick = () => {
        history.push('/alert/add');
    }

    const handleAlertModalClose = (value) => {
        setOpen(value ? value : false);
    }

    const handleEdit = (alert) => {
        setAlert(alert);
        setOpen(true);
        setAlertEdit(true);
    }

    const handleClose = () => {
        setOpen(false);
        setAlertEdit(false);
    }



    // const checkTimingPR = () => {
    //     if (true) {
    //         window.setTimeout(checkTimingPR, 60000);

    //         let minute = new Date().getMinutes();
    //         const tickling = minute;
    //         console.log("Minutes", new Date().getMinutes());
    //         do {
    //             window.setTimeout(checkTimingSC, 1000);
    //             console.log("Seconds", new Date().getSeconds());
    //         } while (minute === tickling);
    //     }
    // }

    // const checkTimingSC = () => {
    //     if (true) {
    //         console.log("Seconds", new Date().getSeconds());
    //     }
    // }
    // checkTimingPR();

    return (
        <>
            <Grid>
                <Grid item xs={9}>
                    <Grid item xs={6} style={{ display: 'inline-block' }}>
                        <span style={{ color: '#626976', fontSize: '35px' }}>
                            Alert List
                        </span>
                    </Grid>
                    <Grid item xs={6} style={{ float: 'right' }}>
                        <Button className={classes.buttonui} style={{ textTransform: 'capitalize' }} onClick={handleClick}>+ Create New Alert </Button>
                    </Grid>
                    <br></br>
                    <br></br>
                </Grid>
            </Grid>
            <Grid spacing={5} className={classes.container}>
                {
                    loading === true ? <Loader /> : (alerts?.map(
                        alert => <Grid item xs={12} style={{
                            width: '50em',
                            background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
                            border: '2.5px solid rgba(255, 255, 255, 0.6)',
                            padding: '1em',
                            borderRadius: '1em',
                            margin: '1em 0'
                        }}>
                            <span
                                style={{ verticalAlign: 'text-bottom', display: 'inline-block' }}>
                                <p><b>Behavior:</b> {alert?.behavior_name}</p>
                                <p><b>Status:</b> {alert?.status === 0 ? 'OFF' : 'ON'}</p>
                                <p><b>Module:</b> {alert?.module_name}</p>
                                <p>{alert?.submodule_name} {alert?.logic} {alert?.value}</p>
                            </span>
                            <span style={{ verticalAlign: 'text-bottom', display: 'inline-block', float: 'right' }}>
                                <Grid
                                    item xs={2}
                                    style={{ display: 'table-cell', padding: '1em' }}
                                >
                                    <IconButton
                                        aria-label="Edit"
                                        onClick={() => handleEdit(alert)}
                                        style={{
                                            border: '2.5px solid rgba(255, 255, 255, 0.4)',
                                            margin: '0 0.5em'
                                        }}>
                                        <img src={editicon} style={{
                                            width: '0.5em'
                                        }} />
                                    </IconButton>
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={handleDelete(alert.id)}
                                        style={{
                                            border: '2.5px solid rgba(255, 255, 255, 0.4)',
                                            margin: '0 0.5em'
                                        }}>
                                        <img src={deleteicon} style={{
                                            width: '0.5em'
                                        }} />
                                    </IconButton>
                                </Grid>
                            </span>
                        </Grid>
                    ))
                }
                {alerts === null ? (<h5 style={{
                    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8',
                    border: '2.5px solid rgba(255, 255, 255, 0.6)',
                    padding: '1em'
                }}>No Alerts found, <br></br>Create new alert to get started!</h5>) : null
                }
            </Grid>
            <Modal
                open={open}
                disableEnforceFocus
            >
                {alertEdit && (
                    <EditAlert
                        onClose={handleClose}
                        alertDetail={alert}
                        userid={userId}
                        getAlerts={getAlerts}
                    />)}
            </Modal>
        </>
    )
}

export default AlertEngine;