import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Tab__Nav from './authenticated/Tab__Nav'
import Stack__Nav from './notAutenticated/Stack__Nav'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { endLoading, loginHandler } from '../store/authSlice'

const NavigationWrapper = () => {

  const {isLogged,isLoading}=useSelector(state=>state.auth)
  const dispatch=useDispatch()

  useEffect(_=>{
    (async()=>{
        try{
            const userInfoAsyncStorage=await AsyncStorage.getItem("userInfo")
            if(userInfoAsyncStorage){
                dispatch(loginHandler({userInfo:JSON.parse(userInfoAsyncStorage)}))
            }else{
                dispatch(endLoading())
            }
        }catch(err){
            console.log(err)
        }

    })()
  },[])

  console.log(isLogged , "############################")
if(isLoading){
    return <View style={{flex:1, backgroundColor:"white"}}>
        
    </View>
}
  return (
<NavigationContainer>
        {isLogged?<Tab__Nav />:<Stack__Nav/>}
</NavigationContainer>
  )
}

export default NavigationWrapper

const styles = StyleSheet.create({})