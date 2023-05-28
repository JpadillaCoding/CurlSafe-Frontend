import React from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SearchBar = ({ /* clicked, */ searchPhrase, setSearchPhrase, setClicked }) => {
    const clicked = true
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
            /* setClicked(true); */
          }}
        />
        {clicked && (
          <FontAwesomeIcon icon={faXmark} size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              /* setClicked(false); */
            }}
          ></Button>
        </View>
      )}
      </View>
  );
};

const styles = StyleSheet.create({});
export default SearchBar;
