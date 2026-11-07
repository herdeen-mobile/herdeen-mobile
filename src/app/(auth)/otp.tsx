import AuthHeader from '@/components/auth-header'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { useThemeColors } from '@/src/constants/colors'
import { useAuth } from '@/src/context/auth-context'
import { useRequestOtpMutation } from '@/src/hooks/use-auth'
import { otpSchema } from '@/src/validation/auth-schemas'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const OtpScreen = () => {
  const router = useRouter()
  const colors = useThemeColors()
  const params = useLocalSearchParams<{ email?: string }>()
  const { pendingEmail } = useAuth()
  const email = params.email || pendingEmail || ''

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [resendMessage, setResendMessage] = useState('')

  const isFormFilled = Boolean(otp.trim())

  const { mutate: resendOtp, isPending: isResending } = useRequestOtpMutation()

  const handleVerifyOtp = () => {
    setError('')
    setResendMessage('')

    if (!email) {
      setError('Email address is missing. Please enter your email again.')
      return
    }

    const validation = otpSchema.safeParse({ otp })
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || 'Please enter a valid verification code')
      return
    }

    router.navigate({
      pathname: '/(auth)/new-password',
      params: {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      },
    })
  }

  const handleResend = () => {
    if (!email) {
      setError('Email address is missing. Please enter your email again.')
      return
    }
    setError('')
    setResendMessage('')

    resendOtp(
      { email },
      {
        onSuccess: () => {
          setResendMessage('Verification code resent successfully!')
        },
        onError: (err) => {
          setError(err.message)
        },
      }
    )
  }

  return (
    <SafeAreaView style={{ padding: 20, backgroundColor: colors.background.bg, flex: 1 }}>

      {/*  FORM HEADER */}
      <AuthHeader
        title="Check Inbox"
        subtitle='Enter the code we just sent to you.'
        isIconShow={false}
      />

      {/* FORM CONTAINER */}
      <View style={styles.formContainer}>

        <View>
          <Input
            placeholder='Enter code here'
            className='bg-inputColor rounded-xl pl-2 h-[48px] focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline'
            style={styles.emailInput}
            value={otp}
            onChangeText={(text) => {
              setOtp(text)
              if (error) setError('')
              if (resendMessage) setResendMessage('')
            }}
            keyboardType="number-pad"
            maxLength={10}
          />
          {error ? (
            <Text className="text-xs mt-1 font-poppins" style={{ color: colors.state.error }}>
              {error}
            </Text>
          ) : null}
          {resendMessage ? (
            <Text className="text-xs mt-2 text-center font-poppins" style={{ color: colors.state.success }}>
              {resendMessage}
            </Text>
          ) : null}
        </View>

        {/* VERIFY BUTTON */}
        <Button
          label={"Verify"}
          className={`mt-[32px] h-[50px] font-poppins font-bold rounded-[100px] ${
            isFormFilled ? 'bg-primary' : 'bg-border-stroke'
          }`}
          style={{
            backgroundColor: isFormFilled ? colors.brand.primary : colors.stroke.borderStroke,
          }}
          textStyle={{ color: isFormFilled ? colors.text.button : colors.text.primary }}
          onPress={handleVerifyOtp}
          disabled={!isFormFilled}
        />

        {/* RESEND OTP BUTTON */}
        <View className="flex-row justify-center items-center w-full gap-2 mt-[32px]">
          <Text className='text-center' style={{ fontSize: 14, fontWeight: 400, color: colors.text.secondary }}>
            Didn’t get it?
          </Text>
          <Button
            label={isResending ? "Resending..." : "Resend"}
            variant='none'
            textStyle={{ color: colors.brand.primary }}
            onPress={handleResend}
            disabled={isResending}
          />
        </View>

      </View>

      <View className='flex-row justify-center gap-2'>
        <Text style={{ fontSize: 12, color: colors.text.secondary }}>Wrong email?</Text>
        <Link href={"/(auth)/forgot-password"} className='text-primary' style={{ fontSize: 12, color: colors.brand.primary }}>
          Edit address
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default OtpScreen

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 32,
    flex: 1,
  },

  innerFormContainer: {
    flexDirection: 'row',
    gap: 10
  },

  inputStyle: {
    flex: 1,
    height: 48
  },

  emailInput: {
    height: 48,
    marginTop: 16
  },
})
