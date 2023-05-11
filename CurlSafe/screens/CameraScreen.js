import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import Button from "../components/Button";
import { faCamera, faRepeat, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const CameraScreen = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const retakePicture = () => {
    setImage(null)
  }
  const analyze = () => {
    alert("yooo")
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? 
      (
        <Camera
          type={type}
          flashMode={flash}
          ref={cameraRef}
          style={styles.camera}
        ></Camera>
      ) 
      :
      (
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.camera} />
        </View>
      )}
      <View>
        {image ? 
        (
          <View style={styles.previewButtons}>
            <Button title={"Re-take"} icon={faRepeat} color={"#f7ca28"} onPress={retakePicture}/>
            <Button title={"Analyze"} icon={faPaperPlane} color={"#f7ca28"} onPress={analyze}/>
          </View>
        ) 
        :
        (
          <Button
            title={"take a picture"}
            icon={faCamera}
            color={"#f7ca28"}
            onPress={takePicture}
          />
        )}
      </View>
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
  camera: {
    height: "95%",
    width: "100%",
    borderRadius: 10,
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  }
});

export default CameraScreen;
