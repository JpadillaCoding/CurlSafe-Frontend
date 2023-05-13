import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const GalleryScreen = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Button title={"Choose an image"} onPress={pickImage} color={"#f8b71c"} />
      {image && (<Image source={{ uri: image }} style={{ width: 200, height: 200 }} icon={{faImage}}/>)}
    </View>
  );
};

const styles = StyleSheet.create({});

export default GalleryScreen;
