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

const GalleryScreen = () => {
  const [image, setImage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
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
      });
  };

  return (
    <>
      {image ? (
        <View style={styles.previewContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.imageStyle} />
            {showLoading && <Loader />}
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={pickImage} icon={faRetweet} color={"#fbd029"} />
            <Button onPress={analyze} icon={faPaperPlane} color={"#fbd029"} />
          </View>
        </View>
      ) : (
        <View style={styles.chooseImageContainer}>
          <Text style={styles.chooseImageTitle}>Curl Safe</Text>
          <TouchableOpacity style={styles.chooseImagebutton} onPress={pickImage}>
            <FontAwesomeIcon icon={faImage} color={"#fbd029"} size={70} />
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#fbd029",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
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
    fontSize: 30,
    fontFamily: "RobotoCondensed_700Bold_Italic",
  },
});

export default GalleryScreen;
