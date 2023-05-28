import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={clicked ? styles.searchbar_clicked : styles.searchbar_unclicked}>
        <FontAwesomeIcon icon={faMagnifyingGlass} color={"black"} size={20} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default SearchBar;
