import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked, analyze }) => {
  return (
    <View style={styles.searchBarContainer}>
      <View
        style={clicked ? styles.searchBar_clicked : styles.searchBar_unclicked}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} color={"black"} size={20} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          selectionColor={"#8ea48e"}
          onFocus={() => setClicked(true)}
        />
        {clicked && (
          <Pressable
            onPress={() => {
              setSearchPhrase("");
            }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              size={25}
              color="black"
              style={{ padding: 1 }}
            />
          </Pressable>
        )}
      </View>
      {clicked && (
        <View>
          <TouchableOpacity
            style={styles.analyzeButton}
            onPress={() => {
              analyze()
              Keyboard.dismiss();
              setClicked(false);
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} size={36} color={"white"} />
          </TouchableOpacity>
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
    borderColor: "black",
    borderWidth: 2,
  },
  searchBar_clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "black",
    borderWidth: 2,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  analyzeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0)",
  },
  cancelButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
export default SearchBar;
