import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Button = ({title, onPress, icon, color}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <FontAwesomeIcon icon={icon} color={color} size={30}/>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button : {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        marginLeft: 10
    }
})

export default Button