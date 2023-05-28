import React from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SearchBar = ({ /* clicked, */ searchPhrase, setSearchPhrase, setClicked }) => {
    const clicked = true
  return (
    <View style={styles.searchBarContainer}>
      <View style={clicked ? styles.searchBar_clicked : styles.searchBar_unclicked}>
        <FontAwesomeIcon icon={faMagnifyingGlass} color={"black"} size={20} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            // setClicked(true); 
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
            // setClicked(false); 
            }}
          ></Button>
        </View>
      )}
      </View>
  );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
      },
      searchBar_unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
      },
      searchBar_clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
      },
});
export default SearchBar;
