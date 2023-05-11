import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

const CameraScreen = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null)

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <Camera 
      type={type}
      flashMode={flash}
      ref={cameraRef}
      style={styles.camera}
      >
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
    camera: {
        height: "100%",
        width: "100%",
        borderRadius: 20,
    }
});

export default CameraScreen;
