import { StyleSheet, Text, View } from 'react-native'
import SlideBox from './slide-box'

const SlideTwo = () => {
  return (
     <View className=''>

        <SlideBox />

        <View className='mt-[38px]'>
            <View className='flex-row justify-center items-center gap-2'>
                <Text className='text-center text-[36px] font-serif-semibold text-primary font-extrabold'>Plan</Text>
                <Text className='text-center text-[36px] font-serif font-serif-semibold'>your day</Text>

            </View>
            <View className='flex-row items-center justify-center gap-2'>
                <Text className='text-center text-[36px] font-serif-semibold'>With</Text>
                <Text className='text-center text-[36px] font-serif-semibold text-lightPink'>Intention</Text>
            </View>
        </View>


    </View>
  )
}

export default SlideTwo

const styles = StyleSheet.create({})