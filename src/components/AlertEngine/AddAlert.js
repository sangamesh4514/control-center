import React, { useEffect, useState } from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import axios from 'axios';
import backicon from './back.svg';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    paper: {
        border: '2.5px solid #F2F9FF',
        borderRadius: '1.5em',
        color: '#747C8B',
        background: '#EAF1F8',
        borderRadius: '1.5em',
        padding: '1em 2em'
    },
    textField: {
        margin: '0 0 2em 0',
        background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F9',
        boxShadow: 'inset 2px 2px 3px #bfd3e5, inset -2px -2px 6px rgb(255 255 255 / 80%)',
        borderRadius: '10px',
        border: 'none',
        padding: '0.5em',
        width: '20em',
        color: '#747C8B',
        '&::focus-visible': {
            border: 'none'
        }
    },
    buttonui: {
        background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
        border: '2.5px solid rgba(255, 255, 255, 0.6)',
        boxSizing: 'border-box',
        boxShadow: '-3px - 3px 6px rgb(255 255 255 / 21 %), 1px 1px 2px rgb(0 0 0 / 20 %), inset 1px 1px 1px rgb(255 255 255 / 24 %)',
        borderRadius: '50px',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '13px',
        lineHeight: '18px',
        textAlign: 'center',
        letterSpacing: '0.00310565px',
        textTransform: 'uppercase',
        color: 'rgba(116, 124, 139, 0.72)',
        margin: '0 0.5em 0.5em 0.5em'
    }
})

