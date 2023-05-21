import React from "react";
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
    color : "#f8b71c"
  },
  {
    id: "23",
    title: "Choose From Gallery",
    icon: faImages,
    screen: "GalleryScreen",
    color: "#f8b71c"
  },
];

const HomeNav = () => {
  const  naviagtion = useNavigation()
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
    />
  );
};

const styles = StyleSheet.create({
  icons: {
    color: "#fbd029",
  },
  container: {
    backgroundColor: "white",
    marginTop: 15,
    marginHorizontal: 25,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default HomeNav;