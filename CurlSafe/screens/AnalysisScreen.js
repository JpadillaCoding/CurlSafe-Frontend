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
  const [databaseIngredients, setDatabaseIngredients] = useState(null);
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
      "Water-soluble silicones are exempt from this list. These Silicones block moisture from getting into your hair and cause build-up since they don't wash out with a co-wash. Can cause curls to straighten and weigh hair down",
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
      "These parabens can frizziness and dryness. Can also irritate the scalp and some studies found they can hinder hair growth",
      matches: parabens,
    },
    {
      id: "30",
      title: "Formaldehydes",
      description:
      "Formaldehydes can change your curl pattern. Can make your hair fragile and less elastic",
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
      "Waxes do not wash out with a co-wash, which causes build-up and weights your hair down",
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

  function trimWhitespaceQuotes(string) {
    const pattern = /^(?:\s|['"])*(.*?)(?:\s|['"])*$/;
    const trimmedString = string
      .replace(pattern, "$1")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/\s-/g, "")
      .trim();
    console.log("item: " + trimmedString + "\n");
    return trimmedString;
  }
  const resultsTrimmed = resultsArr.map((string) =>
    trimWhitespaceQuotes(string)
  );


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
              setFormaldehydes((prevFormaldehydes) => [...prevFormaldehydes,ingredient]);
            } else if (item.type === "soaps") {
              setSoaps((prevSoaps) => [...prevSoaps, ingredient]);
            } else if (item.type === "wax") {
              setWax((prevWax) => [...prevWax, ingredient]);
            } else if (item.type === "mineral-oil") {
              setMineralOil((prevMineralOil) => [...prevMineralOil, ingredient]);
            }
          }
        });
      });
    }
  }, [databaseIngredients]);

  console.log("done");

  return (
    <View style={styles.analysisScreen}>
      <Text style={styles.title}>Curl Safe</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View style={styles.matchesContainer}>
                {item.matches && item.matches.length > 0 ? (
                  item.matches.map((item, index) => {
                    return <Text style={styles.matchesText} key={index}>{`\u2022 ${item}`}</Text>;
                  })
                ) : (
                  <Text style={styles.matchesText}>No {item.title} Found!</Text>
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
    backgroundColor: "white",
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 2,
  },
  title: {
    fontFamily: "PlayfairDisplay_700Bold_Italic",
    fontSize: 36,
    textAlign: "center",
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: -2, height: 1},
    textShadowRadius: 5,
  },
  analysisScreen: {
    backgroundColor: "#455e44",
    flex: 1,
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
  headerTitle: {
    fontFamily: "RobotoCondensed_700Bold_Italic",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
    color: "#303030"
  },
  description: {
    fontFamily: "RobotoCondensed_400Regular",
    fontSize: 14,
  },
  matchesContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  matchesText: {
    fontFamily: "RobotoCondensed_400Regular",
  },
});

export default AnalysisScreen;
