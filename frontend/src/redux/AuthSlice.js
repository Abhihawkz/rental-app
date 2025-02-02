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
        }
    }
})

export const {SetUser} = AuthSlice.actions;

export default AuthSlice.reducer;