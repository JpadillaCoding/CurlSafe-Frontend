import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.js";

const SearchScreen = () => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [matchType, setMatchType] = useState(null)
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
    return newString;
  };

  const analyze = () => {
    const searchPhraseStandarized = stringHarmonization(searchPhrase);

    if (databaseIngredients) {
      let matchFound = false
      for( const item of databaseIngredients) {
        for(const ingredient of item.ingredients){
          if (searchPhraseStandarized == ingredient) {
            setMatchType(item.type);
            matchFound = true
            break;
          }
        }
        if(matchFound) {
          break;
        }
      }
      if(!matchFound) {
        setMatchType("")
      }
    }
  };

  return (
    <SafeAreaView style={styles.searchScreenContainer}>
      <Header />
      <SearchBar
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        analyze={analyze}
      />
        <View style={styles.matchContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Your search matched under the catagory: </Text>
          </View>
          <View style={styles.ingredientsContainer}>
            <Text style={styles.ingredientsText}>{matchType ? matchType : "No Match"}</Text>
          </View>
        </View>
    </SafeAreaView>
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
    fontSize: 36,
    fontFamily: "PlayfairDisplay_700Bold_Italic",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 1 },
    textShadowRadius: 5,
  },
  matchContainer: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 2,
    height: 140,
  },
  headerContainer: {
    backgroundColor: "#8ea48e",
    flex: 1,
    width: "100%",
    height: "20%",
    paddingTop: 10,

    paddingHorizontal: 20,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  headerTitle: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: '#303030'
  },
  ingredientsContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  ingredientsText: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 18,
    textAlign:"center"
  },
});

export default SearchScreen;
