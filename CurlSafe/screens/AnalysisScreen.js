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
      description:
        "Using products containing these sulfates can dry out your curls and lead to excessive dryness and frizziness in your hair.",
      matches: sulfates,
    },
    {
      id: "26",
      title: "Silicones",
      description:
        "water-soluble silicones are exempt from this list. These Silicones block moisture from getting into your hair and cause build up since they dont wash out with a co-wash. Can cause curls to straighten and weigh hair down",
      matches: silicones,
    },
    {
      id: "28",
      title: "Short Chain Alcohols",
      description:
        "These alcohols tend to make the hair dry and frizzy through stripping moisture.",
      matches: shortChainAlcohol,
    },
    {
      id: "29",
      title: "Parabens",
      description:
        "These parabens can can frizzines and dryness. Can also cause irritation to the scalp and some studies found they can hinder hair growth",
      matches: parabens,
    },
    {
      id: "30",
      title: "Formaldehydes",
      description:
        "Formaldahydes can change your curl pattern. Can make your hair fragile and less elastic",
      matches: formaldehydes,
    },
    {
      id: "31",
      title: "Soaps",
      description: "These Soaps can cause drying",
      matches: soaps,
    },
    {
      id: "32",
      title: "Waxes",
      description:
        "Waxes do not wash out with a co-wash, which causes build up and weights your hair down",
      matches: wax,
    },
    {
      id: "33",
      title: "Mineral Oils",
      description:
        "Mineral Oils weigh down your hair and are hard to remove without using sulphates",
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
  useEffect(() => {
    //use effect is needed or too many renders error occurs
    if (databaseIngredients) {
      databaseIngredients.forEach((item) => {
        item.ingredients.forEach((ingredient) => {
          if (resultsTrimmed.includes(ingredient)) {
            if (item.type === "sulfates") {
              setSulfates((prevSulfates) => [...prevSulfates, ingredient]);
            } else if (item.type === "silicones") {
              setSilicones((prevSilicones) => [...prevSilicones, ingredient]);
            } else if (item.type === "short-chain-alcohol") {
              setShortChainAlcohol((prevShortChainAlcohol) => [
                ...prevShortChainAlcohol,
                ingredient,
              ]);
            } else if (item.type === "parabens") {
              setParabens((prevParabens) => [...prevParabens, ingredient]);
            } else if (item.type === "formaldehydes") {
              setFormaldehydes((prevFormaldehydes) => [
                ...prevFormaldehydes,
                ingredient,
              ]);
            } else if (item.type === "soaps") {
              setSoaps((prevSoaps) => [...prevSoaps, ingredient]);
            } else if (item.type === "wax") {
              setWax((prevWax) => [...prevWax, ingredient]);
            } else if (item.type === "mineral-oil") {
              setMineralOil((prevMineralOil) => [
                ...prevMineralOil,
                ingredient,
              ]);
            }
          }
        });
      });
    }
  }, [databaseIngredients]);
  //mineral oil and short chain not working

  console.log("done");

  return (
    <View style={styles.analysisScreen}>
      <Text>Curl Safe</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View style={styles.matchesContainer}>
                {item.matches && item.matches.length > 0 ? (
                  item.matches.map((item, index) => {
                    return <Text key={index}>{`\u2022 ${item}`}</Text>;
                  })
                ) : (
                  <Text>No {item.title} Found!</Text>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#fbd029",
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 1,
  },
  analysisScreen: {
    backgroundColor: "white",
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#f8b71c",
    flex: 1,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  description: {
    fontSize: 12,
  },
  matchesContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});

export default AnalysisScreen;
