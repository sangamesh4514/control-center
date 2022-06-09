import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Divider, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import S3 from 'react-aws-s3';
import Progressbar from '../../../utils/Progressbar';

const config = {
    bucketName: "aidouserfiles",
    region: "us-east-2",
    accessKeyId: "AKIAVTMWQGEEKQ46K4FG",
    secretAccessKey: "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",
};

const ReactS3Client = new S3(config);


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

export const EditAudioBody = ({ onClose, steps, one, two,
    currentRow, delay, editing, setNewAudio, setSteps }) => {

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const [audio_link, setAudio_link] = useState(currentRow.audio_link);
    const [audio_delay, setAudio_delay] = useState(currentRow.audio_delay);
    const [disabled, setDisabled] = useState(true);
    const [perc, setPerc] = useState(null);

    const [audioState, setAudioState] = useState({
        audio_link: !currentRow.audio_link ? null : currentRow.audio_link,
        audio_delay: !currentRow.audio_delay ? '0s' : currentRow.audio_delay
    });
    let editMode;
    if (!audioState.audio_link === null) {
        editMode = true;
    } else {
        editMode = false;
    }



    let val1;
    let val2;

    if (editing === false) {
        val1 = one;
        val2 = two;
    }
    if (editing === true) {
        val1 = !one ? audio_link : one;
        val2 = !two ? audio_delay : two;
    }



    const handleAudioChange = ({ target }) => {
        const { name, value } = target;
        setAudioState({
            ...audioState,
            [name]: value
        });
    }

    const handleAudioSubmit = (event) => {
        event.preventDefault();
        setSteps(steps.map(step => steps.indexOf(step) === steps.indexOf(currentRow) ? ({ ...step, audio_link: audioState.audio_link, audio_delay: audioState.audio_delay }) : step));
        onClose();
    }


    const handleFile = async (e) => {
        const randomNumber = Math.round(Math.random() * 20) - 10;
        const randomNumber2 = Math.round(Math.random() * 90) - 10;
        console.log(e)
        const size = e.target.files[0]?.size;
        const fileSize = Math.round((size / 1024));
        if (fileSize > 100000) {
            alert('Selected file size is too large. Try again with Maximum 100mb!');
        } else if (fileSize < 100000) {
            const newFileName = `web/${randomNumber}${randomNumber2}audio` + `${currentRow.step_id}_${e.target.name}`;
            setTimeout(() => {
                setPerc(20);
            }, 2000);
            setTimeout(() => {
                setPerc(50);
            }, 2000);
            setTimeout(() => {
                setPerc(70);
            }, 2000);
            setTimeout(() => {
                setPerc(80);
            }, 3000);
            await ReactS3Client.uploadFile(e.target.files[0], newFileName)
                .then((data) => {
                    if (data) {
                        setPerc(100);
                    }
                    setAudioState({
                        ...audioState,
                        [e.target.name]: data.location
                    });


                })
                .catch((err) => {
                    console.log(err);
                }
                )
        };
    }

    const handleCloseModal = () => {
        setAudioState({
            audio_link: null,
            audio_delay: '0s',
        });
        onClose();
    }

    const progressStyling2 = {
        width: '22em'
    }
    const progressStyling = {
        background: 'aliceblue',
        position: 'absolute',
        top: '7.6em',
        left: '2.1em',
        width: '23.6em',
        padding: '0.6em',
        opacity: '0.99',
        borderRadius: '8px'
    }

    return (
        console.log(audioState),
        < div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }
        } className={classes.paper} >
            <h1>Audio upload</h1>
            <br></br>
            <form onSubmit={handleAudioSubmit}>
                <InputLabel>Choose which audio Aido should play </InputLabel>
                {perc && <Progressbar
                    styling={progressStyling}
                    value={perc}
                    barStyle={progressStyling2} />}
                <input
                    style={{
                        width: '100%',
                        marginBottom: '1em',
                    }}
                    type="file"
                    accept="audio/mp3"
                    name="audio_link"
                    id="audio_link"
                    onChange={handleFile}
                    className={classes.textField}
                />
                <InputLabel>Choose the delay for action to start </InputLabel>
                <select
                    style={{
                        width: '100%',
                        marginBottom: '1em'
                    }}
                    name="audio_delay"
                    labelId="audio_delay"
                    id="audio_delay"
                    value={audio_delay}
                    onChange={handleAudioChange}
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
                        audioState.audio_link === null && editMode === false ? true : false
                    } >Save</Button>
                {perc && perc == '100' && <Button className={classes.buttonui} onClick={() => setPerc(null)}>RESET FILE</Button>}
            </form>
        </div >
    );
}