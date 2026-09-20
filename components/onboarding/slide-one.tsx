import { StyleSheet, Text, View } from 'react-native'
import SlideBox from './slide-box'

const SlideOne = () => {
  return (
   <View className=''>

        <SlideBox />

        <View className='mt-[38px]'>
            <Text className='text-center text-[36px] font-serif font-serif-semibold'>Structure Your</Text>
            <View className='flex-row items-center justify-center gap-2'>
                <Text className='text-center text-[36px] font-serif-semibold text-primary font-extrabold'> Deen</Text>
                <Text className='text-center text-[36px] font-serif-semibold'>&</Text>
                <Text className='text-center text-[36px] font-serif-semibold text-lightPink'>Dunya</Text>
            </View>
        </View>


    </View>
  )
}

export default SlideOne

const styles = StyleSheet.create({})