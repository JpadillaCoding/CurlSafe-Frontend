import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faCamera, faImages} from '@fortawesome/free-solid-svg-icons'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const HomeScreen = () => {
  return (
    <View>
        <Text>Curl Safe</Text>
        <FontAwesomeIcon icon={faCamera} style={styles.icons}/>
        <FontAwesomeIcon icon={faImages} style={styles.icons}/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  icons: {
    color: "#f7ca28",
  }
});
