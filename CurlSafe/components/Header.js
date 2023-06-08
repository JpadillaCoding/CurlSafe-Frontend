import { useNavigation } from "@react-navigation/native";
import React from "react";
import {  StyleSheet, Text, TouchableOpacity } from "react-native";

const Header = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.headerContainer}>
            <Text style={styles.title} onPress={() => navigation.navigate("HomeScreen")}>Curl Safe</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginHorizontal: 20,
        marginBottom: 5,
    },
    title: {
        fontFamily: "PlayfairDisplay_700Bold_Italic",
        fontSize: 36,
        color: "white",
        textShadowColor: "black",
        textShadowOffset: { width: -2, height: 1 },
        textShadowRadius: 5,
      }
})

export default Header