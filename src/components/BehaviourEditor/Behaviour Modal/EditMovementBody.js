import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Divider, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import { indexOf } from 'lodash';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
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
        width: '-webkit-fill-available',
        color: '#747C8B',
    },
    buttonui: {
        background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8',
        boxShadow: 'inset 1px 1px 1px rgb(255 255 255/24%)',
        border: '2.5px solid rgba(255, 255, 255, 0.6)',
        boxSizing: 'border-box',
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
}));

export const EditMovementBody = ({ onClose, steps, locationName, locationDelay,
    locationRobot, currentRow, robots, locations, delay, editing, reset, setNewMovement, setSteps, rowID }) => {

    console.log('[EDIT MOVEMENT ROW]', currentRow, rowID)

    const [modalStyle] = useState(getModalStyle);

    const [movementState, setMovementState] = useState({
        location_name: !currentRow.location_name ? locations[0] : currentRow?.location_name,
        location_delay: !currentRow.location_delay ? '0s' : currentRow?.location_delay
    })

    const classes = useStyles();


    const handleCloseModal = () => {
        setNewMovement({
            location_robot_id: null,
            location_name: locations[0],
            location_delay: '0s'
        });
        onClose();
    }

    const handleMovementChange = ({ target }) => {
        const { name, value } = target;
        setMovementState({
            ...movementState,
            [name]: value
        });
    }

    const handleMovementSubmit = (event) => {
        event.preventDefault();
        setSteps(steps.map(step => steps.indexOf(step) === steps.indexOf(currentRow) ? ({ ...step, location_name: movementState.location_name, location_delay: movementState.location_delay }) : step));
        onClose();
    }


    let heading;

    if (editing) {
        heading = 'Edit Movement';
    } else {
        heading = 'Add Movement';
    }


    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '38em'
        }} className={classes.paper}>
            <h1>Go to location</h1>
            <br></br>
            <form onSubmit={handleMovementSubmit}>
                <InputLabel>Choose the wanted location </InputLabel>
                <select
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    name="location_name"
                    labelId="location_name"
                    id="location_name"
                    value={movementState.location_name}
                    onChange={handleMovementChange}
                    className={classes.textField}
                >
                    {
                        Object.keys(locations).map(location => {
                            return <option value={locations[location]}>{locations[location]}</option>
                        })
                    }
                </select>
                {/* <InputLabel>Choose Robot: </InputLabel>
                <Select
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    name="location_robot_id"
                    labelId="location_robot_id"
                    id="location_robot_id"
                    value={val2}
                    onChange={handleMovementChange}
                ><MenuItem value="choose robot" disabled="true">Choose Robot</MenuItem>
                    {
                        Object.keys(robots).map(robot => {
                            // console.log(robot, robots[robot], robots[robot].robot_id)
                            return <MenuItem value={robots[robot].robot_id}>{robots[robot].name}</MenuItem>
                        })
                    }

                </Select> */}
                <InputLabel>Choose the delay for action to start </InputLabel>
                <select
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    name="location_delay"
                    labelId="location_delay"
                    id="location_delay"
                    value={movementState.location_delay}
                    onChange={handleMovementChange}
                    className={classes.textField}
                >
                    {
                        Object.keys(delay).map(el => {
                            // console.log(el, delay[el], delay[el].el_id)
                            return <option value={delay[el]}>{delay[el]}</option>
                        })
                    }

                </select>
                <Button
                    className={classes.buttonui}
                    onClick={() => handleCloseModal()}>Discard</Button>
                <Button type="submit"
                    className={classes.buttonui}
                    disabled={
                        movementState.location_name === null ? true : false
                    }
                >Save</Button>
            </form>
        </div>
    );
}