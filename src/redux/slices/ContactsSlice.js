import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import initialState from '../initialState';

const userToken = localStorage.getItem("userToken");
const userId = localStorage.getItem("userId");

const contactSlice = createSlice({
    name: 'contact',
    initialState: initialState.contacts,
    reducers: {

    }
});

//actions 

//selectors

//reducers
export default contactSlice.reducer;

//thunk 
export function contactListApi() {
    return async function contactListApiThunk(dispatch) {
        console.log("contacts insider");
        await axios.get(`https://ingendynamics.com/web/user/contacts/33`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then(res => {
            console.log(res);
        });
    }
}



