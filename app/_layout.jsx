import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import {DataProvider} from '../data/DataContext'
export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
  
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);
  
  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <DataProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="home" options={{ headerShown: false }}/>
        <Stack.Screen name="profile" options={{ headerShown: false }}/>
        <Stack.Screen name="product/[query]" options={{ headerShown: false }}/>
        <Stack.Screen name="search/[query]" options={{ headerShown: false }}/>
        
      </Stack>
    </DataProvider>
  );
}
