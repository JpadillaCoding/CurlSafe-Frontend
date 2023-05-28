import React, { useEffect } from "react";
import HomeNav from "../components/HomeNav";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../slices/ingredientsSlice";


const HomeScreen = () => {

  const dispatch = useDispatch()
  //ingredients data retrieved for use app wide via redux
  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Curl Safe</Text>
      </View>
      <HomeNav />

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    padding: 20,
    fontSize: 52,
    fontFamily: "PlayfairDisplay_700Bold_Italic",
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: -2, height: 1},
    textShadowRadius: 5,
  },
  container: {
    backgroundColor: "#455e44",
    flex: 1,
  },  
});

export default HomeScreen;
