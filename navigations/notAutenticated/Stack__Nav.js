import { StyleSheet } from "react-native";
import React from "react";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
// not authenticated screens
import Intro from '../../screens/notAuthenticated/Intro'
import Login from '../../screens/notAuthenticated/Login'
import Verification  from '../../screens/notAuthenticated/codeVerification'


const Stack__Nav = ({onLogged}) => {

  const Stack = createNativeStackNavigator();


  return (
    <Stack.Navigator
      initialRouteName="first"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="first" component={Intro} />
      <Stack.Screen name="fourth" component={Login} />
      <Stack.Screen name="verificationcode" component={Verification}/>

    </Stack.Navigator>
  );
};

export default Stack__Nav;

const styles = StyleSheet.create({});
