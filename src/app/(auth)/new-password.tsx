import AuthHeader from '@/components/auth-header'
import { Button } from '@/components/custom/button'
import { useThemeColors } from '@/src/constants/colors'
import { useAuth } from '@/src/context/auth-context'
import { useResetPasswordMutation } from '@/src/hooks/use-auth'
import { parseFieldPayloadError } from '@/src/services/api/api-client'
import { newPasswordSchema } from '@/src/validation/auth-schemas'
import Feather from '@expo/vector-icons/Feather'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NewPasswordScreen = () => {
  const router = useRouter()
  const colors = useThemeColors()
  const params = useLocalSearchParams<{ email?: string; otp?: string }>()
  const { pendingEmail } = useAuth()
  const email = params.email || pendingEmail || ''
  const otp = params.otp || ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isFormFilled = Boolean(password.trim() && confirmPassword.trim())

  const { mutate: resetPassword, isPending, reset } = useResetPasswordMutation()

  const handleResetPassword = () => {
    setErrors({})
    reset()

    if (!email || !otp) {
      setErrors({
        general: 'Reset session expired or missing verification code. Please request a new code.',
      })
      return
    }

    const validationResult = newPasswordSchema.safeParse({
      password,
      confirmPassword,
    })

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {}
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString()
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    resetPassword(
      {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        password,
        confirmPassword,
      },
      {
        onSuccess: () => {
          router.navigate('/(auth)/password-reset-success')
        },
        onError: (err) => {
          const parsed = parseFieldPayloadError(err.message)
          if (parsed.field === 'password' || parsed.field === 'confirmPassword') {
            setErrors({ [parsed.field]: parsed.message })
          } else {
            setErrors({ general: parsed.message })
          }
        },
      }
    )
  }

  return (
    <SafeAreaView style={{ padding: 20, backgroundColor: colors.background.bg, flex: 1 }}>

      {/*  FORM HEADER */}
      <AuthHeader
        title="New Password"
        subtitle='Choose something secure you’ll remember.'
        isIconShow={false}
      />

      {/* FORM CONTAINER */}
      <View style={styles.formContainer}>

        {/* PASSWORD */}
        <View>
          <View className='flex-row items-center gap-2 mt-[16px]'>
            <TextInput
              placeholder='New Password'
              placeholderTextColor={colors.text.inputText}
              secureTextEntry={!showPassword}
              style={{ color: colors.text.primary }}
              className='bg-inputColor flex-1 rounded-xl pl-2 focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline h-[48px]'
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                if (errors.password || errors.general) {
                  setErrors((prev) => ({ ...prev, password: '', general: '' }))
                }
              }}
              autoCapitalize="none"
            />

            <Button
              label={
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={15}
                  color={colors.text.primary}
                />
              }
              className='w-[48px] h-[48px] bg-inputColor justify-center items-center rounded-[8px]'
              onPress={() => setShowPassword((prev) => !prev)}
            />
          </View>
          {errors.password ? (
            <Text className="text-xs mt-1 font-poppins" style={{ color: colors.state.error }}>
              {errors.password}
            </Text>
          ) : null}
        </View>

        {/* CONFIRM PASSWORD */}
        <View>
          <View className='flex-row items-center gap-2 mt-[16px]'>
            <TextInput
              placeholder='Confirm Password'
              placeholderTextColor={colors.text.inputText}
              secureTextEntry={!showConfirmPassword}
              style={{ color: colors.text.primary }}
              className='bg-inputColor flex-1 rounded-xl pl-2 focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline h-[48px]'
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text)
                if (errors.confirmPassword || errors.general) {
                  setErrors((prev) => ({ ...prev, confirmPassword: '', general: '' }))
                }
              }}
              autoCapitalize="none"
            />

            <Button
              label={
                <Feather
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={15}
                  color={colors.text.primary}
                />
              }
              className='w-[48px] h-[48px] bg-inputColor justify-center items-center rounded-[8px]'
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            />
          </View>
          {errors.confirmPassword ? (
            <Text className="text-xs mt-1 font-poppins" style={{ color: colors.state.error }}>
              {errors.confirmPassword}
            </Text>
          ) : null}
        </View>

        {/* GENERAL ERROR */}
        {errors.general ? (
          <Text className="text-xs mt-3 text-center font-poppins" style={{ color: colors.state.error }}>
            {errors.general}
          </Text>
        ) : null}

        {/* RESET PASSWORD BUTTON */}
        <Button
          label={
            isPending ? (
              <ActivityIndicator color={isFormFilled ? colors.text.button : colors.text.primary} />
            ) : (
              "Reset Password"
            )
          }
          className={`mt-[32px] h-[50px] font-poppins font-bold rounded-[100px] ${
            isFormFilled ? 'bg-primary' : 'bg-border-stroke'
          }`}
          style={{
            backgroundColor: isFormFilled ? colors.brand.primary : colors.stroke.borderStroke,
          }}
          textStyle={{ color: isFormFilled ? colors.text.button : colors.text.primary }}
          onPress={handleResetPassword}
          disabled={!isFormFilled || isPending}
        />

      </View>

    </SafeAreaView>
  )
}

export default NewPasswordScreen

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
