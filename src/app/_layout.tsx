import '@/src/global.css';
import { AuthProvider } from "@/src/context/auth-context";
import { QueryProvider } from "@/src/context/query-provider";
import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import { SourceSerifPro_400Regular, SourceSerifPro_600SemiBold } from "@expo-google-fonts/source-serif-pro";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar, useColorScheme } from 'react-native';


export default function RootLayout() {

    const colorScheme = useColorScheme()

    const [loaded, error] = useFonts({
        Poppins_400Regular,
        SourceSerifPro_400Regular,
        SourceSerifPro_600SemiBold
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
        <QueryProvider>
            <AuthProvider>
                <Stack screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="home" options={{ headerShown: false }} />
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)/signup"/>
                </Stack>
                <StatusBar
                    animated={true}
                    translucent={true}
                    barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
                />
            </AuthProvider>
        </QueryProvider>
    );
}
