import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditIcon from "@material-ui/icons/Edit";
import { Grid, Modal } from '@material-ui/core';
import { ProfileEdit } from './ProfileEdit';
import { Button } from '@material-ui/core';
import { UserRadarConsumer } from '../../App';

const Profile = () => {
    const userId = localStorage.getItem("userId");
    const userToken = localStorage.getItem("userToken");
    const [entryOpen, setEntryOpen] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone_number: '',
        gender: '',
        profile_url: ''
    });


    /**
      * Represents Logged-in User Profile Module
      * @module {function} User Profile
      */
    useEffect(async () => {
        await axios.get(`https://ingendynamics.com/api/v1/user?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                console.log("res", res);
                setUser({
                    name: res?.data?.data[0]?.name,
                    email: res?.data?.data[0]?.email,
                    phone_number: res?.data?.data[0]?.phone_number,
                    gender: res?.data?.data[0]?.gender,
                    profile_url: res?.data?.data[0]?.profile_url
                });
            });
    }, []);

    const handleClose = () => {
        setEntryOpen(false);
    }

    const handleUserChange = ({ target }) => {
        const { name, value } = target;


        setUser({
            ...user,
            [name]: value
        });
    }


    /**
      * Represents Update/Modify Logged-in User Profile Module
      * @module {function} Update/Modify Profile
      */
    const userUpdateApi = (data) => {
        console.log(data);
        axios.put(`https://ingendynamics.com/api/v1/user?userId=${userId}`,
            {
                name: data.name,
                email: data.email,
                gender: data.gender,
                profile_url: data.profile_url
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then().catch(error => {
                if (error.reponse.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }

    const handleUserSubmit = (profiledata) => {
        console.log(user);
        const data = {
            ...user,
            name: user.name,
            email: user.email,
            gender: user.gender,
            profile_url: user.profile_url,
            phone_number: user.phone_number
        };
        userUpdateApi(profiledata);
        setEntryOpen(false);

    }
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <span style={{ color: '#626976', fontSize: '35px' }}>
                        Profile Details
                        <Button
                            style={{ float: 'right' }}
                            startIcon={<EditIcon style={{ color: '#626976', fontSize: 30 }} />}
                            onClick={() => {
                                setEntryOpen(true);
                            }}
                        > </Button>
                    </span>
                    <br></br>
                    <br></br>
                </Grid>
            </Grid>
            <div style={{
                width: 'max-content',
                background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
                border: '2.5px solid rgba(255, 255, 255, 0.6)',
                padding: '1em',
                borderRadius: '1em',
                margin: '1em 0'
            }}>
                <p style={{ margin: '1em 0' }}>Name: {user?.name}</p>
                <p style={{ margin: '1em 0' }}>Email: {user?.email}</p>
                <p style={{ margin: '1em 0' }}>Contact: {user?.phone_number}</p>
                {user?.gender && <p style={{ margin: '1em 0' }}>Gender: {user?.gender}</p>}

                <img src={user?.profile_url} style={{ width: "15em", height: "15em" }} />

            </div>
            <div style={{ float: 'right' }}>
            </div>
            <Modal
                open={entryOpen}
                onClose={handleClose}
                disableEnforceFocus
            >
                {entryOpen && (
                    <ProfileEdit
                        user={user}
                        userName={user.name}
                        userEmail={user.email}
                        userGender={user.gender}
                        userProfile={user.profile_url}
                        setUser={setUser}
                        handleUserChange={handleUserChange}
                        handleUserSubmit={handleUserSubmit}
                        onClose={handleClose}
                    />)}
            </Modal>
        </>
    )
}

export default Profile;