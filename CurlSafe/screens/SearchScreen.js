import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const SearchScreen = () => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const databaseIngredients = useSelector(
    (state) => state.ingredients.ingredients
  );
  // why does adding curly braces to arrow function make undefined?
  const analyze = () => {
    if(databaseIngredients){
      databaseIngredients.forEach(ingredientType => {
        ingredientType.ingredients.forEach(ingredient => {
          if(searchPhrase == ingredient){
            console.log("matched: ", searchPhrase)
            console.log("to item: ", ingredient)
          }
        })
      });
    }
  };
  return (
    <View style={styles.searchScreenContainer}>
      <Text style={styles.searchScreenTitle}>Curl Safe</Text>
      <SearchBar
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        analyze={analyze}
      />
      {databaseIngredients && <Text>Hello</Text>}
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
