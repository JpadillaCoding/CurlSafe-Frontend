import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const SearchScreen = () => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [matchType, setMatchType] = useState(null)
  const [matchIngredient, setMatchIngredient] = useState(null)
  const databaseIngredients = useSelector(
    (state) => state.ingredients.ingredients
  );
  // why does adding curly braces to arrow function make undefined? ^
  const stringHarmonization = (string) => {
    const regex = /^-+|-+$/g;
    const newString = string
      .replace(regex, " ")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
    console.log(newString);
    return newString;
  };

  const analyze = () => {
    const searchPhraseStandarized = stringHarmonization(searchPhrase);

    if (databaseIngredients) {
      databaseIngredients.forEach((item) => {
        item.ingredients.forEach((ingredient) => {
          if (searchPhraseStandarized == ingredient) {
            setMatchType(item.type);
            setMatchIngredient(ingredient)
            //add break here
          }
        });
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
      {matchType && (
        <View>
          <View>
            <Text>{matchType}</Text>
          </View>
          <View>
            <Text>{matchIngredient}</Text>
          </View>
        </View>
      )}
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
