import React from "react";
import { View, StyleSheet, Text } from "react-native";

const SearchScreen = () => {
  return (
      <View style={styles.searchScreenContainer}>
        <Text style={styles.searchScreenTitle}>Curl Safe</Text>
        
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
        textAlign: 'center',
        fontSize: 30,
        fontFamily: "RobotoCondensed_700Bold_Italic",
      },

});

export default SearchScreen;
