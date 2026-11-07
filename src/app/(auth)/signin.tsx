import AuthHeader from '@/components/auth-header'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { useThemeColors } from '@/src/constants/colors'
import { useAuth } from '@/src/context/auth-context'
import { useLoginMutation } from '@/src/hooks/use-auth'
import { parseFieldPayloadError } from '@/src/services/api/api-client'
import { signInSchema } from '@/src/validation/auth-schemas'
import Feather from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignInScreen = () => {
  const router = useRouter()
  const colors = useThemeColors()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/home')
    }
  }, [isAuthenticated, isLoading, router])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isFormFilled = Boolean(email.trim() && password.trim())

  const { mutate: login, isPending, reset } = useLoginMutation()

  const handleSignIn = () => {
    Keyboard.dismiss()
    setErrors({})
    reset()

    const validationResult = signInSchema.safeParse({
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

    login(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.replace('/home')
        },
        onError: (err) => {
          const parsed = parseFieldPayloadError(err.message)
          if (parsed.field) {
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
        title="Welcome Back"
        subtitle='Pick up right where you left off.'
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
              if (errors.email || errors.general) {
                setErrors((prev) => ({ ...prev, email: '', general: '' }))
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? (
            <Text className="text-xs mt-1 font-poppins" style={{ color: colors.state.error }}>
              {errors.email}
            </Text>
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

        <View className='mt-[32px] flex-row justify-end'>
          <Link href={"/(auth)/forgot-password"} className='text-primary' style={{ fontSize: 14, fontWeight: 400, color: colors.brand.primary }}>
            Forgot password?
          </Link>
        </View>

        {/* GENERAL ERROR MESSAGE */}
        {errors.general ? (
          <Text className="text-xs mt-3 text-center font-poppins" style={{ color: colors.state.error }}>
            {errors.general}
          </Text>
        ) : null}

        {/* SIGN IN BUTTON */}
        <Button
          label={
            isPending ? (
              <ActivityIndicator color={isFormFilled ? colors.text.button : colors.text.primary} />
            ) : (
              "Log In"
            )
          }
          className={`mt-[32px] h-[50px] font-poppins font-bold rounded-[100px] ${
            isFormFilled ? 'bg-primary' : 'bg-border-stroke'
          }`}
          style={{
            backgroundColor: isFormFilled ? colors.brand.primary : colors.stroke.borderStroke,
          }}
          textStyle={{ color: isFormFilled ? colors.text.button : colors.text.primary }}
          onPress={handleSignIn}
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
          label={"Sign in with Google"}
          className='mt-[32px] h-[50px] rounded-[100px] gap-2'
          variant='outline'
          icon={require("@/assets/images/google.png")}
          textStyle={{ color: colors.text.secondary }}
        />

        {/* DON'T HAVE AN ACCOUNT */}
        <View className="flex-row justify-center w-full gap-2 mt-[32px]">
          <Text className='text-center' style={{ fontSize: 14, fontWeight: 400, color: colors.text.secondary }}>
            Don’t have an account?
          </Text>
          <Link href={"/(auth)/signup"} className='text-primary' style={{ fontSize: 14, fontWeight: 400, color: colors.brand.primary }}>
            Sign Up
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

export default SignInScreen

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
