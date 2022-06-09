import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import useStyles from "./styles";
import StatBackdropModal from "../common/Modal/StatBackdropModal";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { loginApi, loginCheckSelector } from "../../redux/slices/LoginSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Classes from './Login.module.css';
import logo from './logo.png';


const Login = () => {
  const [number, setNumber] = useState();
  const [open, setOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [timer, setTimer] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginState = useSelector(loginCheckSelector);

  /**
 * Represents Login Module 
 * @module {function} Log in 
 */
  const hitLogin = (number) => {
    axios.post("https://ingendynamics.com/api/v1/user?type=web",
      {
        phone_number: number
      })
      .then(res => {
        const minutes = new Date().getMinutes();
        const hour = new Date().getHours();
        console.log(res);
        if (res.data.status.code === 200) {
          setLoginSuccess(true);
          const state = {
            request_id: res.data.data.request_id,
            phone_number: number,
            hour: hour,
            minutes: minutes,
          }
          history.push('/verify', state);
        }
      }).catch(err => {
        console.log(err)
        if (err?.response?.data?.status?.code === 404) {
          alert("Entered phone number is not registered with Control Center!");
          setOpen(false);
        } else if (err && err?.response?.status === 500) {
          alert('Too many attempts, try again after 5 minutes!');
        }
      });
  }

  const handleSuccess = () => {
    console.log(number);
    hitLogin(number);

    console.log(loginState);
    if (loginSuccess === true) {
      history.push('/verify');
    } else if (loginSuccess === false) {
      setOpen(false);
      alert('Entered phone number is not registered with Control Center!');
    }
  }

  const handleFailure = () => {
    setOpen(false);
  };

  const modal = {
    title: "Phone Number confirmation!",
    body: "Is entered number correct?",
    success: "Yes",
    failure: "No",
    number,
  };

  return (
    console.log(loginState),
    <>
      <div className={Classes.root}>
        <div className={classes.container}>
          <div>
            <img src={logo} style={{ margin: '0 0 2em 0' }} />
            <h2
              style={{
                fontFamily: 'Montserrat `',
                fontStyle: 'normal',
                fontWeight: ' 500',
                fontSize: ' 25px',
                lineHeight: ' 30px',
                display: ' flex',
                alignItems: ' center',
                color: '#747C8B',
              }}>Aido Control Center</h2>
            <h4
              style={{
                color: 'rgba(116, 124, 139, 0.6)',
                fontSize: '15px'
              }}>
              Manage your robots
            </h4>
          </div>
          <label
            className={classes.label}>Phone number</label>
          <PhoneInput
            placeholder="XX-XXXX-XXXX"
            value={number}
            defaultCountry="US"
            // className={classes.phone}
            onChange={(value) => {
              setNumber(value);
              console.log(number);
            }}
          />
          <br></br>
          <Button
            className={Classes.buttonui}
            variant="contained"
            onClick={(e) => setOpen((s) => !s)}
            disabled={!number}
            disableElevation
          >LOGIN</Button>
        </div>
        {open && (
          <StatBackdropModal
            open={open}
            handleSuccess={handleSuccess}
            handleFailure={handleFailure}
            modal={modal}
          />
        )}
      </div>
    </>
  );
};

export default Login;
