import { StyleSheet, Text, View } from 'react-native'

const SlideComponent = () => {
  return (
    <View className=''>

        <View className='w-[355px] self-center h-[449px] bg-[#F7F7F7]'></View>

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

export default SlideComponent

const styles = StyleSheet.create({})