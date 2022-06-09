import { TextField, Button, Typography, Container } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import StatBackdropModal from "../../common/Modal/StatBackdropModal";
import useStyles from "./styles";
import { verifyApi } from "../../../redux/slices/VerifySlice";
import { useDispatch, useSelector } from "react-redux";
import { verifyState } from "../../../redux/slices/VerifySlice";
import axios from "axios";


/**
* Represents Login Verification Module
* @module {function} Login OTP Verify
*/
const Verify = () => {

  const [otp, setOtp] = useState();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const login_State = history?.location.state;
  const [otpTime, setOtpTime] = useState({
    hour: login_State?.hour,
    minutes: login_State?.minutes
  });
  const [verifyState, setVerifyState] = useState({
    request_id: login_State?.request_id,
    code: otp,
    phone_number: login_State?.phone_number
  });
  console.log(login_State);

  const modal = {
    title: "",
    body: "Are your sure?",
    success: "Yes",
    failure: "No",
  };


  const route = () => {
    // setTimeout(() => {
    history.push('/');
    // }, 2000);
  }

  const verifyAPI = async () => {
    await axios.post(
      "https://ingendynamics.com/api/v1/user/verify?type=web",
      {
        request_id: verifyState.request_id,
        code: verifyState.code,
        phone_number: verifyState.phone_number,
      }
    ).then(async (res) => {
      console.log(res);
      const userId = res?.data?.data.user_id;
      const accessToken = res?.data?.data.tokens.accessToken;
      localStorage.setItem("userToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("wrongOtp", false);

      history.push('/dashboard');

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios
        .get(
          `https://ingendynamics.com/api/v1/user/session?userId=${userId}`,
          options
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem("session", JSON.stringify(res.data.data));
        }).catch(error => console.log(error.response.data))
    }).catch(err => {
      console.log(err.response.data)
      if (err?.response?.data?.status.code === 500) {
        alert('Invalid OTP, try again with valid OTP');
      }
    })
  }

  const handleResendOTP = () => {
    setVerifyState({
      phone_number: login_State?.phone_number,
      code: null,
      request_id: null
    });
    axios.post("https://ingendynamics.com/api/v1/user?type=web",
      {
        phone_number: login_State?.phone_number
      })
      .then(res => {
        const minutes = new Date().getMinutes();
        const hour = new Date().getHours();
        console.log(res);
        if (res.data.status.code === 200) {
          setVerifyState({
            phone_number: login_State?.phone_number,
            request_id: res.data.data.request_id
          })
          setOtpTime({
            hour: hour,
            minutes: minutes,
          })
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

  const handleOtp = () => {
    verifyAPI();
    // if (invalidAccess === false) {
    //   history.push('/dashboard');
    // }
  }

  const handleSuccess = (e) => setOpen((s) => !s);

  const handleFailure = () => {
    history.push('/');
  };

  const setVerifyOTP = (otp_code) => {
    setOtp(otp_code);
    setVerifyState({ ...verifyState, code: otp_code });
  }

  return (
    <>
      <div className={classes.container}>
        <Container>
          <Typography className={classes.text} variant="h4">
            Verify the OTP
          </Typography>
          <label className={classes.label}>Enter the OTP sent to {login_State?.phone_number}</label>
          <br></br>
          <input
            className={classes.textField}
            variant="standard"
            value={otp}
            onChange={(e) => setVerifyOTP(e.target.value)}
            InputProps={{
              className: classes.input,
            }} />
          {otpTime.hour ? <span style={{ fontSize: '0.8em', margin: '0 6.4em', textAlign: 'right' }}><i> OTP is valid until {`${otpTime.hour}:${otpTime.minutes + 5}`}!</i></span> : null}
          <br></br>
          <br></br>
          <div className={classes.buttons}>
            <Button
              className={classes.resend}
              color="primary"
              disableElevation
              onClick={handleResendOTP}
            >
              Resend
            </Button>
            <Button
              className={classes.resend}
              color="primary"
              disableElevation onClick={handleOtp}>
              Verify
            </Button>
          </div>
        </Container>
        {open && (
          <StatBackdropModal
            open={open}
            handleSuccess={handleFailure}
            handleFailure={handleSuccess}
            modal={modal}
          />
        )}
      </div>
    </>
  );
};

export default Verify;
