import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
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
  faRepeat,
  faPaperPlane,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const CameraScreen = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  /* const [hasCameraPermission, setHasCameraPermission] = useState(null); */
  const [showLoading, setShowLoading] = useState(false);

  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

/*   useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []); */

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
        alert("Analysis failed")
        navigation.navigate("HomeScreen")
      });
  };

  const flipCamera = () => {
    setType(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
  };

  const toggleFlash = () => {
    if (flash === Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.on);
    } else {
      setFlash(Camera.Constants.FlashMode.off);
    }
  };

/*   if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } */

  return (
    <SafeAreaView style={styles.container}>
      {!image ? (
        <Camera
          type={type}
          flashMode={flash}
          ref={cameraRef}
          style={styles.camera}
          autoFocus={Camera.Constants.AutoFocus.on}
        >
          <View style={styles.buttonContainer}>
            <Button icon={faRepeat} color={"#8ea48e"} onPress={flipCamera} />
            <TouchableOpacity
              style={styles.cameraContainer}
              onPress={takePicture}
            >
              <View style={styles.outerCircle}>
                <View style={styles.innerCircle}></View>
              </View>
            </TouchableOpacity>
            <Button
              icon={faBolt}
              color={
                flash === Camera.Constants.FlashMode.on ? "#8ea48e" : "#E3E3E3"
              }
              onPress={toggleFlash}
            />
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.imageStyle}/>
          </View>
          {showLoading && <Loader />}
          <View style={styles.previewButtonContainer}>
            <Button icon={faRepeat} color={"#8ea48e"} onPress={retakePicture} />
            <Button icon={faPaperPlane} color={"#8ea48e"} onPress={analyze} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginHorizontal: 40,
    padding: 20,
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 0,
  },
  previewButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
    padding: 10,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 5,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  camera: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
  outerCircle: {
    width: 88,
    height: 88,
    borderRadius: 88 / 2,
    backgroundColor: "#B6B6B6",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 73,
    height: 73,
    borderRadius: 73 / 2,
    backgroundColor: "#E3E3E3",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraScreen;
