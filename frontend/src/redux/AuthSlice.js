import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:null,
    error:null,
    user:null
}

const AuthSlice = createSlice({
    name:"AuthSlice",
    initialState:initialState,
    reducers:{
        SetUser:(state,action)=>{
            state.user = action.payload
        },
        Logout:(state)=>{
            state.loading=null,
            state.error=null,
            state.user=null
        }
    }
})

export const {SetUser,Logout} = AuthSlice.actions;

export default AuthSlice.reducer;