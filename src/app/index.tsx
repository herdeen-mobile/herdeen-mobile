import SplashScreen from "@/components/splash/splash-screen";
import { useAuth } from "@/src/context/auth-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/home");
      } else {
        router.replace("/onboarding");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, router]);

  return <SplashScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
