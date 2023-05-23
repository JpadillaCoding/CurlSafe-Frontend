import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import axios from "axios";

const IngredientsScreen = () => {
  const [databaseIngredients, setDatabaseIngredients] = useState(null);

  useEffect(() => {
    const ingredientDatabase = async () => {
      try {
        const response = await axios.get(
          "https://curl-safe.herokuapp.com/ingredients"
        );
        setDatabaseIngredients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    ingredientDatabase();
  }, []);
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>Curl Safe</Text>
      {
        databaseIngredients && (
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
        )
      }
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: "RobotoCondensed_700Bold_Italic",
    fontSize: 30,
    textAlign: "center",
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
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  ingredientsText: {
    fontFamily: "RobotoCondensed_400Regular",
  },
});

export default IngredientsScreen;
