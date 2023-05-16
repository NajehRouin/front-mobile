import { StyleSheet,Modal, View, TouchableOpacity, Text} from "react-native";
import React from "react";


//icons 
import { Ionicons } from '@expo/vector-icons';
import colors from "../../colors/colors";




const CredentialModal = ({visible, onClose}) => {
  return (
    <Modal visible={visible} animationType="slide" style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems:"center", justifyContent:"center" }}>
        <TouchableOpacity onPress={onClose} style={{width:50 , position:"absolute",zIndex:1000,left:10,top:20}}>
          <Ionicons name="close-circle" size={50} color={colors.blue} />
        </TouchableOpacity>
        <Text>Nestanna fil contenue mt3 page Hedhi !</Text>
      </View>
    </Modal>
  );
};

export default CredentialModal;

const styles = StyleSheet.create({});
