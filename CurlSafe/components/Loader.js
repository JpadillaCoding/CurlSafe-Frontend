import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#8ea48e"
        />
      </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
})
export default Loader;