import React, { useEffect } from "react";
import HomeNav from "../components/HomeNav";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../slices/ingredientsSlice";


const HomeScreen = () => {

  const dispatch = useDispatch()
  const {ingredients, error, status} = useSelector((state) => state.ingredients)
  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])
  
  console.log("ingrdients: ", ingredients )
  console.log("error: ", error)
  console.log("status: ", status)
  console.log(useSelector((state) => state.ingredients))
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
  },
  container: {
    backgroundColor: "#455e44",
    flex: 1,
  },  
});

export default HomeScreen;
