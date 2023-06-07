import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Curl Safe</Text>
            <FontAwesomeIcon icon={faHome} color="white" size={25}/>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 0,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 20,
        marginBottom: 5,
/*         borderColor: "red",
        borderWidth: 2, */
    },
    title: {
        fontFamily: "PlayfairDisplay_700Bold_Italic",
        fontSize: 36,
        color: "white",
        textShadowColor: "black",
        textShadowOffset: { width: -2, height: 1 },
        textShadowRadius: 5,
      },
})

export default Header