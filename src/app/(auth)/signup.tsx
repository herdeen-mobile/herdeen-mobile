import AuthHeader from '@/components/auth-header'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { useThemeColors } from '@/src/constants/colors'
import { useAuth } from '@/src/context/auth-context'
import { usePreRegisterMutation } from '@/src/hooks/use-auth'
import { parseFieldPayloadError } from '@/src/services/api/api-client'
import { signUpSchema } from '@/src/validation/auth-schemas'
import Feather from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUpScreen = () => {
  const router = useRouter()
  const colors = useThemeColors()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/home')
    }
  }, [isAuthenticated, isLoading, router])

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isFormFilled = Boolean(
    firstName.trim() && lastName.trim() && email.trim() && password.trim()
  )

  const { mutate: preRegister, isPending, reset } = usePreRegisterMutation()

  const handleSignUp = () => {
    Keyboard.dismiss()
    setErrors({})
    reset()

    const validationResult = signUpSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
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

    preRegister(
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        onSuccess: () => {
          router.navigate({
            pathname: '/(auth)/verify-email',
            params: { email: email.trim().toLowerCase() },
          })
        },
        onError: (err) => {
          const parsed = parseFieldPayloadError(err.message)
            const lower = err.message.toLowerCase()

            // Errors regarding account existence or registration belong to the email field
            if (
              parsed.field === 'email' ||
              lower.includes('already exist') ||
              lower.includes('already registered') ||
              lower.includes('already in use') ||
              lower.includes('account')
            ) {
              setErrors({ email: parsed.message })
            } else if (
              parsed.field &&
              ['firstName', 'lastName', 'email', 'password'].includes(parsed.field)
            ) {
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
        title="Bismillah"
        subtitle='Lets begin by creating your account'
        isIconShow={false}
      />

      {/* FORM CONTAINER */}
      <View style={styles.formContainer}>

        <View style={styles.innerFormContainer}>
          <View style={{ flex: 1 }}>
            <Input
              placeholder='First Name'
              className='bg-inputColor rounded-xl pl-2 h-[48px] focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline'
              style={styles.inputStyle}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text)
                if (errors.firstName || errors.general) {
                  setErrors((prev) => ({ ...prev, firstName: '', general: '' }))
                }
              }}
              autoCapitalize="words"
            />
            {errors.firstName ? (
              <Text className="text-xs mt-1 font-poppins" style={{ color: colors.state.error }}>
                {errors.firstName}
              </Text>
            ) : null}
          </View>

          <View style={{ flex: 1 }}>
            <Input
              placeholder='Last Name'
              className='bg-inputColor rounded-xl pl-2 h-[48px] focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline'
              style={styles.inputStyle}
              value={lastName}
              onChangeText={(text) => {
                setLastName(text)
                if (errors.lastName || errors.general) {
                  setErrors((prev) => ({ ...prev, lastName: '', general: '' }))
                }
              }}
              autoCapitalize="words"
            />
            {errors.lastName ? (
              <Text className="text-xs mt-1 font-poppins" style={{ color: colors.state.error }}>
                {errors.lastName}
              </Text>
            ) : null}
          </View>
        </View>

        <View>
          <Input
            placeholder='Email'
            className='bg-inputColor rounded-xl pl-2 h-[48px] focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline'
            style={styles.emailInput}
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              if (errors.email || errors.general) {
                setErrors((prev) => ({ ...prev, email: '', general: '' }))
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? (
            <View>
              <Text className="text-xs mt-1 font-poppins" style={{ color: colors.state.error }}>
                {errors.email}
              </Text>
              {errors.email.toLowerCase().includes('not verified') ||
              errors.email.toLowerCase().includes('otp') ? (
                <TouchableOpacity
                  onPress={() => {
                    router.navigate({
                      pathname: '/(auth)/verify-email',
                      params: { email: email.trim().toLowerCase() },
                    })
                  }}
                  className="mt-1"
                >
                  <Text className="text-xs font-semibold font-poppins" style={{ color: colors.brand.primary }}>
                    Verify email with OTP →
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </View>

        {/* PASSWORD */}
        <View>
          <View className='flex-row items-center gap-2 mt-[16px]'>
            <TextInput
              placeholder='Password'
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

        {/* GENERAL ERROR MESSAGE */}
        {errors.general ? (
          <Text className="text-xs mt-3 text-center font-poppins" style={{ color: colors.state.error }}>
            {errors.general}
          </Text>
        ) : null}

        {/* SIGN UP BUTTON */}
        <Button
          label={
            isPending ? (
              <ActivityIndicator color={isFormFilled ? colors.text.button : colors.text.primary} />
            ) : (
              "Sign Up"
            )
          }
          className={`mt-[32px] h-[50px] font-poppins font-bold rounded-[100px] ${isFormFilled ? 'bg-primary' : 'bg-border-stroke'
            }`}
          style={{
            backgroundColor: isFormFilled ? colors.brand.primary : colors.stroke.borderStroke,
          }}
          textStyle={{ color: isFormFilled ? colors.text.button : colors.text.primary }}
          onPress={handleSignUp}
          disabled={!isFormFilled || isPending}
        />

        {/* OR */}
        <View className='flex-row mt-[32px] items-center'>
          <Image source={require("@/assets/images/line.png")} className='flex-1' />
          <Text style={{ color: colors.text.secondary }}>Or</Text>
          <Image source={require("@/assets/images/line.png")} className='flex-1' />
        </View>

        {/* GOOGLE SIGN IN BUTTON */}
        <Button
          label={"Sign up with Google"}
          className='mt-[32px] h-[50px] rounded-[100px] gap-2'
          variant='outline'
          icon={require("@/assets/images/google.png")}
          textStyle={{ color: colors.text.secondary }}
        />

        {/* DON'T HAVE AN ACCOUNT */}
        <View className="flex-row justify-center w-full gap-2 mt-[32px]">
          <Text className='text-center' style={{ fontSize: 14, fontWeight: 400, color: colors.text.secondary }}>
            Got an account?
          </Text>
          <Link href={"/(auth)/signin"} className='text-primary' style={{ fontSize: 14, fontWeight: 400, color: colors.brand.primary }}>
            Sign in
          </Link>
        </View>

      </View>

      <View className='items-center'>
        <Text style={{ fontSize: 12, color: colors.text.secondary }}>
          By using HerDeen, you agree to the
        </Text>
        <Link href={"/"} className='text-primary' style={{ fontSize: 12, color: colors.brand.primary }}>
          Terms of services & Privacy Policy
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default SignUpScreen

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
    height: 48,
  },

  emailInput: {
    height: 48,
    marginTop: 16
  },
})
