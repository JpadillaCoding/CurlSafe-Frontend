import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { setResults } from "../slices/resultsSlice";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import FormData from "form-data";
import axios from "axios";
import {
  faImage,
  faRetweet,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.js";

const GalleryScreen = () => {
  const [image, setImage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    setImage(result.assets[0].uri);
  };

  const analyze = async () => {
    setShowLoading(true);
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpeg",
    });
    console.log("working on it..");
    await axios
      .post(
        "https://curl-safe.herokuapp.com/vision/analyzeImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ) // change to deployed url
      .then((res) => {
        dispatch(setResults(res.data));
        setShowLoading(false);
        navigation.navigate("AnalysisScreen");
      })
      .catch((error) => {
        console.log(error);
        alert("Analysis failed")
        navigation.navigate("HomeScreen")
      });
  };

  return (
    <>
      {image ? (
        <SafeAreaView style={styles.previewContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.imageStyle} />
            {showLoading && <Loader />}
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={pickImage} icon={faRetweet} color={"#8ea48e"} />
            <Button onPress={analyze} icon={faPaperPlane} color={"#8ea48e"} />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.chooseImageContainer}>
          <Header />
          <TouchableOpacity style={styles.chooseImagebutton} onPress={pickImage}>
            <FontAwesomeIcon icon={faImage} color={"#8ea48e"} size={70} />
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingBottom: 20,
  },
  chooseImageContainer: {
    flex: 1,
    backgroundColor: "#455e44",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  imageStyle: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  chooseImagebutton: {
    marginTop: 15,
    marginHorizontal: 25,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
  },
  buttonText: {
    fontFamily: "RobotoCondensed_700Bold_Italic",
  },
  chooseImageTitle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 36,
    fontFamily: "PlayfairDisplay_700Bold_Italic",
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: -2, height: 1},
    textShadowRadius: 5,
  },
});

export default GalleryScreen;
