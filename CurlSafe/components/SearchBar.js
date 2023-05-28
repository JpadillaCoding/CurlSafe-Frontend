import React from "react";
import { View, StyleSheet, TextInput, Pressable, Text, Keyboard } from "react-native";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={clicked ? styles.searchBar_clicked : styles.searchBar_unclicked}>
        <FontAwesomeIcon icon={faMagnifyingGlass} color={"black"} size={20} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          selectionColor={'#8ea48e'}
          onFocus={() => {
            setClicked(true); 
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
          <Pressable 
          style={styles.cancelButton}
          onPress={() => {
            Keyboard.dismiss();
            setClicked(false); 
          }}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
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
        width: "100%",
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: "center",
      },
      searchBar_clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
      },
      cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0)',
      },
      cancelButtonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
});
export default SearchBar;
