import OnboardingFormOne from '@/components/onboarding/onboarding-form-one';
import OnboardingFormTwo from '@/components/onboarding/onboarding-form-two';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnboardingformScreen = () => {
  const [step, setStep] = useState<number>(0);
  const [lifeStage, setLifeStage] = useState<string | undefined>(undefined);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
      {step === 0 ? (
        <OnboardingFormOne
          selectedLifeStage={lifeStage}
          onNext={(selected) => {
            setLifeStage(selected);
            setStep(1);
          }}
        />
      ) : (
        <OnboardingFormTwo
          lifeStage={lifeStage}
          onBack={() => setStep(0)}
        />
      )}
    </SafeAreaView>
  );
};

export default OnboardingformScreen;

const styles = StyleSheet.create({});
