import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faImages } from "@fortawesome/free-solid-svg-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const DATA = [
  {
    id: "12",
    title: "Take A Picture",
    icon: faCamera,
    screen: "CameraScreen",
  },
  {
    id: "23",
    title: "Choose From Gallery",
    icon: faImages,
    screen: "GalleryScreen",
  },
];

const HomeNav = () => {
  const  naviagtion = useNavigation()
  const [results, setResults] = useState(null)
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => naviagtion.navigate(item.screen)}>
          <View style={styles.container}>
            <FontAwesomeIcon icon={item.icon} style={styles.icons} size={70} />
            <Text>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
      results={results}
      setResults={setResults}
    />
  );
};

const styles = StyleSheet.create({
  icons: {
    color: "#f7ca28",
  },
  container: {
    backgroundColor: "grey",
    margin: 5,
    flex: 1,
    alignItems: "center",
  },
});

export default HomeNav;