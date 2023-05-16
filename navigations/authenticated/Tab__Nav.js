import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// responsivity unite
const unite = Dimensions.get("screen").width / 100;

// authenticated user screens
import Home from "../../screens/authenticated/user/Home";

//Bottom Tab Item Icons
import { Entypo, Feather } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from '@expo/vector-icons';

import colors from "../../colors/colors";
import Profile from "../../screens/authenticated/user/Profile";
import Reservations from "../../screens/authenticated/user/Reservations";


const screensInfo = [
  { name: "home", iconName: "home", text: "Accueil", component: Home },
  { name: "reservations", iconName: "archive", text: "panier", component: Reservations },
  { name: "profile", iconName: "user", text: "Profile", component: Profile },
];

const CostumTab = ({name, iconName, text, onPress, accessibilityState}) => {

  const focused=accessibilityState.selected;



  return (
    <TouchableOpacity onPress={onPress} style={{justifyContent:"center",alignItems:"center",flex:focused?1:.5, height:50,marginTop:12}}>
        <Animated.View  style={[styles.buttomTab,{backgroundColor:focused?"white":"transparent" }]}>
          {name == "home" && (
            <Entypo name={iconName} size={24} color={focused?colors.blue:"white"} />
          )}
          {name == "reservations" && (
            <Feather name={iconName} size={24} color={focused?colors.blue:"white"} />
          )}
          {name == "profile" && (
            <EvilIcons name="user" size={35} color={focused?colors.blue:"white"} />
          )}
          {name == "search" && (
            <AntDesign name={iconName} size={50} color={focused?colors.blue:"white"} />
          )}
          {focused&&text && <Text style={[styles.buttonTabText,{color:focused?colors.blue:"white",fontFamily: "ConcertOne-Regular"}]}>{text}</Text>}
        </Animated.View>
    </TouchableOpacity>
  );
};

const Tab__Nav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.blue,
          width: "95%",
          left:11,
          right:11,
          borderRadius:10,
          height:"10%",
          bottom:"1%",
          position:"absolute",
          alignItems:"center",
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        },
        tabBarLabelStyle: { fontSize: 11 },
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: "white",
      }}
    >
      {screensInfo.map((ele, index) => {
        return (
          <Tab.Screen
            key={index}
            name={ele.name}
            component={ele.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => {
                return (
                  <CostumTab
                    {...props}
                    text={ele.text}
                    iconName={ele.iconName}
                    name={ele.name}
                  />
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default Tab__Nav;

const styles = StyleSheet.create({
  buttomTab: {
    flexDirection: "row",
    alignItems: "center",
    padding:8,
    borderRadius:10,
    marginLeft:15,
    height:"100%"
  },
  buttonTabText: {
    marginLeft: 10,
  },
});
