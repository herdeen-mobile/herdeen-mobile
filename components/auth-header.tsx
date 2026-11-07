import { useThemeColors } from '@/src/constants/colors'
import { AuthHeaderProps } from '@/types'
import { StyleSheet, Text, View } from 'react-native'

const AuthHeader = ({title, subtitle, isIconShow, style} : AuthHeaderProps) => {
  const colors = useThemeColors()

  return (
    <>
        <View className='flex-row items-center gap-2 mb-2'>
            <Text className='text-[24px] font-serif-semibold' style={{ color: colors.text.primary }}>{title}</Text>
            {isIconShow&&<Text className='text-[24px]'>🌱</Text>}
        </View>
        {
            subtitle.split("/n").map((text)=>(
                <Text className='text-subheaderColor text-poppins text-[14px]' key={text} style={[{ color: colors.text.secondary }, style]}>
                    {text} 
                </Text> 
            ))
        }
    </>
  )
}

export default AuthHeader

const styles = StyleSheet.create({})
