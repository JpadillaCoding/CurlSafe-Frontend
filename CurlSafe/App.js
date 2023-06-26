import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux"; //redux
import { store } from "./store"; //redux
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import GalleryScreen from "./screens/GalleryScreen";
import AnalysisScreen from "./screens/AnalysisScreen";
import IngredientsScreen from "./screens/IngredientsScreen";
import SearchScreen from "./screens/SearchScreen";
import { useFonts, RobotoCondensed_700Bold_Italic, RobotoCondensed_400Regular,RobotoCondensed_700Bold } from "@expo-google-fonts/roboto-condensed";
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold_Italic } from '@expo-google-fonts/playfair-display';
import * as Permissions from 'expo-permissions'
import RNExitApp from 'react-native-exit-app'
import { useEffect } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();
  let [fontsLoaded] = useFonts({
    RobotoCondensed_700Bold_Italic,
    RobotoCondensed_700Bold,
    RobotoCondensed_400Regular,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold_Italic,

  })
  if(!fontsLoaded) {
    return null
  }

  const requestPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY, Permissions.CAMERA)
    if(status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please Grant permission to use camera and photo gallery.',
        [
          {text: 'OK', onPress: () => requestPermissions() },
          {text: 'Cancel', onPress: () => exitApp() },
        ]
      )
    }
  }
  const exitApp = () => {
    RNExitApp.exitApp()
  }
  useEffect(() => {
    requestPermissions();
  })
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider style={styles.AndroidSafeArea}>
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
            <Stack.Screen 
              name="IngredientsScreen"
              component={IngredientsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
            name="SearchScreen"
            component={SearchScreen}
            options={{
              headerShown: false,
            }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
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
