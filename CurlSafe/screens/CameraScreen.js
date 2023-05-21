import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import Button from "../components/Button";
import axios from "axios";
import FormData from "form-data";
import { useDispatch } from "react-redux";
import { setResults } from "../slices/resultsSlice";
import Loader from "../components/Loader";
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
  const [showLoading, setShowLoading] = useState(false)
  const cameraRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    setShowLoading(true)
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
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
        setShowLoading(false)
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
            <Button
              icon={faBolt}
              color={
                flash === Camera.Constants.FlashMode.on ? "#fbd029" : "white"
              }
              onPress={toggleFlash}
            />
          </View>
        </Camera>
      ) : (
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.camera} />
          {showLoading && <Loader />}
        </View>
      )}
      <View>
        {image ? (
          <View style={styles.buttonContainer}>
            <Button
              title={"Re-take"}
              icon={faRepeat}
              color={"#fbd029"}
              onPress={retakePicture}
            />
            <Button
              title={"Analyze"}
              icon={faPaperPlane}
              color={"#fbd029"}
              onPress={analyze}
            />
          </View>
        ) : (
          <View style={styles.cameraContainer}>
            <Button
              title={"take a picture"}
              icon={faCamera}
              color={"#fbd029"}
              onPress={takePicture}
              style={styles.cameraButton}
            />
          </View>
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
    height: "90%",
    width: "100%",
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default CameraScreen;
