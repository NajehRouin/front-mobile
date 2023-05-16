import { Pressable, StyleSheet, Text, Dimensions } from 'react-native'
import React from 'react'


// responsivity unite
const unite = Dimensions.get("screen").width / 100;


const MainBtn = ({onPress,containerStyle={width:"100%",height:50,backgroundColor:"red",flexDirection:"row",justifyContent:"center",alignItems:"center"},textStyle={color:"black",textAlign:"center",fontSize:20},icon=undefined, text}) => {
  return (
    <Pressable onPress={onPress} style={({pressed})=>pressed?[{...containerStyle,opacity:0.8}]:[containerStyle]} >
      <Text style={textStyle}>{text}</Text>
      {icon&&icon}
    </Pressable>
  )
}

export default MainBtn

const styles = StyleSheet.create({
    
})