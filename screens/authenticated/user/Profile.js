import { Button, Image, Pressable, StyleSheet, Text, View ,TextInput , TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutHandler } from '../../../store/authSlice'

import WavesOne from '../../../components/backgroundWaves/WavesOne'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../../colors/colors'
import { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'

import { REACT_APP_BASE_URL} from "../../../constant"

const Profile = () => {

    const dispatch=useDispatch()
    const { userInfo } = useSelector((state) => state.auth);
    const [image, setImage] = useState(null);
    const [fullName, setName] = useState('');
    const [email, setEmail] = useState('');
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
  
      if (!result.canceled) {
        console.log(result.assets[0].uri)
        setImage(result.assets[0].uri);
      }
    };
    const handleSubmit = async () => {
      try {
        let obj = {
          fullName ,
          email,

          
        }
        if (image){
          console.log(image)
          obj.image = "ok"
        }

const response = await axios.put(REACT_APP_BASE_URL+'/users/profile/'+userInfo.matricule, { fullName, email });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    
  const updateProfilePhoto = async () => {
    try {
        const form=new FormData()
        form.append("file",{
          name: `${Date.now()}-${image.split(".")[1]}`,
          uri: image,
          type: 'image/jpeg',
        })
        form.append("upload_preset","HamzaDev")
        const imgUploadRequest=await axios.post("https://api.cloudinary.com/v1_1/dopquir7t/image/upload",form)

      const newPhoto = {
        src:imgUploadRequest.data.secure_url
      };
      console.log(newPhoto)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex:1, paddingTop:100}}>
      <WavesOne big={true} customStyles={{position:"absolute",top:0, left:0, zIndex:0,width:"100%",height:70}} />
      <Pressable onPress={pickImage}>
        <Image source={{uri:image?image:"https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape.jpeg"}} style={{marginBottom:50,width:170,height:170, borderRadius:85, alignSelf:"center"}} />
        <Entypo name="edit" size={35} color="white" style={{borderRadius:100,borderWidth:3,borderColor:"white",position:"absolute",left:"50%",top:"50%",backgroundColor:colors.blue,padding:10,transform:[{translateX:-24},{translateY:-5}]}} />
      </Pressable>
      {image&&<Pressable onPress={updateProfilePhoto} style={{backgroundColor:colors.blue, width:"30%",height:30, alignContent:"center", justifyContent:"center", alignSelf:"center", marginVertical:20}}>
        <Text style={{color:"white", textAlign:"center"}}>UPLOAD</Text>
      </Pressable>
      }
          <View>
      <Text style={{marginBottom:40,color:"blak", fontSize:30, fontWeight:"bold", textAlign:"center"}}>{userInfo.fullName.toUpperCase()}</Text>
      <Text>Name</Text>
      <TextInput value={fullName} onChangeText={setName}
       style={{
        ...styles.inputContainer,
        ...styles.input
        }} />

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} 
       style={{
        ...styles.inputContainer,
        ...styles.input
        }}/>


      <TouchableOpacity onPress={handleSubmit} style={{alignSelf:"center",width:"60%",height:60,borderRadius:10,alignItems:"center",justifyContent:"center", backgroundColor:colors.green, flexDirection:"row"}}>
        <Text>Update Profile</Text>
      </TouchableOpacity>
    
      </View>
      <Pressable onPress={_=>dispatch(logOutHandler())} style={{alignSelf:"center",width:"60%",height:60,borderRadius:10,alignItems:"center",justifyContent:"center", backgroundColor:colors.blue, flexDirection:"row"}}>
          <Text style={{fontSize:20, color:"white"}}>DECONNECTER</Text>
          <MaterialCommunityIcons name="logout" size={24} color="white" />
      </Pressable>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({ inputContainer: {
  borderLeftWidth: 4,
  borderRightWidth: 4,
  height: 70
},
input: {
  height: 70,
  backgroundColor: '#ffffff',
  paddingLeft: 15,
  paddingRight: 15
}})