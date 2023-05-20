import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import axios from "axios";
import FormData from "form-data";
import { useDispatch } from "react-redux";
import { setResults } from "../slices/resultsSlice";
import { useNavigation } from "@react-navigation/native";
import {
  faImage,
  faRetweet,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const GalleryScreen = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation()

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
        navigation.navigate('AnalysisScreen');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.container}>
          <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.imageStyle} />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={pickImage} icon={faRetweet} color={"#fbd029"} />
            <Button onPress={analyze} icon={faPaperPlane} color={"#fbd029"} />
          </View>
        </View>
      ) : (
        <View>
          <Button
            title="Pick an image from camera roll"
            onPress={pickImage}
            icon={faImage}
            color={"#fbd029"}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingBottom: 20,
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
});

export default GalleryScreen;
