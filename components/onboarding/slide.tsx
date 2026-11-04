import { Colors } from '@/contants/colors'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SlideComponent = () => {
  return (

    <SafeAreaView>
      <View className=''>

          <View className='w-[355px] self-center h-[449px] bg-[#F7F7F7]'>

            <Text style={styles.headerTitle} className='font-serif-semibold'>Assalamu {"\n"}Alaykum!</Text>
            <Text style={styles.subtitle} className='font-poppins'>
              Welcome to a space designed to support{"\n"} your Deen and your daily life.
            </Text>
          </View>


      </View>

    </SafeAreaView>
  )
}

export default SlideComponent

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 76,
    lineHeight: 90,
    letterSpacing: -3
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    fontStyle: "normal",
    color: Colors.grey500
  }
})