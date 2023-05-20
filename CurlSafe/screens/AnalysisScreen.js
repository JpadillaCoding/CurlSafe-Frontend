import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native/";
import { useSelector } from "react-redux";
import axios from "axios";

const AnalysisScreen = () => {
  const [sulfates, setSulfates] = useState([]);
  const [silicones, setSilicones] = useState([]);
  const [shortChainAlcohol, setShortChainAlcohol] = useState([]);
  const [parabens, setParabens] = useState([]);
  const [formaldehydes, setFormaldehydes] = useState([]);
  const [soaps, setSoaps] = useState([]);
  const [wax, setWax] = useState([]);
  const [mineralOil, setMineralOil] = useState([]);
  const DATA = [
    {
      id: "25",
      title: "Sulfates",
      description: "insert text here1",
      matches: sulfates,
    },
    {
      id: "26",
      title: "Silicones",
      description: "insert text here2",
      matches: silicones,
    },
    {
      id: "28",
      title: "Short Chain Alcohols",
      description: "insert text here3",
      matches: shortChainAlcohol,
    },
    {
      id: "29",
      title: "Parabens",
      description: "insert text here4",
      matches: parabens,
    },
    {
      id: "30",
      title: "Formaldehydes",
      description: "insert text here5",
      matches: formaldehydes,
    },
    {
      id: "31",
      title: "Soaps",
      description: "insert text here6",
      matches: soaps,
    },
    {
      id: "32",
      title: "Waxes",
      description: "insert text here7",
      matches: wax,
    },
    {
      id: "33",
      title: "Mineral Oils",
      description: "insert text here8",
      matches: mineralOil,
    },
  ];
  const results = useSelector((state) => state.results.value);
  const resultsArr = results.split(",");
  const resultsTrimmed = resultsArr.map((string) =>
    string.trim().toLowerCase()
  );
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
  useEffect(() => { //use effect is needed or too many renders error occurs
    if (databaseIngredients) {
      databaseIngredients.forEach((item) => {
        item.ingredients.forEach((ingredient) => {
          if (resultsTrimmed.includes(ingredient)) {
            if (item.type === "sulfates") {
              setSulfates((prevSulfates) => [...prevSulfates, ingredient]);
            } else if (item.type === "silicones") {
              setSilicones((prevSilicones) => [...prevSilicones, ingredient]);
            } else if (item.type === "shortChainAlcohol") {
              setShortChainAlcohol((prevShortChainAlcohol) => [...prevShortChainAlcohol, ingredient]);
            } else if (item.type === "parabens") {
              setParabens((prevParabens) => [...prevParabens, ingredient]);
            } else if (item.type === "formaldehydes") {
              setFormaldehydes((prevFormaldehydes) => [...prevFormaldehydes, ingredient]);
            } else if (item.type === "soaps") {
              setSoaps((prevSoaps) => [...prevSoaps, ingredient]);
            } else if (item.type === "wax") {
              setWax((prevWax) => [...prevWax, ingredient]);
            } else if (item.type === "mineralOil") {
              setMineralOil((prevMineralOil) => [...prevMineralOil, ingredient]);
            }
          }
        });
      });
    }
  }, [databaseIngredients]);
  

  console.log("done");

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.container}>
            <Text>{item.title}</Text>
            <View style={styles.container}>
              {item.matches && item.matches.length > 0 ? (
                item.matches.map((item, index) => {
                  return <Text key={index}>{item}</Text>;
                })
              ) : (
                <Text>No {item.title} Found!</Text>
              )}
            </View>
          </View>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    margin: 5,
    flex: 1,
    alignItems: "center",
  },
});

export default AnalysisScreen;
