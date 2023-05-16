import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React from "react";
import Slideshow from "react-native-image-slider-show";
import dataSource from "../../../../homeSliderInfo/info";
import colors from "../../../../colors/colors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import axios from "axios";
import MenuItem from "../../../../components/MenuItem";
import { REACT_APP_BASE_URL } from "../../../../constant"
const MainHome = ({ navigation }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const showHeader = useRef(new Animated.Value(1)).current;
  const [renderHeader, setRenderHeader] = useState(true);



  const filterOptions = ["TOUS", "Entrer", "Principal", "Dessert", "Boissans"];
  const filterDays = ["Lun", "Mar", "Merc", "Jeud", "Vend", "Sam", "Dim"];
  const [currentFilterOption, setCurrentFilterOption] = useState(0)
  const [currentDay, setCurrentDay] = useState(0)

  const [productList, setProductList] = useState([])

  const returnDay = () => {
    console.log(currentDay)
    let day = "Lun"
    switch (currentDay) {
      case 0:
        day = "Lun"
        break;
      case 1:
        day = "Mar"
        break;
      case 2:
        day = "Merc"
        break;
      case 3:
        day = "Jeud"
        break;
      case 4:
        day = "Vend"
        break;
      case 5:
        day = "Sam"
        break;
      case 6:
        day = "Dim"
        break;
      default:
        day = "Lun"
    }
    console.log(day)
    return day;
  }
  useEffect(_ => {
    (async () => {
      try {
        Animated.timing(showHeader, {
          toValue: 0,
          useNativeDriver: true,
          duration: 3000,
        }).start((_) => {
          setRenderHeader(false);
        });
        const menuListRequest = await axios.get(REACT_APP_BASE_URL + "/menu/get/" + returnDay())
        console.log(menuListRequest.status, menuListRequest.data)
        if (currentFilterOption === 0) {
          if (menuListRequest.data && menuListRequest.data.menuList) {
            setProductList(menuListRequest.data.menuList)
            console.log("menuListRequest.data.menuList", menuListRequest.data)
          }
        } else {
          if (menuListRequest.data && menuListRequest.data.menuList) {
            setProductList(menuListRequest.data.menuList.filter(ele => ele.categorie.toLowerCase().trim() === filterOptions[currentFilterOption].trim().toLocaleLowerCase()))
          }
        }

      } catch (err) {
        console.log(err)
      }
    })()
  }, [currentFilterOption, currentDay])



  return (
    <View style={{ width: "100%", alignItems: "center", height: "90%" }}>
      <ScrollView style={{ width: "100%", flex: 1, height: "100%" }}>
        {renderHeader && (
          <Animated.View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 30,
              flex: 1,
              opacity: showHeader,
              position: "absolute",
              top: 0,
              zIndex: 1000,
              width: "80%",
              marginLeft: 30,
              marginRight: 30
            }}
          >
            <View
              style={{
                borderRadius: 20,
                alignSelf: "center",
                width: "80%",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.green,
                height: 50,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Salut : </Text>
              <Text style={{ fontSize: 13, color: "white" }}>
                {userInfo.fullName.toUpperCase()}
              </Text>
              <Image
                source={require("../../../../assets/hello.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </Animated.View>
        )}
        <View style={{ width: "100%", marginVertical: 30 }}>
          <Slideshow index={2} dataSource={dataSource} />
        </View>
        <ScrollView style={{ flexDirection: "row", marginBottom: 40 }} horizontal showsHorizontalScrollIndicator={false}>
          {filterDays.map((ele, index) => {
            return <TouchableOpacity onPress={setCurrentDay.bind(null, index)} key={index} style={{ margin: 5, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 5, backgroundColor: currentDay == index ? colors.blue : "transparent" }}>
              <Text style={{ fontSize: currentDay == index ? 16 : 16, fontWeight: currentDay === index ? "bold" : "normal", color: currentDay === index ? "white" : "black" }}>{ele}</Text>
            </TouchableOpacity>
          })}
        </ScrollView>
        <ScrollView style={{ flexDirection: "row", marginBottom: 40 }} horizontal showsHorizontalScrollIndicator={false}>
          {filterOptions.map((ele, index) => {
            return <TouchableOpacity onPress={setCurrentFilterOption.bind(null, index)} key={index} style={{ margin: 5, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 5, backgroundColor: "transparent" }}>
              <Text style={{ fontSize: currentFilterOption == index ? 16 : 16, fontWeight: currentFilterOption === index ? "bold" : "normal", color: currentFilterOption === index ? colors.blue : "black" }}>{ele}</Text>
            </TouchableOpacity>
          })}
        </ScrollView>
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
        }}
        >

          {productList && productList.length > 0 && productList.map((ele, index) => <MenuItem categorie={ele.categorie} _id={ele._id} title={ele.title} price={ele.price} photo={ele.photo} />)}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainHome;

const styles = StyleSheet.create({});
