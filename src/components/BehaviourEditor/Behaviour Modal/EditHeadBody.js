import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';

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
    },
}));

export const EditHeadBody = ({ onClose, steps, setSteps, currentRow, delay, editing, setNewHead, pan, tilt, one, two, three, four }) => {
    console.log(steps, currentRow, delay, editing, setNewHead, pan, tilt, one, two, three, four);
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    // const [headPan, setHeadPan] = useState(currentRow.pan);
    // const [headPanDelay, setHeadPanDelay] = useState(currentRow.pan_delay);
    // const [headTilt, setHeadTilt] = useState(currentRow.tilt);
    // const [headTiltDelay, setHeadTiltDelay] = useState(currentRow.tilt_delay);
    const [disabled, setDisabled] = useState(true);

    const [headState, setHeadState] = useState({
        pan: !currentRow.pan ? 30 : currentRow.pan,
        pan_delay: !currentRow.pan_delay ? '0s' : currentRow.pan_delay,
        tilt: !currentRow.tilt ? 30 : currentRow.tilt,
        tilt_delay: !currentRow.tilt_delay ? '0s' : currentRow.tilt_delay,

    });


    let val1;
    let val2;
    let val3;
    let val4;

    if (editing === false) {
        val1 = one;
        val2 = two;
        val3 = three;
        val4 = four;
    }
    if (editing === true) {
        //     val1 = !one ? headPan : one;
        //     val2 = !two ? headPanDelay : two;
        //     val3 = !three ? headTilt : three;
        //     val4 = !four ? headTiltDelay : four;
    }


    const handleHeadChange = ({ target }) => {
        const { name, value } = target;
        setHeadState({
            ...headState,
            [name]: value
        });
    }

    const handleHeadSubmit = (event) => {
        event.preventDefault();
        setSteps(steps.map(step => steps.indexOf(step) === steps.indexOf(currentRow) ? ({ ...step, pan: headState.pan, pan_delay: headState.pan_delay, tilt: headState.tilt, tilt_delay: headState.tilt_delay }) : step));
        onClose();
    }


    const handleCloseModal = () => {
        setHeadState({
            pan: 30,
            pan_delay: '0s',
            tilt: 30,
            tilt_delay: '0s',
        });
        onClose();
    }

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} className={classes.paper}>
            <h1>Edit Head</h1>
            <br></br>
            <form onSubmit={handleHeadSubmit}>
                <InputLabel>Choose pan</InputLabel>
                <select
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    name="pan"
                    labelId="pan"
                    id="pan"
                    value={headState.pan}
                    onChange={handleHeadChange}
                    className={classes.textField}
                >
                    {
                        Object.keys(pan).map(pn => {
                            // console.log(location, locations[location], locations[location].location_id)
                            return <option value={pan[pn]}>{pan[pn]}</option>
                        })
                    }

                </select>
                <InputLabel>Choose pan delay </InputLabel>
                <select
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    name="pan_delay"
                    labelId="pan_delay"
                    id="pan_delay"
                    value={headState.pan_delay}
                    onChange={handleHeadChange}
                    className={classes.textField}
                >
                    {
                        Object.keys(delay).map(el => {
                            // console.log(el, delay[el], delay[el].el_id)
                            return <option value={delay[el]}>{delay[el]}</option>
                        })
                    }
                </select>
                <InputLabel>Choose tilt </InputLabel>
                <select
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    name="tilt"
                    labelId="tilt"
                    id="tilt"
                    value={headState.tilt}
                    onChange={handleHeadChange}
                    className={classes.textField}
                >
                    {
                        Object.keys(tilt).map(el => {
                            // console.log(el, delay[el], delay[el].el_id)
                            return <option value={tilt[el]}>{tilt[el]}</option>
                        })
                    }

                </select>
                <InputLabel>Choose tilt delay </InputLabel>
                <select
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    name="tilt_delay"
                    labelId="tilt_delay"
                    id="tilt_delay"
                    value={headState.tilt_delay}
                    onChange={handleHeadChange}
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
                        headState.pan === null || headState.pan_delay === null || headState.tilt === null || headState.tilt_delay === null ? true : false
                    }>Save</Button>

            </form>
        </div>
    );
}