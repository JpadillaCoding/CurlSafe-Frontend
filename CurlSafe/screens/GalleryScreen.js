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
        "https://236d-2601-2c4-4600-c3b0-c91e-638c-49d-edce.ngrok-free.app/vision/analyzeImage",
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
    <View style={styles.pageContainer}>
      {image ? (
        <View style={styles.previewContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.imageStyle} />
            {showLoading && (
              <Loader />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={pickImage} icon={faRetweet} color={"#fbd029"} />
            <Button onPress={analyze} icon={faPaperPlane} color={"#fbd029"} />
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.chooseImage} onPress={pickImage}>
          <FontAwesomeIcon
            icon={faImage}
            color={"#fbd029"}
            size={70}
          />
          <Text>Choose Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingBottom: 20,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: "#fbd029",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    paddingBottom: 10,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  chooseImage: {
    backgroundColor: "white",
    marginTop: 15,
    marginHorizontal: 25,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default GalleryScreen;
