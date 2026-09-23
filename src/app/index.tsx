import SplashScreen from "@/components/splash/splash-screen";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function Index() {

  const {replace} = useRouter()

  useEffect(()=>{
    setTimeout(()=>replace("/onboarding"), 1000)
  },[])

  return (
      <SplashScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