const AddAlert = () => {
    const userToken = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
    const [behaviorList, setBehaviorList] = useState([]);
    const [submoduleDisabled, setSubmoduleDisabled] = useState(true);
    const [subModules, setSubModules] = useState([]);
    const [module, setModule] = useState(null);
    const [submodule, setSubmodule] = useState(null);
    const [condition, setCondition] = useState(null);
    const [alertvalue, setAlertvalue] = useState(null);
    const [behavior, setBehavior] = useState(null);
    const [currentRobot, setCurrentRobot] = useState(null);
    const [status, setStatus] = useState(null);
    const [robotsList, setRobotsList] = useState(null);
    const [shuffleBehaviors, setShuffleBehaviors] = useState(false);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getRobotsList();

    }, []);

    useEffect(() => {
        getList(currentRobot);
        setShuffleBehaviors(false);
    }, shuffleBehaviors === true);

    const getModules = async (robotid) => {
        console.log('modules');
        await axios.get(`https://ingendynamics.com/api/v1/user/moduleconfiguration?robotId=${robotid}&userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                // if (res.data.status.code === 200) {
                console.log(res.data.data);


                //     } else if (res.data.status.code === 404) {
                //         alert("NO BEHAVIORS FOUND! Get Started with creating new Behavior...");
                //         setBehaviorList([{ null: true }]);
                //     }
                // }).catch(error => {
                //     if (error?.response?.status === 500) {
                //         alert('SERVER UNDER MAINTAINENCE, Try again!');
                //     }
            });
    }

    const getList = async (robotid) => {
        await axios.get(`https://ingendynamics.com/api/v1/user/all-behavior/robot?robotId=${robotid}&userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                if (res.data.status.code === 200) {
                    console.log(res.data.data);
                    const listData = res.data.data;
                    setBehaviorList(listData);
                } else if (res.data.status.code === 404) {
                    alert("NO BEHAVIORS FOUND! Get Started with creating new Behavior...");
                    setBehaviorList([{ null: true }]);
                }
            }).catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;
        let sub_modules = [];
        console.log(name, value);
        if (name === 'robotid') {
            setBehaviorList(null);
            console.log(value)
            setCurrentRobot(value);
            setShuffleBehaviors(true);
            getList(value);
        } else if (name === 'modules') {
            setSubModules([]);
            if (name === 'modules' && value === 'Sensor') {
                sub_modules = [
                    {
                        id: 1,
                        name: 'Humidity'
                    },
                    {
                        id: 2,
                        name: 'Temperature'
                    },
                    {
                        id: 3,
                        name: 'Dust'
                    },
                    {
                        id: 4,
                        name: 'Smoke'
                    },
                    {
                        id: 5,
                        name: 'Air quality'
                    },
                    {
                        id: 6,
                        name: 'Pressure'
                    },
                    {
                        id: 7,
                        name: 'CO'
                    },
                ]
                setSubModules(sub_modules);
                setModule(1);
                setSubmoduleDisabled(false);
            } else if (name === 'modules' && value === 'Deep Learning') {
                sub_modules = [
                    {
                        id: 8,
                        name: 'Face and Emotion Recognition'
                    }

                ]
                setSubModules(sub_modules);
                setModule(2);
                setSubmoduleDisabled(false);
            }
        } else if (name === 'submodules') {
            if (value === '1') {
                setSubmodule(1);
            } else if (value === '2') {
                setSubmodule(2);
            } else if (value === '3') {
                setSubmodule(3);
            } else if (value === '4') {
                setSubmodule(4);
            } else if (value === '5') {
                setSubmodule(5);
            } else if (value === '6') {
                setSubmodule(6);
            } else if (value === '7') {
                setSubmodule(7);
            } else if (value === '8') {
                setSubmodule(8);
            }
        } else if (name === 'condition') {
            if (value === '>=') {
                setCondition('>=');
            } if (value === '<=') {
                setCondition('<=');
            } if (value === '==') {
                setCondition('==');
            } if (value === '!=') {
                setCondition('!=');
            }
        } else if (name === 'value') {
            setAlertvalue(value);
        } else if (name === 'behavior') {
            setBehavior(value);
        } else if (name === 'status') {
            if (value === 'true') {
                setStatus(1)
            } else {
                setStatus(0);
            }
        }
    }

    const getRobotsList = async () => {
        await axios.get(`https://ingendynamics.com/api/v1/user/all-robot?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                if (res.data.status.code === 200) {
                    console.log(res.data.data);
                    const listData = res.data.data;
                    setRobotsList(listData);
                    const initRobot = listData[0].robot_id;
                    getModules(initRobot);
                }
            }).catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }


    const addAlertApi = async (data, robotid) => {
        console.log(data);
        await axios.post(`https://ingendynamics.com/api/v1/robots/alert?robotId=${robotid}&userId=${userId}`, {
            alertList: [
                data
            ]
        },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                console.log('[ADDED SUCCESS]')
            }).catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }

    const handleAlertSubmit = (event) => {
        event.preventDefault();
        console.log(module);
        const alert_data = {
            module_id: module,
            submodule_id: submodule,
            logic: condition,
            value: alertvalue,
            behavior_id: behavior,
            status: status ? 1 : 0
        }
        console.log(alert_data)

        // setList([
        //     ...list,
        //     alert_data
        // ]);

        addAlertApi(alert_data, currentRobot);

        setModule(null);
        setSubmodule(null);
        setCondition(null);
        setAlertvalue(null);
        setBehavior(null);
        setStatus(null);

        history.push('/alert');
    }

    const backFunction = () => {
        history.push('/alert');
    }

    return (
        console.log('[DATA CHANGED]', module, submodule, condition, alertvalue, status, behavior),
        <>
            <Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={12}>
                    <span style={{ color: '#626976', fontSize: '35px' }}>
                        <Button startIcon={<img src={backicon} />} onClick={() => backFunction()} />
                        Add Alert
                    </span>
                    <br></br>
                </Grid>
            </Grid>

            <form
                style={{
                    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
                    border: '2.5px solid rgba(255, 255, 255, 0.6)',
                    padding: '1em',
                    borderRadius: '1em',
                    margin: '1em 0',
                    height: '30em',
                    width: '45em'
                }}
                onSubmit={handleAlertSubmit}>
                <div style={{ float: 'left' }}>
                    <label>Robot</label>
                    <br></br>
                    <select name="robotid" className={classes.textField} onChange={handleChange}>

                        <option hidden disabled selected value>Choose Robot</option>
                        {robotsList?.map(el => {
                            return <option value={el.robot_id}>
                                {el.name}
                            </option>
                        })
                        }
                    </select>
                    <br></br>
                    <label for="type">Module</label>
                    <br></br>

                    <select name="modules" className={classes.textField} onChange={handleChange}>
                        <option hidden value selected disabled>Choose Module</option>
                        <option value="Sensor">Sensor</option>
                        <option value="Deep Learning">Deep Learning</option>
                    </select>

                    <br></br>
                    <label for="type">Condition</label>
                    <br></br>

                    <select name="condition" className={classes.textField} onChange={handleChange}>
                        <option hidden value selected disabled>Choose Condition</option>
                        <option value=">=">{'>='}</option>
                        <option value="<=">{'<='}</option>
                        <option value="==">{'=='}</option>
                        <option value="!=">{'!='}</option>
                    </select>
                    <br></br>

                    <label for="type">Status</label>
                    <br></br>
                    <select name="status" className={classes.textField} onChange={handleChange}>
                        <option hidden value selected disabled>Choose Status</option>
                        <option value="true">ON</option>
                        <option value="false">OFF</option>
                    </select>
                    <br></br>

                    <Button
                        className={classes.buttonui}
                        onClick={handleAlertSubmit}
                        disabled={
                            currentRobot === null ||
                                submodule === null ||
                                condition === null ||
                                alertvalue === null ||
                                behavior === null ||
                                status === null ? true : false
                        }
                    >Save</Button>
                    <p><i>*all fields are mandatory!</i></p>
                </div>
                <div style={{ float: 'right' }}>

                    <label for="type">Behavior</label>
                    <br></br>
                    <select name="behavior" className={classes.textField} onChange={handleChange}>
                        {behaviorList === null ? <option value disabled selected hidden>No Behavior! create new behavior</option> : behaviorList?.length === 0 ? <option hidden value selected disabled>CHOOSE ANY ROBOT FIRST</option> : <option hidden value selected disabled>Choose Behavior</option>}
                        {
                            behaviorList?.map(el => {
                                return <option value={el.id}>{el.name}</option>
                            })
                        }
                    </select>

                    <br></br>
                    <label for="type">Sub-module</label>
                    <br></br>
                    <select name="submodules" onChange={handleChange} className={classes.textField} disabled={submoduleDisabled}>
                        <option hidden value selected disabled>Choose Sub Module</option>
                        {subModules !== null ? subModules?.map(el => {
                            console.log(el)
                            return <option value={`${el.id}`}>
                                {el.name}
                            </option>
                        }) : null}
                    </select>
                    <br></br>
                    <label for="type">Value</label>
                    <br></br>
                    <input type="text" name="value" className={classes.textField} onChange={handleChange} />
                    <br></br>

                </div>

            </form>
        </>
    )
}

export default AddAlert;