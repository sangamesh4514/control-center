// This file is not in use now!
import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";
import axios from "axios";


const verifySlice = createSlice({
  name: 'verify',
  initialState: initialState.verify,
  reducers: {
    verifySuccess: (state, { payload }) => {
      console.log('[verify state slice]', state)
      return {
        ...state,
        userId: payload.userId,
        accessToken: payload.accessToken,
        wrongOtp: payload.wrongOtp
      }
    }
  }
});

//actions
export const { verifySuccess } = verifySlice.actions;

//selectors
export const verifyState = state => state.VerifySlice;

//reducers
export default verifySlice.reducer;


//thunk 
export function verifyApi(otp, loginState) {
  return async function verifyApiThunk(dispatch) {

    await axios
      .post(
        "https://ingendynamics.com/api/v1/user/verify?type=web",
        {
          request_id: loginState?.request_id,
          code: otp,
          phone_number: loginState?.phone_number,
        }
      )
      .then(async (res) => {
        console.log(res);
        const userId = res.data.data.user_id;
        const accessToken = res.data.data.tokens.accessToken;
        const wrongOtp = false;
        dispatch(
          verifySuccess({
            userId,
            accessToken,
            wrongOtp
          })
        );
        localStorage.setItem("userToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("wrongOtp", false);
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        await axios
          .get(
            `https://ingendynamics.com/api/v1/user/session?userId=${userId}&type=web`,
            options
          )
          .then((res) => {
            console.log(res);
            localStorage.setItem("session", JSON.stringify(res?.data?.data));
          }).catch(error => console.log(error.response.data))
      }).catch(err => {
        console.log(err.response.data)
        const userId = '';
        const accessToken = '';
        const wrongOtp = true;
        dispatch(
          verifySuccess({
            userId,
            accessToken,
            wrongOtp
          })
        );
        if (err?.response?.data?.status.code === 500) {
          alert('Invalid OTP, try again with valid OTP');
        }
        //  else if (err) {
        //   alert('Phone Number is not registered on Aido!');
        // }
      })
  }
}



  // const ws = await new WebSocket(
  //               `wss://ec2-54-176-28-246.us-west-1.compute.amazonaws.com:3000/?web`
  //             );
  //             ws.onopen = () => {
  //               // connection opened
  //               // ws.send('something');
  //             };
  //             ws.onmessage = (e) => {
  //               // a message was received
  //               try {
  //                 setSocketId(e.data.websocketId);
  //                 localStorage.setItem(
  //                   "websocketId",
  //                   JSON.parse(e.data).websocketId
  //                 );
  //               } catch (error) {
  //                 console.log("Error in saving the socket id");
  //               }
  //                   ws.send(
  //                  JSON.stringify({
  //                    caller_id:JSON.parse(e.data).websocketId,
  //                    receiver_id: robotListData[robotId].ws_id,
  //                    call_status: "calling....................",
  //                    user_role: robotListData[robotId].user_role,
  //                    caller_name: "sangamesh",
  //                  })
  //                )
  //             };
  //              ws.onerror = (e) => {
  //                // an error occurred
  //                console.log("web socket error", e.message);
  //              };
  //              ws.onclose = (e) => {
  //                // connection closed
  //                console.log(e.code, e.reason);
  //              };