import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { setResults } from "../slices/resultsSlice";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { Camera } from "expo-camera";
import FormData from "form-data";
import axios from "axios";
import {
  faCamera,
  faRepeat,
  faPaperPlane,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

const CameraScreen = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const retakePicture = () => {
    setImage(null);
  };

  const analyze = async () => {
    setShowLoading(true);
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });

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

  const flipCamera = () => {
    if (type === 0) {
      setType(1);
    } else {
      setType(0);
    }
  };

  const toggleFlash = () => {
    if (flash === Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.on);
    } else {
      setFlash(Camera.Constants.FlashMode.off);
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          type={type}
          flashMode={flash}
          ref={cameraRef}
          style={styles.camera}
        >
          <View style={styles.buttonContainer}>
            <Button icon={faRepeat} color={"#fbd029"} onPress={flipCamera} />
            <View style={styles.cameraContainer}>
              <Button
                icon={faCamera}
                color={"#fbd029"}
                onPress={takePicture}
                style={styles.cameraButton}
              />
            </View>
            <Button
              icon={faBolt}
              color={
                flash === Camera.Constants.FlashMode.on ? "#fbd029" : "#d7d9d7"
              }
              onPress={toggleFlash}
            />
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.camera} />
          {showLoading && <Loader />}
        </View>
      )}
      {image ? (
        <View style={styles.buttonContainer}>
          <Button icon={faRepeat} color={"#fbd029"} onPress={retakePicture} />
          <Button icon={faPaperPlane} color={"#fbd029"} onPress={analyze} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    borderColor: "red",
    borderWidth: 1,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingBottom: 20,
    borderColor: "orange",
    borderWidth: 1,
  },
  camera: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    borderColor: "blue",
    borderWidth: 1,
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "green",
    borderWidth: 1,
  },
  cameraContainer: {
    flex: 1,
    borderColor: "yellow",
    borderWidth: 1,
    justifyContent: "center",
  },
});

export default CameraScreen;
