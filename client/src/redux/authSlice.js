import {createSlice} from "@reduxjs/toolkit";


const authSlice=createSlice({

name:"auth",


initialState:{

token:localStorage.getItem("token"),

name:localStorage.getItem("name"),

role:localStorage.getItem("role")

},


reducers:{


login:(state,action)=>{


state.token=action.payload.token;

state.name=action.payload.name;

state.role=action.payload.role;



},



logout:(state)=>{


state.token=null;

state.name=null;

state.role=null;


localStorage.clear();


}



}


});


export const {
login,
logout

}=authSlice.actions;


export default authSlice.reducer;