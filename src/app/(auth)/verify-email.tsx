import AuthHeader from '@/components/auth-header'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { useThemeColors } from '@/src/constants/colors'
import { useAuth } from '@/src/context/auth-context'
import { useRegisterMutation, useRequestOtpMutation } from '@/src/hooks/use-auth'
import { verifyEmailSchema } from '@/src/validation/auth-schemas'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const VerifyEmailScreen = () => {
    const router = useRouter()
    const colors = useThemeColors()
    const params = useLocalSearchParams<{ email?: string }>()
    const { pendingEmail } = useAuth()
    const email = params.email || pendingEmail || ''

    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [resendSuccess, setResendSuccess] = useState('')

    const isFormFilled = Boolean(otp.trim())

    const { mutate: register, isPending, reset } = useRegisterMutation()
    const { mutate: resendOtp, isPending: isResending } = useRequestOtpMutation()

    const handleVerifyEmail = () => {
        Keyboard.dismiss()
        setError('')
        setResendSuccess('')
        reset()

        if (!email) {
            setError('Email address is missing. Please return to sign up.')
            return
        }

        const validation = verifyEmailSchema.safeParse({ otp })
        if (!validation.success) {
            setError(validation.error.issues[0]?.message || 'Please enter a valid verification code')
            return
        }

        register(
            { email, otp },
            {
                onSuccess: () => {
                    router.navigate('/(auth)/verify-success')
                },
                onError: (err) => {
                    setError(err.message)
                },
            }
        )
    }

    const handleResend = () => {
        if (!email) {
            setError('Email address is missing. Please return to sign up.')
            return
        }
        setError('')
        setResendSuccess('')

        resendOtp(
            { email },
            {
                onSuccess: () => {
                    setResendSuccess('Verification code resent successfully!')
                },
                onError: (err) => {
                    setError(err.message)
                },
            }
        )
    }

    return (
        <SafeAreaView style={{ padding: 10, gap: 32, backgroundColor: colors.background.bg, flex: 1 }}>

            <View>
                <AuthHeader
                    title='Verify Your Email'
                    subtitle='Enter the code we just sent to you.'
                />
            </View>

            <View className=''>
                <Input
                    placeholder='Enter code here'
                    className='bg-inputColor rounded-xl pl-2 h-[48px] focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline'
                    style={styles.emailInput}
                    value={otp}
                    onChangeText={(text) => {
                        setOtp(text)
                        if (error) setError('')
                        if (resendSuccess) setResendSuccess('')
                    }}
                    keyboardType="number-pad"
                    maxLength={10}
                />

                {error ? (
                    <Text className="text-xs mt-1 font-poppins" style={{ color: colors.state.error }}>
                        {error}
                    </Text>
                ) : null}

                {resendSuccess ? (
                    <Text className="text-xs mt-2 text-center font-poppins" style={{ color: colors.state.success }}>
                        {resendSuccess}
                    </Text>
                ) : null}

                <Button
                    label={
                        isPending ? (
                            <ActivityIndicator color={isFormFilled ? colors.text.button : colors.text.primary} />
                        ) : (
                            "Sign Up"
                        )
                    }
                    className={`mt-[32px] h-[50px] font-poppins font-bold rounded-[100px] ${
                        isFormFilled ? 'bg-primary' : 'bg-border-stroke'
                    }`}
                    style={{
                        backgroundColor: isFormFilled ? colors.brand.primary : colors.stroke.borderStroke,
                    }}
                    textStyle={{ color: isFormFilled ? colors.text.button : colors.text.primary }}
                    onPress={handleVerifyEmail}
                    disabled={!isFormFilled || isPending}
                />
            </View>

            <View className='flex-row justify-center gap-2 items-center'>
                <Text style={{ fontSize: 14, color: colors.text.secondary }}>Didn’t get it? </Text>
                <TouchableOpacity onPress={handleResend} disabled={isResending}>
                    <Text className='text-primary' style={{ fontSize: 12, color: colors.brand.primary }}>
                        {isResending ? 'Resending...' : 'Resend'}
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default VerifyEmailScreen

const styles = StyleSheet.create({
    emailInput: {
        height: 48,
        marginTop: 16
    },
})
