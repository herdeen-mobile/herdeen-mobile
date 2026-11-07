import AuthHeader from '@/components/auth-header'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { useThemeColors } from '@/src/constants/colors'
import { useRequestOtpMutation } from '@/src/hooks/use-auth'
import { forgotPasswordSchema } from '@/src/validation/auth-schemas'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgotPasswordScreen = () => {
  const router = useRouter()
  const colors = useThemeColors()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const isFormFilled = Boolean(email.trim())

  const { mutate: requestOtp, isPending, reset } = useRequestOtpMutation()

  const handleSendCode = () => {
    setError('')
    reset()

    const validation = forgotPasswordSchema.safeParse({ email })
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || 'Please enter a valid email address')
      return
    }

    requestOtp(
      { email },
      {
        onSuccess: () => {
          router.navigate({
            pathname: '/(auth)/otp',
            params: { email: email.trim().toLowerCase() },
          })
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
        title="Forgot Password?"
        subtitle='No worries — we’ll help you reset it.'
        isIconShow={false}
      />

      {/* FORM CONTAINER */}
      <View style={styles.formContainer}>

        <View>
          <Input
            placeholder='Email'
            className='bg-inputColor rounded-xl pl-2 h-[48px] focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline'
            style={styles.emailInput}
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              if (error) setError('')
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error ? (
            <Text className="text-xs mt-1 font-poppins" style={{ color: colors.state.error }}>
              {error}
            </Text>
          ) : null}
        </View>

        {/* SEND CODE BUTTON */}
        <Button
          label={
            isPending ? (
              <ActivityIndicator color={isFormFilled ? colors.text.button : colors.text.primary} />
            ) : (
              "Send code"
            )
          }
          className={`mt-[32px] h-[50px] font-poppins font-bold rounded-[100px] ${
            isFormFilled ? 'bg-primary' : 'bg-border-stroke'
          }`}
          style={{
            backgroundColor: isFormFilled ? colors.brand.primary : colors.stroke.borderStroke,
          }}
          textStyle={{ color: isFormFilled ? colors.text.button : colors.text.primary }}
          onPress={handleSendCode}
          disabled={!isFormFilled || isPending}
        />

      </View>

      <View className='flex-row gap-2 justify-center'>
        <Text style={{ fontSize: 12, color: colors.text.secondary }}>Or</Text>
        <Link href={"/(auth)/signup"} className='text-primary' style={{ fontSize: 12, color: colors.brand.primary }}>
          Create new account
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen

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
