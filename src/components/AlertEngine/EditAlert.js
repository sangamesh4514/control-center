import { makeStyles, Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';

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
}));

const EditAlert = ({ onClose, alertDetail, userid, getAlerts }) => {
    console.log(alertDetail)
    const userToken = localStorage.getItem("userToken");
    const [modalStyle] = useState(getModalStyle);
    const Classes = useStyles();


    const [alertState, setAlertState] = useState({
        alertvalue: !alertDetail.value ? null : alertDetail.value,
        status: !alertDetail.status ? 0 : alertDetail.status
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        console.log(name, value);
        setAlertState({
            ...alertState,
            [name]: value
        });
    }

    const updateApi = (data, id, robotid, userid) => {
        console.log(data);
        axios.put(`https://ingendynamics.com/api/v1/user/alert/${id}?robotId=${robotid}&userId=${userid}`,
            {
                status: data.status,
                value: data.value
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(console.log('Updated Alert!'));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            status: alertState.status,
            value: alertState.alertvalue
        }
        updateApi(data, alertDetail.id, alertDetail.robot_id, userid);
        getAlerts();
        onClose();
    }

    return (
        console.log('[DATA CHANGED]', alertState),
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '38em'
            }} className={Classes.paper}>
                <h1>Edit Alert</h1>
                <form onSubmit={handleSubmit}>

                    <label for="alertvalue">Value</label>
                    <br></br>
                    <input type="text" name="alertvalue" className={Classes.textField} value={alertState.alertvalue || ""} onChange={handleChange} />

                    <br></br>

                    <label for="status">Status</label>
                    <br></br>

                    <select name="status" value={alertState.status} className={Classes.textField} onChange={handleChange}>
                        <option hidden disabled selected value>Choose Status</option>
                        <option value={'1'}>ON</option>
                        <option value={'0'}>OFF</option>
                    </select>
                    <br></br>
                    <div style={{ float: 'right' }}>
                        <Button type="submit" className={Classes.buttonui}>SAVE</Button>
                        <Button className={Classes.buttonui} onClick={() => onClose()}>DISCARD</Button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default EditAlert;