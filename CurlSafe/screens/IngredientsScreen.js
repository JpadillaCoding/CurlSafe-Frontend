import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

const IngredientsScreen = () => {
  const databaseIngredients = useSelector(
    (state) => state.ingredients.ingredients
  );

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>Curl Safe</Text>
      {databaseIngredients && (
        <FlatList
          data={databaseIngredients}
          renderItem={({ item }) => {
            return (
              <View style={styles.typeContainer}>
                <View style={styles.headerContainer}>
                  <Text key={item.type} style={styles.headerTitle}>
                    {item.type}
                  </Text>
                </View>
                <View style={styles.ingredientsContainer}>
                  {item.ingredients.map((ingredient, index) => {
                    return (
                      <Text style={styles.ingredientsText} key={index}>
                        {`\u2022 ${ingredient}`}
                      </Text>
                    );
                  })}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: "PlayfairDisplay_700Bold_Italic",
    fontSize: 36,
    textAlign: "center",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 1 },
    textShadowRadius: 5,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: "#455e44",
  },
  typeContainer: {
    margin: 5,
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 2,
  },
  headerContainer: {
    backgroundColor: "#8ea48e",
    flex: 1,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  ingredientsContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "#303030",
  },
  ingredientsText: {
    fontFamily: "RobotoCondensed_400Regular",
  },
});

export default IngredientsScreen;
