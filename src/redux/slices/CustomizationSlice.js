import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {url} from './../../components/common/api'

// const userId = localStorage.getItem("userId");

const customizationSlice = createSlice({
  name: "customization",
  initialState:{},
  reducers: {
    setRobotData:(state,{payload})=>{
      console.log(payload)
      return {...state,...payload}
    }
    // behaviourAdd: (state, { payload }) => {
    //   console.log(
    //     "behaviour add state: ",
    //     state,
    //     "behaviour add payload: ",
    //     payload
    //   );
    //   return {
    //     ...state,
    //     behaviour_id: payload.id,
    //     name: payload.name,
    //     description: payload.description,
    //     image_url: payload.image_url,
    //   };
    // },
    
  },
});

//actions
export const {setRobotData} = customizationSlice.actions;
//selectors
export const customizationState = (state) => state.customizationSlice;

//reducers
export default customizationSlice.reducer;

//thunk
export const  customizationSetData=(robot_id,userId)=>async(dispatch)=>{
  console.log(robot_id,userId,)
const userToken = localStorage.getItem("userToken");
  console.log(userToken);

    await axios
      .get(
        `${url}/api/v1/user/setting?userId=${userId}&robotId=${robot_id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
         console.log(res,robot_id)
        dispatch(setRobotData(res?.data?.data))
       
      })
      .catch(err=>{
        console.log(err?.response?.data)
        if(err?.response?.data?.status?.code===400){
          alert("invalid token")
        }
      })
}
// export function behaviourAddApi(data) {
//   return async function behaviourAddApiThunk(dispatch) {
//     console.log("inside Behaviour Add: ", userId);
//     const response = await axios
//       .post(
//         ` https://ingendynamics.com/web/behavior/${userId}?userId=${userId}`,
//         {
//           name: data.name,
//           description: data.description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Behaviour Add API Checkpoint: ", res);
//         const behaviour_id = res.data.data.behavior_id;
//         if (res.status === 200) {
//           console.log("behaviour ", behaviour_id);
//           dispatch(
//             behaviourAdd({
//               behaviour_id,
//             })
//           );
//           console.log("setting behaviour ls");
//           localStorage.setItem("behaviour_id", behaviour_id);
//         }
//       });
//   };
// }
