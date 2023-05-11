import React, { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

const CameraScreen = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null)
  return (
    <View>
      <Camera 
      type={type}
      flashMode={flash}
      ref={cameraRef}
      >
        
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CameraScreen;
