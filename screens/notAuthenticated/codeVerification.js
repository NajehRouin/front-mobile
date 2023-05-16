import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";



//components
import BackNavigateButton from "../../components/backNavigateButton/BackNavigateButton";
import colors from "../../colors/colors";
import MainBtn from "../../components/buttons/MainBtn";
import WavesOne from "../../components/backgroundWaves/WavesOne";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../../store/authSlice";
import { REACT_APP_BASE_URL} from "../../constant"


// responsivity unite
const unite = Dimensions.get("screen").width / 100;

const CodeVerification = ({ navigation  }) => {



  const [code, setCodeUser] = useState("");
  const [err, setErr] = useState({});


  const dispatch=useDispatch()

  // Login Handler
  const localLoginHandler = async () => 
 {
    let matricule = localStorage.getItem('matricule');
   
      try{
        const loginRequest=  await axios.post(REACT_APP_BASE_URL+ "/users/infouser",{matricule})
        if(loginRequest.data.status){
 
        
          if(loginRequest.data.userInfo.codeuser ==  code){
          dispatch(loginHandler({userInfo:loginRequest.data.userInfo}))
          setErr({})
        }else{
          setErr({status:true, msg:"code ne correspand pas"})
        }
      

    } else {
     
        setErr((prev) => {
          return {
            ...prev,
            status: true,
            msg: "erreur recuperaction de donner",
          };
        });
  }}
catch(err){
  console.log(err)
}

  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <BackNavigateButton />
      <WavesOne
        customStyles={{ position: "absolute", top: 0, width: unite * 100 }}
      />
      <ScrollView
        style={{
          paddingTop: unite * 12,
          paddingHorizontal: unite * 5,
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{ alignItems: "center", flex: 1 }}
        >
          <Image
            source={require("../../assets/homePhoto.png")}
            style={styles.image}
          />

          <View style={{ alignItems: "center" }}>
            <Text style={styles.titleText}>Verifier votre Code</Text>
            <View
              style={{
                shadowColor: "rgba(200,200,200,0.2)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 3,
                width: unite * 79,
                height: 50,
                marginBottom: 20,
              }}
            ></View>


            <TextInput
              placeholder="code user"
              style={{
                ...styles.fullNameInput,
                borderColor: err.status ? colors.red : colors.lightGreyIcons,
              }}
              secureTextEntry={false}
              onChangeText={(value) => setCodeUser(value)}
            />
            {err.msg && (
              <Text
                style={{
                  color: colors.red,
                  marginVertical: 10,
                  textTransform: "uppercase",
                }}
              >
                {err.msg}
              </Text>
            )}

            <MainBtn
              onPress={localLoginHandler}
              text={"CONNECTER"}
              containerStyle={{
                width: unite * 55,
                backgroundColor: colors.blue,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
              }}
              textStyle={{
                color: "white",
                textAlign: "center",
                fontWeight: "700",
                fontFamily: "Inter-Regular",
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );

}
export default CodeVerification;

const styles = StyleSheet.create({
  image: {
    width: unite * 50,
    resizeMode: "contain",
    height: unite * 50,
    marginBottom: 30,
    borderWidth:3,
    borderStyle:"solid",
    borderColor:"black",
    borderRadius:(unite * 50)/2
  },
  titleText: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: unite * 5,
    fontFamily: "ConcertOne-Regular",
    textAlign:"center"
  },
  fullNameInput: {
    width: unite * 79,
    height: 50,
    fontSize: 14,
    textAlign: "center",
    textDecorationColor: "transparent",
    backgroundColor: "white",
    marginBottom: unite*20,
    fontFamily: "Inter-Regular",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
  },
});
