import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TabContext } from '@material-ui/lab';
import { Avatar, Grid, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import EditContact from './EditContact';
import { messaging } from "./../../init-fcm";
import editicon from './Group525.svg';
import Loader from '../common/DataLoaderGif/Loader';
import { base_url } from '../../utils/axiosInstance';


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
        background: '#EAF1F8',
        border: '2.5px solid #F2F9FF',
        borderRadius: '1em',
        width: '31em'
    },
    paper: {
        position: 'absolute',
        width: '41em',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Contacts = () => {

    useEffect(() => {
        getContacts();
        messaging.requestPermission()
            .then(async function () {
                const token = await messaging.getToken();
                console.log("token: ", token);
            })
            .catch(function (err) {
                console.log("Unable to get permission to notify.", err);
            });
        navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
    }, []);

    const [loading, setLoading] = useState(true);
    const [value, setValue] = React.useState('1');
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState({});
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [modalStyle] = React.useState(getModalStyle);

    const userToken = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    const handleEdit = (contact) => {
        setSelectedContact(contact);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    /**
     * Represents Contacts List Module
     * @module {function} Contacts List 
     */
    const getContacts = async () => {

        const user_id = userId.replace('+', '%2B');
        await axios.get(`${base_url}/api/v1/user/contact?userId=${user_id}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(
                res => {
                    if (res.data.status.code === 200) {
                        console.log('success')
                        setContacts(res.data.data);
                        setLoading(false);
                    }
                }
            ).catch(error => {
                if (error.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }

    return (
        <>

            <Grid container>
                <Grid item xs={12}>
                    <span style={{ color: '#626976', fontSize: '35px' }}>
                        Contacts
                    </span>
                    <br></br>
                    <br></br>
                </Grid>
            </Grid>
            <div className={classes.root} style={{ padding: '1em 1em 5em 1em' }}>

                <TabContext value={value}>
                    {/* <AppBar position="static">
                    <TabList onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Contacts" value="1" />
                    </TabList>
                </AppBar> */}
                    {/* <TabPanel value="1"><ContactsList /></TabPanel> */}
                    {/* <TabPanel value="2"><Groups /></TabPanel> */}
                </TabContext>
                <Grid item xs={12} md={12}>
                    <div className={classes.demo}>
                        <List>
                            {
                                loading === true ? <Loader module={'Contacts'} /> : contacts?.length === 0 ? (<h1 style={{
                                    background: '#EAF1F8',
                                    border: '2.5px solid #F2F9FF', padding: '1em'
                                }}>No Contacts found, <br></br>Import contacts from Companion App to get started!</h1>) : (
                                    contacts.map(
                                        contact => {
                                            return <ListItem style={{
                                                background: 'linear-gradient(182.87deg, rgba(255, 255, 255, 0.05) 0.69%, rgba(213, 232, 248, 0.05) 95.8%), #EBF2F8',
                                                border: '2.5px solid rgba(255, 255, 255, 0.9)',
                                                borderRadius: '1em',
                                                margin: '0 0 1em 0'
                                            }}>
                                                <Avatar alt="Travis Howard" src={contact.contact_profile_url} style={{ margin: '0 1em 0 0' }} />
                                                <ListItemText
                                                    primary={contact.contact_name}
                                                    secondary={contact.contact_phone_number}
                                                />
                                                <Grid item xs={2}>
                                                    <IconButton aria-label="Edit" onClick={() => handleEdit(contact)} style={{
                                                        border: '2.5px solid rgba(255, 255, 255, 0.4)'
                                                    }}>
                                                        <img src={editicon} style={{
                                                            width: '0.5em'
                                                        }} />
                                                    </IconButton>
                                                </Grid>
                                            </ListItem>
                                        })
                                )
                            }
                        </List>
                    </div>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    setContacts={setContacts}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <EditContact onClose={handleClose} contact={selectedContact} getContacts={getContacts} />
                </Modal>
            </div >
        </>
    )
}
export default Contacts;