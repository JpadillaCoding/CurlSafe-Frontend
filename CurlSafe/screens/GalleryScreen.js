import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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

    setImage(result.assets);
  };
  let imagePreview = <Text style={styles.previewText}>No image taken yet</Text>;

  if (image) {
    imagePreview = (
      <Image source={{ uri: image[0].uri }} style={styles.imageStyle} />
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Pick an image from camera roll"
        onPress={pickImage}
        icon={faImage}
        color={"#fbd029"}
      />
      {imagePreview}
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});

export default GalleryScreen;
