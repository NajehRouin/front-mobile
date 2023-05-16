import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import React, { useState, useRef, useEffect } from "react";

// colors
import colors from "../../colors/colors";



//components
import WavesOne from "../../components/backgroundWaves/WavesOne";
import MainBtn from "../../components/buttons/MainBtn";
import CarasoulItem from "../../components/CarouselItem";


// responsivity unite
const unite = Dimensions.get("screen").width / 100;

const itemList = [
  {
    id: 1,
    title: "Reserver votre repas",
    description: "priére de réserver vos plats entre 08h30 - 09h30",
    image: require("../../assets/searchFood.png"),
  },
  {
    id: 2,
    title: "Gestion du stock",
    description: "tant que un admin tu peux mentionner votre stockage des repats",
    image: require("../../assets/searchMagasin.png"),
  },

];
const Intro = ({ navigation }) => {
  //initialize font
  const [currentCarouselItemIndex, setCurrentCarouselItemIndex] = useState(0);

  // change the carousel item index handler
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentCarouselItemIndex(viewableItems[0].index);
  }).current;

  useEffect(() => {
  }, [currentCarouselItemIndex]);



  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <WavesOne
        big={true}
        customStyles={{ position: "absolute", top: 0, width: unite * 100 }}
      />
      <View style={{ height: "70%",marginBottom:unite*12 }}>
        <FlatList
          data={itemList}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CarasoulItem
              title={item.title}
              description={item.description}
              image={item.image}
            />
          )}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            margin: 5,
            borderStyle: "solid",
            borderColor: colors.red,
            borderWidth: 1,
            backgroundColor:
              currentCarouselItemIndex == 0 ? colors.red : "transparent",
          }}
        ></View>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            margin: 5,
            borderStyle: "solid",
            borderColor: colors.red,
            borderWidth: 1,
            backgroundColor:
              currentCarouselItemIndex == 1 ? colors.red : "transparent",
          }}
        ></View>
      </View>

      <MainBtn
        onPress={(_) => navigation.navigate("fourth")}
        text={"Suivant"}
        containerStyle={styles.buttonContainer}
        textStyle={styles.textStyle}
      />
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  image: {
    width: unite * 35,
    resizeMode: "contain",
    height: unite * 45,
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: "10%",
    fontFamily: "ConcertOne-Regular",
  },
  description: {
    textAlign: "center",
    lineHeight: 25,
    marginBottom: "20%",
    fontFamily: "Inter-Regular",
    width: unite * 70,
  },
  buttonContainer: {
    backgroundColor: colors.blue,
    width: "65%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  textStyle: {
    color: "white",
    fontSize: 17,
    fontFamily: "Inter-Regular",
  },
});
