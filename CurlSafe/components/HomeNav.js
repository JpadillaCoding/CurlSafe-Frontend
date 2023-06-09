import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faImages, faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DATA = [
  {
    id: "12",
    title: "Take A Picture",
    icon: faCamera,
    screen: "CameraScreen",
    color : "#8ea48e"
  },
  {
    id: "23",
    title: "Choose From Gallery",
    icon: faImages,
    screen: "GalleryScreen",
    color: "#8ea48e"
  },
  {
    id:"34",
    title: "Ingredient List",
    icon: faList,
    screen: "IngredientsScreen",
    color: "#8ea48e" 
  },
  {
    id:"45",
    title: "Search By Ingredient",
    icon: faMagnifyingGlass,
    screen: "SearchScreen",
    color: "#8ea48e"
  }
];

const HomeNav = () => {
  const  navigation = useNavigation()
  
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
          <View style={styles.container}>
            <FontAwesomeIcon icon={item.icon} color={item.color} size={70} />
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "PlayfairDisplay_400Regular",
  },
  container: {
    backgroundColor: "white",
    marginTop: 15,
    marginHorizontal: 25,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
  },
});

export default HomeNav;