import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import axios from 'axios';
import S3 from "react-aws-s3";
import Group555 from './Group555.svg';
import Progressbar from '../../utils/Progressbar';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';




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
        borderRadius: '1em',
        border: 'none',
        background: 'linear-gradient(108.16deg, #FFFFFF -11.47%, #E9F1F8 33.17%, #D5E4F1 100.86%)'
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'linear-gradient(108.16deg, #FFFFFF - 11.47 %, #E9F1F8 33.17 %, #D5E4F1 100.86 %)',
    },
    paper: {
        border: '2.5px solid #F2F9FF',
        borderRadius: '1.5em',
        color: '#747C8B',
        background: '#EAF1F8',
        borderRadius: '1.5em',
        padding: '1em 2em'
    },
    label: {
        textAlign: 'center',
        margin: '3em 0 0 0',
        color: '#747C8B',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '0.00310565px'
    },
    textField: {
        margin: '1em 0 0 0',
        background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8',
        boxShadow: 'inset 2px 2px 3px #bfd3e5, inset -2px -2px 6px rgb(255 255 255 / 80%)',
        borderRadius: '10px',
        border: 'none',
        padding: '0.5em',
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
        margin: '2em 0.5em 0.5em 0.5em'
    }
}));


function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

const EditContact = ({ contact, onClose, getContacts, setContacts }) => {
    console.log(contact)
    const [openSBar, setOpenSBar] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [contactState, setContactState] = useState({
        name: !contact.contact_name ? null : contact.contact_name,
        gender: !contact.contact_gender ? null : contact.contact_gender,
        phone_number: !contact.contact_phone_number ? null : contact.contact_phone_number,
        email: !contact.contact_email ? null : contact.contact_email,
        profile_url: !contact.contact_profile_url ? null : contact.contact_profile_url
    });
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState();
    const [perc, setPerc] = useState(null);

    const handleFile = async (e) => {
        console.log("file insider", e.target.name);
        const randomNumber = Math.round(Math.random() * 20) - 10;
        const random2 = Math.round(Math.random() * 20) - 10;
        const newFileName = `web/${randomNumber}${random2}` + `${e.target.name}`;
        readFile(e.target.files[0]);
        console.log(newFileName.Location);
        await ReactS3Client.uploadFile(e.target.files[0], newFileName)
            .then((data) => {
                console.log(data);
                setFile(data.location);
                setContactState({ ...contactState, profile_url: data.location });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function readFile(file) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const result = event.target.result;
        });

        reader.addEventListener('progress', (event) => {
            if (event.loaded && event.total) {
                const percent = (event.loaded / event.total) * 100;
                console.log(`Progress: ${Math.round(percent)} `);
            }
        });
        reader.readAsDataURL(file);
    }

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);

    const userToken = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    /**
    * Represents update contacts Module
    * @module {function} update contact 
    */
    const updateContact = async (id, data) => {
        console.log(data, id);
        await axios.put(`https://ingendynamics.com/api/v1/user/contact/${id}?userId=${userId}`, {
            name: data.name,
            gender: data.gender,
            phone_number: data.phone_number,
            email: data.email,
            profile_url: data.profile_url
        },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(
                res => {
                    if (res.data.status.code === 200) {
                        alert('Contact updated!');
                    }
                }
            ).catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }

    const handleClose = () => {
        onClose();
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;
        console.log(name, value)
        setContactState({
            ...contactState,
            [name]: value
        });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: contactState.name,
            phone_number: contactState.phone_number,
            email: contactState.email,
            gender: contactState.gender,
            profile_url: contactState.profile_url
        }
        updateContact(contact.contact_id, data);
        setTransition(() => TransitionRight);
        setOpenSBar(true);
        getContacts();
        onClose();
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


    const handleBarClose = () => {
        setOpenSBar(false);
    };

    return (
        console.log(file),
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '56em'
            }} className={classes.paper}>
                <h1>Edit Contact</h1>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <p style={{ margin: '0px 0 -11px 0' }}>Profile Picture</p>
                            <br></br>
                            <label htmlFor="profile_url">
                                <div className={classes.imagePaper}
                                    style={{
                                        background: 'linearGradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
                                        margin: 'auto',
                                        borderRadius: '1em',
                                        overflow: 'hidden',
                                    }}>

                                    {contactState.profile_url !== null && !file && <img key={'1'} style={{ width: '14em', height: 'inherit' }} src={`${contactState.profile_url}?${(+new Date())}`} />}
                                    {file && <img key={'2'} style={{
                                        width: '16em',
                                        height: '14em'
                                    }} src={`${file}?${(+new Date())}`} />}
                                    <br />
                                    {file === null && !contactState.profile_url && <img key={'4'} style={{
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
                            <p style={{ margin: '0px 0 -11px 0' }}>Name</p>
                            <input
                                className={classes.textField}
                                style={{ marginBottom: '1em' }}
                                placeholder="Name"
                                name="name"
                                value={contactState.name || ''}
                                onChange={handleChange}
                            />
                            <p style={{ margin: '0px 0 -11px 0' }}>Email</p>
                            <input
                                className={classes.textField}
                                style={{ marginBottom: '1em' }}
                                placeholder="Email Address"
                                name="email"
                                type="email"
                                value={contactState.email}
                                onChange={handleChange}
                            />
                            <p style={{ margin: '0px 0 -11px 0' }}>Gender</p>

                            <select
                                className={classes.textField}
                                style={{ marginBottom: '1em' }}
                                name="gender"
                                id="gender"
                                value={contactState.gender}
                                onChange={handleChange}
                            >
                                <option selected disabled value hidden>Choose</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                        </Grid>
                    </Grid>

                    <div style={{ float: 'right' }}>
                        <Button
                            className={classes.buttonui}
                            onClick={() => onClose()}>DISCARD</Button>
                        <Button
                            className={classes.buttonui}
                            type="submit">SAVE</Button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditContact;
