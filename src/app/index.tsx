import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {


  


  return (
    <View style={styles.container}>
      <Link href={"/home"}>Go home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
