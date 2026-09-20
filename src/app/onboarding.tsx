
import { Button } from '@/components/custom/button'
import SlideOne from '@/components/onboarding/slide-one'
import SlideThree from '@/components/onboarding/slide-three'
import SlideTwo from '@/components/onboarding/slide-two'
import { useRouter } from 'expo-router'
import { ReactNode, useState } from 'react'
import { StyleSheet, View } from 'react-native'



const OnboardingScreen = () => {


    const [current, setCurrent] = useState<number>(0)
    const [isLast, setIsLast] = useState<boolean>(false)


    const {replace} = useRouter()


    const slides: ReactNode[] = [<SlideOne />, <SlideTwo />, <SlideThree />]


    const next = ()=>{ 
        if(current === slides.length - 1){
            return setIsLast(true)
        }
        setCurrent(current + 1)
    }


    const gotoSignup = ()=> replace("/signup")




  return (
        <View className="flex-1 bg-white">

            {/* ONBOARDING SLIDES */}

           {slides[current]}



            {/* CAROUSEL INDICATORS */}
            <View className='flex-row items-center gap-1 justify-center my-[49px]'>
                {
                    Array.from(slides, (_, i)=>(
                        <View 
                            className={`w-[10px] h-[10px] rounded-full ${current === i ? 'bg-primary' : 'border-2 border-carouselIndicatorOutline'}`} 
                            key={i}
                        >
                        </View>
                    ))
                }
      
            </View>


            {/* NEXT AND SKIP BUTTON */}
            <View className='items-center gap-5'>
                <Button 
                    label={isLast ? 'Get Started' : 'Next'} 
                    className='w-[200px] bg-primary text-white' variant='primary' 
                    onPress={isLast ? gotoSignup : next}
                />


                <Button label='Skip' className='w-[200px] text-black' variant='secondary' />
            </View>



        </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({})