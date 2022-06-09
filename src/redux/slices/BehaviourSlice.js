import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import initialState from '../initialState';

const userToken = localStorage.getItem("userToken");
const userId = localStorage.getItem("userId");
const behaviour_id = localStorage.getItem("behaviour_id");

let behavior_identity;
const behaviourSlice = createSlice({
    name: 'behavaiour',
    initialState: initialState.behaviour,
    reducers: {
        behaviourAdd: (state, { payload }) => {
            console.log("behaviour add state: ", state, "behaviour add payload: ", payload);
            return {
                ...state,
                behaviour_id: payload.id,
                name: payload.name,
                description: payload.description,
                image_url: payload.image_url
            }
        },
        behaviourUpdate: (state, { payload }) => {
            console.log("behaviour update state: ", state, "behaviour update payload: ", payload);
            return {
                ...state,
                name: payload.name,
                description: payload.description,
                image_url: payload.image_url,
                start_from: payload.start_from,
                repeat_sequence: payload.repeat_sequence,
                robot_id: payload.robot_id
            }
        },
        behaviourSteps: (state, { payload }) => {
            console.log("state: ", state, "payload: ", payload);
            return {
                ...state,
                steps: payload.steps
            }
        }
    }
});

//actions 
export const { behaviourAdd, behaviourUpdate, behaviourSteps } = behaviourSlice.actions;

//selectors
export const behaviourState = state => state.behaviourSlice;

//reducers
export default behaviourSlice.reducer;

export const behavior_iden = behavior_identity;

//thunk 

/**
   * Represents Update/Modify Behavior Module
   * @module {function} Update/Modify Behavior
   */
export function behaviourUpdateApi(data, behavior_id) {
    return async function behaviourUpdateApiThunk(dispatch) {
        console.log("inside Behaviour Update: ", data, behavior_id, userToken);
        await axios.put(`https://ingendynamics.com/api/v1/user/behavior/${behavior_id}?userId=${userId}`,
            {
                name: data.behavior_name,
                description: data.behavior_description,
                image_url: data.behavior_image,
                start_from: data.start_from,
                repeat_sequence: data.repeat_sequence,
                robot_id: data.robot_id
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then().catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }
}

/**
   * Represents Behavior Steps List Module
   * @module {function} Behavior Steps List
   */
export function behaviourStepsApi(data, behaviorId, robotId) {
    return async function behaviourStepsApiThunk(dispatch) {
        console.log(data, behaviorId);
        await axios.post(`https://ingendynamics.com/api/v1/user/step?robotId=${robotId}&userId=${userId}&behaviorId=${behaviorId}`,
            {
                steps: data
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
                if (res.status.code === 200) {
                    console.log('[HTTP REQUEST FULFILLED]', res);
                    const steps = res.data.data.steps;
                    dispatch(behaviourSteps({
                        steps
                    }))
                };
            }).catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }
}

export function behaviourStepsUpdateApi(data, behaviorId, robotId) {
    return async function behaviourStepsApiThunk(dispatch) {
        console.log(data, behaviorId);
        await axios.put(`https://ingendynamics.com/api/v1/user/step?robotId=${robotId}&behaviorId=${behaviorId}`,
            {
                stepList: data
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then(res => {
                if (res.status.code === 200) {
                    console.log('[HTTP REQUEST FULFILLED]', res);
                    const steps = res.data.data.steps;
                    dispatch(behaviourSteps({
                        steps
                    }))
                };
            }).catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }
}


/**
   * Represents Delete Behavior Module
   * @module {function} Delete Behavior
   */
export function behaviourDeleteApi(id, robot_id) {
    return async function behaviourDeleteApiThunk(dispatch) {


        await axios.delete(`https://ingendynamics.com/api/v1/user/behavior/${id}?robotId=${robot_id}&userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }).then().catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }
}

export function behaviourListApi() {
    return async function behaviourListApiThunk(dispatch) {
        console.log("inside behaviour list");
        await axios.get(`http://ec2-54-176-28-246.us-west-1.compute.amazonaws.com:3000/web/behavior/user/${userId}?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                return res.data.data;
            }).catch(error => {
                if (error?.response?.status === 500) {
                    alert('SERVER UNDER MAINTAINENCE, Try again!');
                }
            });
    }
}
