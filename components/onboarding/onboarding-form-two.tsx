import { CheckIcon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../auth-header';
import { Button } from '../custom/button';
import { Checkbox, CheckboxIcon, CheckboxIndicator } from '../ui/checkbox';



const OnboardingFormTwo = () => {

  const [selected, setSelected] = useState<boolean>(false)
  const {navigate} = useRouter()


  const professions: string[] = [
    "Prayer consistency",
    "Qur’an memorization & revision",
    "Journaling & reflection",
    "Daily planning",
    "Menstrual tracking"
  ]

  const gotoNotifcationPermission = ()=> navigate("/notification")



  return (

    <View style={{ flex: 1, backgroundColor: 'white', gap: 32 }}>

      <View style={styles.indicatorContainer}>
        <View style={{...styles.carouselIndicator, ...styles.inActiveIndicator}}>
          <Text>1</Text>
        </View>
        <View style={styles.carouselIndicator}>
          <Text className='text-[#C572E3]'>2</Text>
        </View>
      </View>

      <View>
        <AuthHeader
          title='How can HerDeen help you to become better Muslimah?'
          subtitle='Choose what you’d like support with — you’re in control.'
        />
      </View>


        <View className='flex-1'>
            <FlatList 
              data={professions}
              renderItem={({item}: {item: string})=>(

                <View className='flex-row gap-6 mb-[16px]'>

                  <View className='flex-1 bg-inputColor p-[16px] rounded-[8px]'>
                    <Text>{item}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.checkBtn} className='bg-inputColor'
                  >
                    <Checkbox
                      style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}
                      className={`${ selected ?  "bg-primary" : "border-indicator-inactive-color"} rounded-[6px]`}
                      value={item}
                    >
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      {/* <CheckboxLabel>Student</CheckboxLabel> */}
                    </Checkbox>
                  </TouchableOpacity>

                </View>

              )}
            />
        </View>


            <View style={{gap: 16}}>
              <Button
                label="continue"
                className='rounded-full h-[48px] font-bold '
                onPress={gotoNotifcationPermission}
              />
              <Button
                label="Skip this"
                className='rounded-full h-[48px] font-bold bg-transparent'
                textStyle={{color: '#5B6268'}}
                onPress={gotoNotifcationPermission}
              />
            </View>
        




    </View>
  )
}

export default OnboardingFormTwo

const styles = StyleSheet.create({
  checkBtn: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  carouselIndicator: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "#FC89C5",
    justifyContent: 'center',
    alignItems: "center"
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  inActiveIndicator: {
    marginLeft: -4,
    borderColor: "#9E9E9E",
    borderWidth: 2,
    backgroundColor: "transparent"
  }
})