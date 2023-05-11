import React from "react";
import HomeNav from "../components/HomeNav";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View>
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
  },
});

export default HomeScreen;
