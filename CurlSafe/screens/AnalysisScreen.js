import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native/";
import { useSelector } from "react-redux";
import axios from "axios";

const DATA = [
  {
    id: "25",
    title: "sulfate",
    description: "insert text here1",
  },
  {
    id: "26",
    title: "silicone",
    description: "insert text here2",
  },
  {
    id: "27",
    title: "siliconesWaterSoluble",
    description: "insert text here3",
  },
  {
    id: "28",
    title: "shortChainAlcohol",
    description: "insert text here4",
  },
  {
    id: "29",
    title: "parabens",
    description: "insert text here5",
  },
  {
    id: "30",
    title: "formaldehyde",
    description: "insert text here6",
  },
  {
    id: "31",
    title: "soap",
    description: "insert text here7",
  },
  {
    id: "32",
    title: "wax",
    description: "insert text here8",
  },
];

const AnalysisScreen = () => {
  const results = useSelector((state) => state.results.value);
  const resultsArr = results.split(",");
  const resultsTrimmed = resultsArr.map(string => string.trim())
  const [databaseIngredients, setDatabaseIngredients] = useState(null);
  const matches = []

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
  if(databaseIngredients) {
      databaseIngredients.forEach((item) => {
        item.ingredients.forEach((ingredient) => {
            if(resultsTrimmed.includes(ingredient)) {
                matches.push({type: item.type, ingredient})
            }
        })
      })
  }
  console.log(matches)
  console.log("done");
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        <View>
          <Text>{item.title}</Text>
        </View>;
      }}
    ></FlatList>
  );
};
const styles = StyleSheet.create({});

export default AnalysisScreen;
