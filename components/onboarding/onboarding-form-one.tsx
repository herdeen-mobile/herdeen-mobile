import { CheckIcon } from '@/components/ui/icon';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../auth-header';
import { Button } from '../custom/button';
import { Checkbox, CheckboxIcon, CheckboxIndicator } from '../ui/checkbox';

interface OnboardingFormOneProps {
  onNext?: (lifeStage?: string) => void;
  selectedLifeStage?: string;
}

const OnboardingFormOne = ({ onNext, selectedLifeStage }: OnboardingFormOneProps) => {
  const [selected, setSelected] = useState<string>(selectedLifeStage || 'Student');

  const professions: string[] = [
    "Student",
    "Working Professional",
    "Stay-at-home",
    "Entrepreneur",
    "Other"
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white', gap: 32 }}>

      <View style={styles.indicatorContainer}>
        <View style={styles.carouselIndicator}>
          <Text className='text-[#C572E3]'>1</Text>
        </View>
        <View style={{...styles.carouselIndicator, ...styles.inActiveIndicator}}>
          <Text>2</Text>
        </View>
      </View>

      <View>
        <AuthHeader
          title='Could you please tell us about yourself?'
          subtitle='So HerDeen fits your lifestyle and pace.'
        />
      </View>

      <View className='flex-1'>
        <FlatList 
          data={professions}
          keyExtractor={(item) => item}
          renderItem={({item}: {item: string}) => {
            const isChecked = selected === item;
            return (
              <View className='flex-row gap-6 mb-[16px]'>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelected(item)}
                  className='flex-1 bg-inputColor p-[16px] rounded-[8px]'
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelected(item)}
                  style={styles.checkBtn}
                  className='bg-inputColor'
                >
                  <Checkbox
                    style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}
                    className={`${isChecked ? "bg-primary" : "border-indicator-inactive-color"} rounded-[6px]`}
                    value={item}
                    isChecked={isChecked}
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                  </Checkbox>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      <View style={{gap: 16}}>
        <Button
          label="continue"
          className='rounded-full h-[48px] font-bold '
          onPress={() => onNext?.(selected)}
        />
        <Button
          label="Skip this"
          className='rounded-full h-[48px] font-bold bg-transparent'
          textStyle={{color: '#5B6268'}}
          onPress={() => onNext?.(undefined)}
        />
      </View>

    </View>
  );
};

export default OnboardingFormOne;

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
});
