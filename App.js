import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React from "react";


import { useFonts } from "expo-font";
import { Provider} from "react-redux";
import 'localstorage-polyfill'; 

import store from "./store/store";
import NavigationWrapper from "./navigations/NavigationWrapper";

const costumFonts = {
  "ConcertOne-Regular": require("./fonts/ConcertOne-Regular.ttf"),
  "Inter-Regular": require("./fonts/Inter-Regular.ttf"),
};

const App = () => {
  const [font] = useFonts(costumFonts);


  console.log(font)
  if (!font) {
    return (
      <View>
        <Text>Wait ...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
    <View style={{ flex: 1 }}>
      <StatusBar />
      <NavigationWrapper />
    </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
