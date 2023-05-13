import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker'

const GalleryScreen = () => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result)
    }

    return (
        <View>

        </View>
    )
};

const styles = StyleSheet.create({

})

export default GalleryScreen