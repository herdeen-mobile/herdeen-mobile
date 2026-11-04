import AuthHeader from '@/components/auth-header'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import Feather from '@expo/vector-icons/Feather'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUpScreen = () => {




  return (
    <SafeAreaView style={{ padding: 20, backgroundColor: "white", flex: 1 }}>

      {/*  FORM HEADER */}
      <AuthHeader
        title="Bismillah"
        subtitle='A few details to shape your HerDeen /n experience.'
        isIconShow={false}
      />

      {/* FORM CONTAINER */}
      <View style={styles.formContainer}>



        <View style={styles.innerFormContainer}>

          <Input
            placeholder='First Name'
            className='bg-inputColor rounded-xl pl-2 focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline'
            style={styles.inputStyle}
            error='hello'
          />

          <Input
            placeholder='Last Name'
            className='bg-inputColor rounded-xl pl-2 focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline'
            style={styles.inputStyle}
          />



        </View>

        <Input
          placeholder='Email'
          className='bg-inputColor rounded-xl pl-2 focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline'
          style={styles.emailInput}
        />


        {/* PASSWORD */}
        <View className='flex-row items-center gap-2 mt-[16px]'>

          <TextInput
            style={{}}
            placeholder='Password'
            secureTextEntry={true}
            className='bg-inputColor flex-1 rounded-xl pl-2 focus:border-carouselIndicatorOutline focus:ring-1 focus:ring-carouselIndicatorOutline h-[48px]'
          />

          <Button
            label={<Feather name="eye-off" size={15} color="black" />}
            className='w-[48px] h-[48px] bg-inputColor justify-center items-center rounded-[8px]'
          />


        </View>


        {/* SIGN UP BUTTON */}
        <Button
          label={"Sign Up"}
          className='mt-[32px] h-[50px] bg-primary rounded-[100px]'
        />


        {/* OR */}

        <View className='flex-row mt-[32px] items-center'>
          <Image source={require("@/assets/images/line.png")} className='flex-1' />
          <Text className=''>Or</Text>
          <Image source={require("@/assets/images/line.png")} className='flex-1' />
        </View>

         {/* GOOGLE SIGN IN BUTTON */}
        <Button
          label={"Sign up with Google"}
          className='mt-[32px] h-[50px] rounded-[100px]'
          variant='outline'
        />


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
    flex: 1,
    height: 48
  },

  emailInput: {
    height: 48,
    marginTop: 16
  }

})