import { Button } from '@/components/custom/button'
import { useThemeColors } from '@/src/constants/colors'
import { useRouter } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'

const VerifySuccess = () => {
    const { navigate } = useRouter()
    const colors = useThemeColors()

    const goToOnboardingForm = () => navigate("/onboarding-form")

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: colors.background.bg }}>

            <View className='flex-1 justify-center items-center gap-20'>
                <Image source={require("@/assets/images/success-icon.png")} style={{ width: 222.88, height: 196.189 }} />
                <View className='justify-center items-center gap-4'>
                    <Text className='text-center font-poppins text-[32px]' style={{ fontWeight: 600, color: colors.text.primary }}>
                        Email Verified!
                    </Text>
                    <Text className='text-center text-[16px]' style={{ color: colors.text.secondary }}>
                        Take a moment to shape your HerDeen {"\n"} experience around what matters most to you.
                    </Text>
                </View>
            </View>

            <View className='mb-15'>
                <Button 
                    label="Personalize my Journey" 
                    variant='primary' 
                    className='rounded-full h-[48px]'
                    onPress={goToOnboardingForm}
                />
            </View>

        </View>
    )
}

export default VerifySuccess

const styles = StyleSheet.create({})
