import '@/src/global.css';
import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import { SourceSerifPro_400Regular } from "@expo-google-fonts/source-serif-pro";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar, useColorScheme } from 'react-native';


export default function RootLayout() {


    const colorScheme = useColorScheme()

   


    const [loaded, error] = useFonts({
        Poppins_400Regular,
        SourceSerifPro_400Regular
    })


    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }



    return (
        <>
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <StatusBar animated={true} translucent={true} />
        </>
    );
}
