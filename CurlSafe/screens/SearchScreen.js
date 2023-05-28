import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  return (
    <View style={styles.searchScreenContainer}>
      <Text style={styles.searchScreenTitle}>Curl Safe</Text>
      <SearchBar />
    </View>
  );
};
const styles = StyleSheet.create({
  searchScreenContainer: {
    flex: 1,
    backgroundColor: "#455e44",
  },
  searchScreenTitle: {
    padding: 20,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "RobotoCondensed_700Bold_Italic",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 1 },
    textShadowRadius: 5,
  },
});

export default SearchScreen;
