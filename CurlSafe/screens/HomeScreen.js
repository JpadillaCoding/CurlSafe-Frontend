import React, { useEffect } from "react";
import HomeNav from "../components/HomeNav";
import { View, Text, StyleSheet,SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../slices/ingredientsSlice";
import { Camera } from "expo-camera";
import RNExitApp from 'react-native-exit-app'
import { Alert } from "react-native";

const HomeScreen = () => {

  const dispatch = useDispatch()
  //ingredients data retrieved for use app wide via redux
  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  useEffect(() => {
    requestPermissions()
  },[])

  const requestPermissions = async () => {
    const { statusCamera } = await Camera.requestCameraPermissionsAsync()
    if(statusCamera !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera and Photo gallery permission are needed to able to analyze text in photos.',
        [
          {text: 'OK', onPress: () => requestPermissions },
        ]
      )
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Curl Safe</Text>
      </View>
      <HomeNav />

    </SafeAreaView>
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
