import { StyleSheet, Text, View } from 'react-native'
import SlideBox from './slide-box'

const SlideThree = () => {
    return (
        <View className=''>

            <SlideBox />   
            

            <View className='mt-[38px]'>
                <View className='flex-row justify-center items-center gap-2'>
                    <Text className='text-center text-[36px] font-serif-semibold text-primary font-extrabold'>Grow</Text>
                    <Text className='text-center text-[36px] font-serif font-serif-semibold'>and shine</Text>

                </View>
                <View className='flex-row items-center justify-center gap-2'>
                    <Text className='text-center text-[36px] font-serif-semibold'>With</Text>
                    <Text className='text-center text-[36px] font-serif-semibold text-lightPink'>Sisterhood</Text>
                </View>
            </View>


        </View>
    )
}

export default SlideThree

const styles = StyleSheet.create({})