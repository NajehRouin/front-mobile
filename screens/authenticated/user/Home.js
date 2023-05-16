import {  StyleSheet, Text, View } from "react-native";
import React ,{useEffect ,useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainHome from "./home/MainHome";
import Products from "./products/Products";
import { REACT_APP_BASE_URL} from "../../../constant"
const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [menuListEnter, setMenuListEnter]=useState([])
  const [menuListPrincipal, setMenuListPrincipal]=useState([])
  const [menuListDessert, setMenuListDessert]=useState([])
  const [menuListDrink, setMenuListDrink]=useState([])

  
  useEffect(_=>{
    (async ()=>{
      try{
        const menuListRequest=await axios.post(REACT_APP_BASE_URL +"/menu/get")
        if(menuListRequest.data.status){
          setMenuListEnter(menuListRequest.data.menuList.filter(ele=>ele.categorie==="entrer"))
          setMenuListPrincipal(menuListRequest.data.menuList.filter(ele=>ele.categorie==="principal"))
          setMenuListDessert(menuListRequest.data.menuList.filter(ele=>ele.categorie==="dessert"))
          setMenuListDrink(menuListRequest.data.menuList.filter(ele=>ele.categorie==="boissans"))
        }
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  const Stack=createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="Home" component={MainHome} />
      <Stack.Screen name="products" component={Products} />
    </Stack.Navigator>

  );
};

export default Home;

const styles = StyleSheet.create({});
