import { CheckIcon } from '@/components/ui/icon';
import { useUpdateUserDataMutation } from '@/src/hooks/use-auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../auth-header';
import { Button } from '../custom/button';
import { Checkbox, CheckboxIcon, CheckboxIndicator } from '../ui/checkbox';

interface OnboardingFormTwoProps {
  lifeStage?: string;
  onBack?: () => void;
}

const OnboardingFormTwo = ({ lifeStage }: OnboardingFormTwoProps) => {
  const router = useRouter();
  const { mutate: updateUserData, isPending } = useUpdateUserDataMutation();

  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Prayer consistency",
    "Qur’an memorization & revision",
  ]);

  const goalsList: string[] = [
    "Prayer consistency",
    "Qur’an memorization & revision",
    "Journaling & reflection",
    "Daily planning",
    "Menstrual tracking"
  ];

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const gotoNotifcationPermission = () => router.navigate("/notification" as any);

  const handleContinue = () => {
    const goalsToSave = selectedGoals.map((g) => {
      if (g.includes('Prayer')) return 'prayer';
      if (g.includes('Qur’an') || g.includes('Quran')) return 'quran';
      if (g.includes('Journaling')) return 'journaling';
      if (g.includes('planning')) return 'planning';
      if (g.includes('Menstrual')) return 'menstrual';
      return g.toLowerCase();
    });

    const payload: { lifeStage?: string; deenGoals?: string[] } = {
      deenGoals: goalsToSave,
    };
    if (lifeStage) {
      payload.lifeStage = lifeStage.toLowerCase();
    }

    updateUserData(payload, {
      onSettled: () => {
        gotoNotifcationPermission();
      },
    });
  };

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
          data={goalsList}
          keyExtractor={(item) => item}
          renderItem={({item}: {item: string}) => {
            const isChecked = selectedGoals.includes(item);
            return (
              <View className='flex-row gap-6 mb-[16px]'>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleGoal(item)}
                  className='flex-1 bg-inputColor p-[16px] rounded-[8px]'
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleGoal(item)}
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
          label={isPending ? "Saving..." : "continue"}
          className='rounded-full h-[48px] font-bold '
          disabled={isPending}
          onPress={handleContinue}
        />
        <Button
          label="Skip this"
          className='rounded-full h-[48px] font-bold bg-transparent'
          textStyle={{color: '#5B6268'}}
          onPress={gotoNotifcationPermission}
        />
      </View>

    </View>
  );
};

export default OnboardingFormTwo;

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
