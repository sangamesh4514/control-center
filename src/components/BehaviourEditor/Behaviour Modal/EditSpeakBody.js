import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Divider, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

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
    },
}));

export const EditSpeakBody = ({ onClose, steps, one, two,
    three, currentRow, delay, editing, setNewSpeak, setSteps }) => {

    const row = {
        step_id: currentRow.step_id
    }
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const [speakState, setSpeakState] = useState({
        tts: !currentRow?.tts ? null : currentRow.tts,
        tts_on_screen_flag: !currentRow.tts_on_screen_flag ? false : currentRow.tts_on_screen_flag,
        tts_delay: !currentRow.tts_delay ? '0s' : currentRow.tts_delay,
    });

    const handleSpeakChange = ({ target }) => {
        const { name, value } = target;
        setSpeakState({
            ...speakState,
            [name]: value
        });
    }

    const handleSpeakSubmit = (event) => {
        event.preventDefault();
        setSteps(steps.map(step => steps.indexOf(step) === steps.indexOf(currentRow) ? ({ ...step, tts: speakState.tts, tts_delay: speakState.tts_delay, tts_on_screen_flag: speakState.tts_on_screen_flag }) : step));
        onClose();
    }

    const handleDisplayScreenText = (event, row) => {

        // const rowIndex = steps.indexOf(row);

        // console.log(rowIndex)

        setSpeakState({
            ...speakState,
            [event.target.name]: event.target.checked === true ? 1 : 0
        });

        // let items = [...steps];

        // const item = {
        //     ...items[rowIndex],
        //     [event.target.name]: event.target.checked === true ? 1 : 0
        // }

        // items[rowIndex] = item;

        // setSteps(items);

    }

    const handleCloseModal = () => {
        setNewSpeak({
            tts: '',
            tts_on_screen_flag: 0,
            tts_delay: '0s',
        });
        onClose();
    }

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '38em'
        }} className={classes.paper}>
            <h1>Speak (Text to Speech)</h1>
            <br></br>
            <form onSubmit={handleSpeakSubmit}>
                <InputLabel>Type what Aido should say </InputLabel>
                <input
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    type="text"
                    name="tts"
                    labelId="tts"
                    id="tts"
                    value={speakState.tts || ""}
                    onChange={handleSpeakChange}
                    className={classes.textField}
                />
                <span>
                    <InputLabel style={{ display: 'inherit' }}>Show text on aido screen </InputLabel>
                    <Button size="small" color="primary" style={{
                        verticalAlign: 'revert'
                    }}>
                        <input type="checkbox"
                            checked={speakState.tts_on_screen_flag === 1 ? true : false}
                            name="tts_on_screen_flag"
                            style={{ boxShadow: 'none' }}
                            onChange={(event) => handleDisplayScreenText(event, currentRow)} />
                    </Button>
                </span>

                <br></br>

                <InputLabel style={{ margin: '1em 0 0.4em 0' }}>Choose the delay for action to start </InputLabel>
                <select
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    name="tts_delay"
                    labelId="tts_delay"
                    id="tts_delay"
                    value={speakState.tts_delay}
                    onChange={handleSpeakChange}
                    className={classes.textField}
                >
                    {
                        Object.keys(delay).map(el => {
                            return <option value={delay[el]}>{delay[el]}</option>
                        })
                    }

                </select>
                <Button className={classes.buttonui} onClick={() => handleCloseModal()}>Discard</Button>
                <Button
                    className={classes.buttonui}
                    type="submit"
                    disabled={
                        speakState.tts === null ? true : false
                    }>Save</Button>
            </form>
        </div>
    );
}