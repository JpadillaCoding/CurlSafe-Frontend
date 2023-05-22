import React from "react";
import HomeNav from "../components/HomeNav";
import { View, Text, StyleSheet } from "react-native";
import { MarckScript_400Regular } from '@expo-google-fonts/marck-script';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Curl Safe</Text>
      </View>
      <HomeNav />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    padding: 20,
    fontSize: 52,
    fontFamily: "RobotoCondensed_700Bold_Italic",
  },
  container: {
    backgroundColor: "#fbd029",
    flex: 1,
  },  
});

export default HomeScreen;
