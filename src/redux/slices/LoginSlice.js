import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import initialState from '../initialState';

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState.login,
    reducers: {
        loginSuccess: (state, payload) => {
            console.log("state: ", state, "payload: ", payload);
            return {
                ...state,
                request_id: payload.request_id,
                phone_number: payload.phone_number,
                success: payload.success
            }
        }
    }
});

//actions 
export const { loginSuccess } = loginSlice.actions;

//selectors
export const loginCheckSelector = state => state.LoginSlice;

//reducers
export default loginSlice.reducer;

//thunk 
export function loginApi(number) {
    return function loginApiThunk(dispatch) {
        console.log(number)
        axios.post("https://ingendynamics.com/api/v1/user?type=web",
            {
                phone_number: number
            })
            .then(res => {
                let success;
                let request_id;
                let phone_number;
                console.log(res)
                const status = res.data.status;
                // if (res.status === 404) {
                //     console.log("404")
                //     success = false;
                //     request_id = null;
                //     phone_number = null;
                //     dispatch(loginSuccess({ request_id, phone_number, success }));
                // } else 
                if (status === 200) {
                    console.log("200")
                    const payload = {
                        request_id: res.data.data.request_id,
                        phone_number: number,
                        success: true,
                    }
                    dispatch(loginSuccess(payload));
                }
            })
            .catch(error => {
                console.log(error)
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                } else if (error?.response?.status.code === 404) {
                    alert('Incorrect number, Try again!');
                }
            });
    }
}



