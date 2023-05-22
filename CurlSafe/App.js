import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux"; //redux
import { store } from "./store"; //redux
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import GalleryScreen from "./screens/GalleryScreen";
import AnalysisScreen from "./screens/AnalysisScreen";
import { useFonts, RobotoCondensed_700Bold_Italic, RobotoCondensed_400Regular,RobotoCondensed_700Bold } from "@expo-google-fonts/roboto-condensed";
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const Stack = createNativeStackNavigator();
  let [fontsLoaded] = useFonts({
    RobotoCondensed_700Bold_Italic,
    RobotoCondensed_700Bold,
    RobotoCondensed_400Regular,
    Roboto_400Regular,
    Roboto_700Bold
  })
  if(!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.AndroidSafeArea}>
          <StatusBar translucent={true} />
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CameraScreen"
              component={CameraScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="GalleryScreen"
              component={GalleryScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AnalysisScreen"
              component={AnalysisScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    //sets safeArea for android, SAfeAreaView already works for ios
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: "red",
  },
});
