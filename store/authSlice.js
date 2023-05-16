import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    // token:String,
    isLogged:false,
    userInfo:null,
    isLoading:true
}

const authSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
         loginHandler: (state,action)=>{
            state.isLogged=true
            state.userInfo=action.payload.userInfo
            state.isLoading=false;
            console.log(action.payload.userInfo)
            AsyncStorage.setItem("userInfo",JSON.stringify(action.payload.userInfo))
        },
        logOutHandler: (state)=>{
            state.isLoading=false,
            state.isLogged=false,
            state.userInfo=null,
            AsyncStorage.removeItem("userInfo")
        },
        endLoading:(state)=>{
            state.isLoading=false;
        }

    }
})

export default authSlice.reducer;
export const {logOutHandler, loginHandler, endLoading}=authSlice.actions