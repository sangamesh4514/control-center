import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Input, InputLabel } from '@material-ui/core';
import { aidoContext } from '../../App';
import Progressbar from '../../utils/Progressbar';
import S3 from "react-aws-s3";
import Group555 from './Group555.svg';

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

export const ProfileEdit = ({ onClose, setUser, handleUserSubmit, userName, userGender, userEmail, userProfile, user, changeProfileUrl }) => {
    const [modalStyle] = useState(getModalStyle);
    const [file, setFile] = useState(null);
    const [perc, setPerc] = useState(null);
    const [profileDetails, setProfileDetails] = useState({
        name: !userName ? null : userName,
        email: !userEmail ? null : userEmail,
        gender: !userGender ? null : userGender,
        profile_url: !userProfile ? null : userProfile
    });

    const { aidoState, setAidoState } = useContext(aidoContext);

    const classes = useStyles();

    const handleCloseModal = () => {
        onClose();
    }


    const handleFile = async (e) => {
        const randomNumber = Math.round(Math.random() * 20) - 10;
        const randomNumber2 = Math.round(Math.random() * 99) - 10;
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
                setProfileDetails({ ...profileDetails, profile_url: data.location })
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


    const handleProfileDetailsChange = ({ target }) => {
        const { name, value } = target;
        if (file) {
            setProfileDetails({
                ...profileDetails,
                profile_url: file
            });
        }
        setProfileDetails({
            ...profileDetails,
            [name]: value
        });
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        setUser({
            ...user,
            name: profileDetails.name,
            email: profileDetails.email,
            profile_url: profileDetails.profile_url
        });
        // setUser({ ...profileDetails, profile_url: file })
        setAidoState(profileDetails.profile_url);
        handleUserSubmit(profileDetails);
    }


    const progressStyling2 = {
        width: '14.8em'
    }
    const progressStyling = {
        background: 'aliceblue',
        position: 'absolute',
        top: '18.6em',
        left: '2.1em',
        width: '16em',
        padding: '0.6em',
        opacity: '0.99',
        borderRadius: '8px'
    }


    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '38em'
            }}
            className={classes.paper}
        >
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <label htmlFor="profile_url">
                            <div className={classes.imagePaper}
                                style={{
                                    background: 'linearGradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
                                    margin: 'auto',
                                    borderRadius: '1em',
                                    overflow: 'hidden',
                                }}>

                                {userProfile !== null && !file && <img key={'1'} style={{ width: '100%', height: 'inherit' }} src={`${userProfile}?${(+new Date())}`} />}
                                {file && <img key={'2'} style={{
                                    width: '16em',
                                    height: '14em'
                                }} src={`${file}?${(+new Date())}`} />}
                                <br />
                                {file === null && !userProfile && <img key={'4'} style={{
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
                            name="profile_url"
                            id="profile_url"
                            onChange={(e) => handleFile(e)}
                            style={{ display: "none" }}
                            className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Name: </InputLabel>
                        <input
                            style={{
                                width: '100%',
                                marginBottom: '1em'
                            }}
                            type="text"
                            name="name"
                            labelId="name"
                            id="name"
                            className={classes.textField}
                            value={profileDetails.name || ""}
                            onChange={handleProfileDetailsChange}
                        />
                        <InputLabel>Email: </InputLabel>
                        <input
                            style={{
                                width: '100%',
                                marginBottom: '1em'
                            }}
                            type="text"
                            name="email"
                            labelId="email"
                            id="email"
                            className={classes.textField}
                            value={profileDetails.email || ""}
                            onChange={handleProfileDetailsChange}
                        />
                    </Grid>
                </Grid>


                <br></br>
                <div style={{ float: 'right' }}>
                    <Button className={classes.buttonui} onClick={handleCloseModal}>DISCARD</Button>
                    <Button type="submit" className={classes.buttonui}
                        disabled={profileDetails.name === userName &&
                            profileDetails.email === userEmail &&
                            profileDetails.profile_url === userProfile ? true : false} >SAVE</Button>
                </div>
            </form>
        </div>
    );
}