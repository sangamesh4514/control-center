import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Divider, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import S3 from "react-aws-s3";
import Group555 from './Group555.svg';
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
    imagePaper: {
        boxShadow: 'inset 2px 2px 3px #bfd3e5, inset -2px -2px 6px rgb(255 255 255 / 80%)',
        margin: 'auto',
        width: '16em',
        height: '14em'
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
    textField: {
        margin: '0 0 2em 0',
        background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F9',
        boxShadow: 'inset 2px 2px 3px #bfd3e5, inset -2px -2px 6px rgb(255 255 255 / 80%)',
        borderRadius: '10px',
        border: 'none',
        padding: '0.5em',
        width: '-webkit-fill-available',
        color: '#747C8B',

    }
}));

export const EntryBehaviourModal = ({ handleClose,
    behaviorDetails, setBehaviorDetails, setEntryOpen, behaviorEdit, handleBehaviorSubmit, behavior_image }) => {
    const history = useHistory();
    const [modalStyle] = useState(getModalStyle);
    const [file, setFile] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [perc, setPerc] = useState(null);

    const classes = useStyles();

    const [entryBehaviorState, setEntryBehaviorState] = useState({
        behavior_image: !behaviorDetails.behavior_image ? null : behaviorDetails.behavior_image,
        behavior_name: !behaviorDetails.behavior_name ? null : behaviorDetails.behavior_name,
        behavior_description: !behaviorDetails.behavior_description ? null : behaviorDetails.behavior_description
    })

    const handleBehaviorChange = ({ target }) => {
        const { name, value } = target;
        if (file) {
            setEntryBehaviorState({
                ...entryBehaviorState,
                behavior_image: file
            });
        }
        setEntryBehaviorState({
            ...entryBehaviorState,
            [name]: value
        });
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        //     // setEntryBehaviorState({...entryBehaviorState, behavior_name: entryBehaviorState.behavior_name, behavior_description: entryBehaviorState.behavior_description, behavior_image: entryBehaviorState.behavior_image})
        setBehaviorDetails(entryBehaviorState);
        setBehaviorDetails({ ...behaviorDetails, behavior_image: file })
        handleBehaviorSubmit(entryBehaviorState);
        // handleCloseModal();
    }


    const handleFile = async (e) => {
        const randomNumber = Math.round(Math.random() * 20) - 10;
        const randomNumber2 = Math.round(Math.random() * 90) - 10;
        console.log("file insider", e.target.name);
        const newFileName = `web/${randomNumber}${randomNumber2}` + `${e.target.name}`;
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

        setTimeout(() => {
            setPerc(100);
        }, 4000);
        await ReactS3Client.uploadFile(e.target.files[0], newFileName)
            .then((data) => {
                setFile(data.location);
                setEntryBehaviorState({ ...entryBehaviorState, behavior_image: data.location })
                // setBehaviorDetails({ ...behaviorDetails, behavior_image: data.location })
                console.log(file, e);
                // updateImageUrl(data.location);
                // setImage(data.location);
                setPerc(null);
                // handleBehaviorChange(e);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const handleCloseModal = () => {
        setFile(null);
        if (behaviorEdit === true) {
            setEntryBehaviorState({
                ...entryBehaviorState,
                behavior_name: behaviorDetails.behavior_name,
                behavior_description: behaviorDetails.behavior_description,
                behavior_image: behaviorDetails.behavior_image,
            })
            setEntryOpen(false);
            handleClose();
        } else if (behaviorEdit === false) {
            setEntryOpen(false);
            history.push('/behaviour');
        }
    }

    let entryheading;

    if (behaviorEdit) {
        entryheading = 'Edit Behavior';
    } else {
        entryheading = 'Add New Behavior';
    }

    const progressStyling2 = {
        width: '14.8em'
    }
    const progressStyling = {
        background: 'aliceblue',
        position: 'absolute',
        top: '20.6em',
        left: '2.1em',
        width: '16em',
        padding: '0.6em',
        opacity: '0.99',
        borderRadius: '8px'
    }


    return (
        console.log('[DATA CHANGED]', behaviorDetails, entryBehaviorState),
        <>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '38em'
                }}
            >
                <form onSubmit={handleSubmit}>
                    <div className={classes.paper}>
                        <h1
                            style={{
                                fontSize: '30px',
                                margin: '0 0 1em 0'

                            }}>{entryheading}</h1>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <label htmlFor="behavior_image">
                                    <div className={classes.imagePaper}
                                        style={{
                                            background: 'linearGradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
                                            margin: 'auto',
                                            borderRadius: '1em',
                                            overflow: 'hidden',
                                        }}>

                                        {behavior_image !== null && !file && <img key={'1'} style={{ width: '100%', height: 'inherit' }} src={`${behavior_image}?${(+new Date())}`} />}
                                        {file && <img key={'2'} style={{
                                            width: '16em',
                                            height: '14em'
                                        }} src={`${file}?${(+new Date())}`} />}
                                        <br />
                                        {file === null && !behavior_image && <img key={'4'} style={{
                                            margin: '0em 2em'
                                        }} src={Group555} />}
                                    </div>
                                </label>
                                {perc && <Progressbar
                                    styling={progressStyling}
                                    value={perc}
                                    barStyle={progressStyling2} />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="behavior_image"
                                    id="behavior_image"
                                    onChange={(e) => handleFile(e)}
                                    style={{ display: "none" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                    className={classes.textField}
                                    type="text"
                                    name="behavior_name"
                                    labelId="behavior_name"
                                    id="behavior_name"
                                    value={entryBehaviorState.behavior_name || ""}
                                    onChange={handleBehaviorChange}
                                    placeholder="Name"
                                />
                                <br></br>
                                <textarea
                                    className={classes.textField}
                                    type="textarea"
                                    rows="6"
                                    placeholder="Enter Description here...."
                                    name="behavior_description"
                                    labelId="behavior_description"
                                    id="behavior_description"
                                    value={entryBehaviorState.behavior_description || ""}
                                    onChange={handleBehaviorChange}
                                    placeholder="Description"
                                />
                                <br></br>
                                <div style={{ float: 'right' }}>
                                    <Button className={classes.buttonui} onClick={handleCloseModal}>DISCARD</Button>
                                    <Button disabled={entryBehaviorState.behavior_name ? false : true} type="submit" className={classes.buttonui}>SAVE</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div>
        </>
    );
}