import { Image, StyleSheet, View } from 'react-native'

const SplashScreen = () => {
  return (
    <View className='flex-1 justify-center items-center bg-primary'>
        <Image source={require("@/assets/images/light-logo.png")} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})