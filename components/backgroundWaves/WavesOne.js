import { StyleSheet, Text, View } from "react-native";
import React from "react";

// react expo svg
import Svg, { Path } from "react-native-svg";
import colors from "../../colors/colors";

const WavesOne = ({customStyles,big}) => {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: colors.blue, height: big?210:170 }}>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: big?190:160 }}
        >
          <Path fill={colors.blue} fill-opacity="1" d="M0,160L26.7,154.7C53.3,149,107,139,160,160C213.3,181,267,235,320,261.3C373.3,288,427,288,480,282.7C533.3,277,587,267,640,229.3C693.3,192,747,128,800,85.3C853.3,43,907,21,960,26.7C1013.3,32,1067,64,1120,112C1173.3,160,1227,224,1280,213.3C1333.3,203,1387,117,1413,74.7L1440,32L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></Path>
        </Svg>
      </View>
    </View>
  );
};

export default WavesOne;

const styles = StyleSheet.create({});
