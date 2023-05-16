import { TouchableOpacity, View } from "react-native";
import React from "react";

// icons
import { Ionicons } from "@expo/vector-icons";
import colors from "../../colors/colors";

//react navigation
import { useNavigation } from "@react-navigation/native";

const BackNavigateButton = ({onPress}) => {

  const navigation=useNavigation()

  return (
    <TouchableOpacity
    onPress={_=>{
      onPress?onPress():navigation.goBack()
    }}
      style={{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.blue,
        borderRadius: 25,
        position:"absolute",
        left:15,
        top:40,
        zIndex:1000
      }}
    >
      <Ionicons name="arrow-back" size={35} color="white" />
    </TouchableOpacity>
  );
};

export default BackNavigateButton;
