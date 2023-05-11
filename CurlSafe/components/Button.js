import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native/types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Button({title, onPress, icon, color}) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <FontAwesomeIcon icon={icon} color={color} size={30}/>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button : {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    }
})