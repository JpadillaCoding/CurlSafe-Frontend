import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";

const IngredientsScreen = () => {
  const [databaseIngredients, setDatabaseIngredients] = useState(null);

  useEffect(() => {
    const ingredientDatabase = async () => {
      try {
        const response = await axios.get(
          "https://236d-2601-2c4-4600-c3b0-c91e-638c-49d-edce.ngrok-free.app/ingredients"
        );
        setDatabaseIngredients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    ingredientDatabase();
  }, []);
  console.log(databaseIngredients);
  return (
    <View style={styles.pageContainer}>
      {databaseIngredients &&
        databaseIngredients.map((item, index) => {
          return (
            <View style={styles.typeContainer}>
              <View style={styles.headerContainer}>
                <Text key={index} style={styles.headerTitle}>{item.type}</Text>
              </View>
              <View style={styles.ingredientsContainer}>
                {item.ingredients.map((ingredient, index) => {
                    return <Text style={styles.ingredientsText} key={index}>{`\u2022 ${ingredient}`}</Text>;
                })}
              </View>
            </View>
          );
        })}
    </View>
  );
};
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fbd029",
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
    backgroundColor: "#f8b71c",
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
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  ingredientsText: {
    fontFamily: "RobotoCondensed_400Regular",
  },
});

export default IngredientsScreen;
